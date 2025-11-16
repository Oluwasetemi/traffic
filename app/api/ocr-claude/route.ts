import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

export async function POST(request: NextRequest) {
  try {
    const { image, side } = await request.json()

    if (!image || !side) {
      return NextResponse.json(
        { error: 'Missing required fields: image and side' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Anthropic API key is not configured on the server' },
        { status: 500 }
      )
    }

    // Remove data URL prefix if present
    const base64Image = image.startsWith('data:')
      ? image.split(',')[1]
      : image

    const prompt = side === 'front'
      ? `You are an OCR expert analyzing a Jamaica driver's license (FRONT side).

Extract the following information from this license image:
1. TRN (Tax Registration Number) - 9 digits - This IS the driver's license number
2. Date of Birth - in YYYY-MM-DD format
3. Date Issued - in YYYY-MM-DD format

The license has these fields printed on it:
- TRN (top area)
- BIRTH DATE (near EXPIRY DATE and SEX fields)
- DATE ISSUED

Return ONLY a JSON object with this structure:
{
  "driversLicNo": "9-digit TRN",
  "dateOfBirth": "YYYY-MM-DD",
  "origLicIssueDate": "YYYY-MM-DD from DATE ISSUED field"
}

If you cannot read a field clearly, use null for that field.
Do not include any explanation, only return the JSON.`
      : `You are an OCR expert analyzing a Jamaica driver's license (BACK side).

Extract the following information from this license image:
1. Control Number - 10 digits (e.g., 0110469335)
2. Original Date of Issue - in YYYY-MM-DD format

The back side has:
- Control Number (usually printed vertically)
- ORIGINAL DATE OF ISSUE label with a date

Return ONLY a JSON object with this structure:
{
  "controlNo": "10-digit control number",
  "origLicIssueDate": "YYYY-MM-DD from ORIGINAL DATE OF ISSUE"
}

If you cannot read a field clearly, use null for that field.
Do not include any explanation, only return the JSON.`


    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              image: base64Image,
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
      maxOutputTokens: 500,
      temperature: 0, // Deterministic for OCR
    })

    console.log('[API Claude OCR] Raw response:', text)

    // Parse the JSON response
    // Claude sometimes wraps JSON in markdown code blocks, so we need to extract it
    let jsonText = text.trim()

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      // Extract content between ```json and ``` or ``` and ```
      const match = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
      if (match) {
        jsonText = match[1].trim()
      }
    }

    const parsed = JSON.parse(jsonText)

    // Build result with high confidence (Claude is very accurate)
    const result = {
      driversLicNo: parsed.driversLicNo || null,
      controlNo: parsed.controlNo || null,
      dateOfBirth: parsed.dateOfBirth || null,
      origLicIssueDate: parsed.origLicIssueDate || null,
      confidence: {
        driversLicNo: parsed.driversLicNo ? 95 : 0,
        controlNo: parsed.controlNo ? 95 : 0,
        dateOfBirth: parsed.dateOfBirth ? 95 : 0,
        origLicIssueDate: parsed.origLicIssueDate ? 95 : 0,
      },
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('[API Claude OCR] Error:', error)
    return NextResponse.json(
      {
        error: `Claude OCR failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      { status: 500 }
    )
  }
}
