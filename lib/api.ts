import { AuditTier, AuditResult, PaymentRequired, AuditRequest } from "@/types";

export interface PaymentDetails {
  transactionHash?: string;
  payer?: string;
  network?: string;
}

export interface AuditResponse {
  success: boolean;
  data?: AuditResult;
  paymentRequired?: PaymentRequired;
  paymentDetails?: PaymentDetails;
  error?: string;
}

/**
 * Run an audit with x402 payment support
 * Uses local API proxy to avoid CORS issues
 * @param tier - The audit tier (quick, standard, deep)
 * @param request - The audit request (skill_url or skill_content)
 * @param fetchFn - Optional fetch function (use x402 wrapped fetch for payments)
 */
export async function runAudit(
  tier: AuditTier,
  request: AuditRequest,
  fetchFn: typeof fetch = fetch
): Promise<AuditResponse> {
  console.log("[runAudit] Starting audit:", { tier, request });
  console.log("[runAudit] Using custom fetch:", fetchFn !== fetch);

  try {
    // Use local API proxy to avoid CORS issues
    const url = `/api/audit/${tier}`;
    console.log("[runAudit] Calling:", url);

    const response = await fetchFn(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skill_url: request.skill_url || undefined,
        skill_content: request.skill_content || undefined,
      }),
    });

    console.log("[runAudit] Response status:", response.status);
    console.log("[runAudit] Response headers:");
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    const data = await response.json();
    console.log("[runAudit] Response data:", data);

    if (response.status === 402) {
      console.log("[runAudit] Payment required - x402 should have handled this!");
      return {
        success: false,
        paymentRequired: data,
      };
    }

    if (response.ok) {
      console.log("[runAudit] Success!");

      // Extract payment details from PAYMENT-RESPONSE header
      let paymentDetails: PaymentDetails | undefined;
      const paymentResponseHeader = response.headers.get("payment-response") || response.headers.get("PAYMENT-RESPONSE");
      if (paymentResponseHeader) {
        try {
          const decoded = JSON.parse(atob(paymentResponseHeader));
          console.log("[runAudit] Payment response:", decoded);
          paymentDetails = {
            transactionHash: decoded.transaction,
            payer: decoded.payer,
            network: decoded.network,
          };
        } catch (e) {
          console.log("[runAudit] Failed to decode payment response header");
        }
      }

      return {
        success: true,
        data,
        paymentDetails,
      };
    }

    console.log("[runAudit] Error response:", data);
    return {
      success: false,
      error: data.error || "Unknown error",
    };
  } catch (err: unknown) {
    console.error("[runAudit] Exception:", err);
    // Handle user rejection
    if (err instanceof Error) {
      if (err.message.includes("rejected") || err.message.includes("User rejected")) {
        return {
          success: false,
          error: "Payment signature rejected by user",
        };
      }
      return {
        success: false,
        error: err.message,
      };
    }
    return {
      success: false,
      error: "Failed to connect to API",
    };
  }
}

export function getRiskColor(score: number): string {
  if (score < 25) return "green";
  if (score < 50) return "yellow";
  if (score < 75) return "orange";
  return "red";
}

export function getRiskLevelColor(level: string): string {
  switch (level) {
    case "LOW":
      return "text-green-400";
    case "MEDIUM":
      return "text-yellow-400";
    case "HIGH":
      return "text-orange-400";
    case "CRITICAL":
      return "text-red-400";
    default:
      return "text-dark-400";
  }
}

export function getRecommendationColor(rec: string): string {
  switch (rec) {
    case "SAFE":
      return "text-green-400";
    case "CAUTION":
      return "text-yellow-400";
    case "UNSAFE":
    case "DANGEROUS":
    case "BLOCKED":
      return "text-red-400";
    default:
      return "text-dark-400";
  }
}
