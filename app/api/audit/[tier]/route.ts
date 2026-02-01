import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_URL || "http://x402guard.xyz";

export async function POST(
  request: NextRequest,
  { params }: { params: { tier: string } }
) {
  const tier = params.tier;

  console.log("[API Proxy] Request to /audit/" + tier);
  console.log("[API Proxy] API_BASE_URL:", API_BASE_URL);

  // Validate tier
  if (!["quick", "standard", "deep"].includes(tier)) {
    return NextResponse.json(
      { error: "Invalid audit tier" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    // x402 v2 uses PAYMENT-SIGNATURE, v1 uses X-PAYMENT
    const paymentSignature = request.headers.get("PAYMENT-SIGNATURE") || request.headers.get("payment-signature");
    const xPaymentHeader = request.headers.get("X-PAYMENT") || request.headers.get("x-payment");

    console.log("[API Proxy] Request body:", JSON.stringify(body));
    console.log("[API Proxy] PAYMENT-SIGNATURE header present:", !!paymentSignature);
    console.log("[API Proxy] X-PAYMENT header present:", !!xPaymentHeader);

    // Forward the request to the actual API
    const response = await fetch(`${API_BASE_URL}/audit/${tier}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward x402 payment headers if present (v2 uses PAYMENT-SIGNATURE, v1 uses X-PAYMENT)
        ...(paymentSignature && {
          "PAYMENT-SIGNATURE": paymentSignature,
        }),
        ...(xPaymentHeader && {
          "X-PAYMENT": xPaymentHeader,
        }),
      },
      body: JSON.stringify(body),
    });

    console.log("[API Proxy] Backend response status:", response.status);

    // Log all response headers for debugging
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
      console.log(`[API Proxy] Backend header: ${key} = ${value}`);
    });

    // Get response data
    const data = await response.json().catch(() => ({}));
    console.log("[API Proxy] Backend response data:", JSON.stringify(data));

    // For 402 responses, we need to pass the full payment info
    // x402 v2 expects the payment details in PAYMENT-REQUIRED header (uppercase)
    const headers: Record<string, string> = {
      "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, PAYMENT-RESPONSE, WWW-Authenticate",
    };

    // Forward x402 payment-required header (check both cases from backend)
    const paymentRequired = response.headers.get("payment-required") || response.headers.get("PAYMENT-REQUIRED");
    if (paymentRequired) {
      // x402 v2 expects PAYMENT-REQUIRED (uppercase)
      headers["PAYMENT-REQUIRED"] = paymentRequired;
      console.log("[API Proxy] Forwarding PAYMENT-REQUIRED header (length:", paymentRequired.length, ")");
    }

    // Forward x402 payment-response header for successful payments
    const paymentResponse = response.headers.get("payment-response") || response.headers.get("PAYMENT-RESPONSE");
    if (paymentResponse) {
      headers["PAYMENT-RESPONSE"] = paymentResponse;
      console.log("[API Proxy] Forwarding PAYMENT-RESPONSE header");
    }

    if (response.headers.get("WWW-Authenticate")) {
      headers["WWW-Authenticate"] = response.headers.get("WWW-Authenticate")!;
    }

    // For debugging: decode and log payment info
    if (response.status === 402 && paymentRequired) {
      try {
        const paymentInfo = JSON.parse(atob(paymentRequired));
        console.log("[API Proxy] Decoded payment info:", JSON.stringify(paymentInfo, null, 2));
      } catch (e) {
        console.log("[API Proxy] Could not decode payment info for logging");
      }
    }

    // Return the response with the same status code
    // Keep body empty for v2 (payment info is in header)
    return NextResponse.json(data, {
      status: response.status,
      headers,
    });
  } catch (error: any) {
    console.error("[API Proxy] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to connect to API" },
      { status: 502 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Payment",
    },
  });
}
