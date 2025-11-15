import type { OCRResult } from "../types/ocr";
import { pipeline, env, ProgressInfo } from "@huggingface/transformers";

// Skip local model check
env.allowLocalModels = false;

/**
 * Initialize Transformers.js OCR pipeline
 * Uses TrOCR (Transformer-based OCR) model
 */
export async function initializeTransformersOCR() {
  console.log("[Transformers OCR] Initialization started");
  console.log("[Transformers OCR] Creating pipeline for image-to-text...");
  // Initialize image-to-text pipeline with TrOCR
  return await pipeline(
    "image-to-text",
    "Xenova/trocr-base-printed", // Base model for faster loading
    {
      progress_callback: (progress: ProgressInfo) => {
        if (progress.status === "progress") {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          console.log(`[OCR] Loading ${progress.file}: ${percent}%`);
        }
      },
    },
  );
}

/**
 * Extract text using Transformers.js TrOCR model
 * @param image - Image element, canvas, or data URL
 * @returns OCR result with text and confidence
 */
export async function extractTextWithTransformers(
  image: HTMLImageElement | HTMLCanvasElement | string,
): Promise<OCRResult> {
  console.log("[Transformers OCR] extractTextWithTransformers called");
  console.log("[Transformers OCR] Image type:", typeof image);

  try {
    const imageToTextPipeline = await initializeTransformersOCR();
    console.log("[Transformers OCR] Pipeline initialized, converting image...");

    // Convert image to format expected by Transformers.js
    const imageUrl =
      typeof image === "string"
        ? image
        : image instanceof HTMLImageElement
          ? image.src
          : image.toDataURL();

    console.log("[Transformers OCR] Image URL length:", imageUrl.length);
    console.log("[Transformers OCR] Running OCR on image...");

    // Run OCR
    const result = await imageToTextPipeline(imageUrl);
    console.log(result);

    console.log("[Transformers OCR] OCR result:", result);
    console.log("[Transformers OCR] Result type:", typeof result);
    console.log("[Transformers OCR] Result is array:", Array.isArray(result));
    console.log("[Transformers OCR] Result[0]:", result?.[0]);

    // Transformers.js returns different format than Tesseract
    // TrOCR provides sequence-to-sequence text generation
    return {
      // @ts-expect-error generated
      text: result[0]?.generated_text || "",
      // @ts-expect-error generated
      confidence: result[0]?.score ? result[0].score * 100 : 0,
      words: [], // TrOCR doesn't provide word-level data by default
    };
  } catch (error) {
    console.error(
      "[Transformers OCR] Error in extractTextWithTransformers:",
      error,
    );
    console.error(
      "[Transformers OCR] Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );
    throw error;
  }
}

/**
 * Extract text with better word-level detection
 * This uses a different approach to get word positions
 */
export async function extractTextWithWordPositions(
  image: HTMLImageElement | HTMLCanvasElement | string,
): Promise<OCRResult> {
  // For now, TrOCR doesn't provide word-level bounding boxes
  // This would require a different model or approach
  // Future enhancement: Use a detection + recognition pipeline

  const basicResult = await extractTextWithTransformers(image);
  console.log(basicResult);

  // Split text into words for basic word array
  // Without positions, this is less useful than Tesseract
  const words = basicResult.text.split(/\s+/).map((text) => ({
    text,
    confidence: basicResult.confidence,
    bbox: { x0: 0, y0: 0, x1: 0, y1: 0 }, // No position data available
  }));

  return {
    ...basicResult,
    words,
  };
}
