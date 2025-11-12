import { NextRequest, NextResponse } from "next/server";
import type { DriverLicenseValidationRequest } from "@/app/types";

export async function POST(request: NextRequest) {
  try {
    const body: DriverLicenseValidationRequest = await request.json();

    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "127.0.0.1";

    const response = await fetch(
      "https://trafficticketlookup.gov.jm/api/driver-licences/is-valid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://trafficticketlookup.gov.jm",
          Referer: "https://trafficticketlookup.gov.jm/",
        },
        body: JSON.stringify({
          ...body,
          ipAddress: ip,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Failed to validate license", details: error },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
