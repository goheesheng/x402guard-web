// Audit tier types
export type AuditTier = "quick" | "standard" | "deep";

export interface TierConfig {
  id: AuditTier;
  name: string;
  price: string;
  priceNum: number;
  description: string;
  features: string[];
  popular?: boolean;
}

// API types
export interface AuditRequest {
  skill_url?: string;
  skill_content?: string;
}

export interface AuditFindings {
  malware: string[];
  credentials: string[];
  network: string[];
  permissions: string[];
}

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Recommendation = "SAFE" | "CAUTION" | "UNSAFE";

export interface AuditResult {
  risk_score: number;
  risk_level: RiskLevel;
  recommendation: Recommendation;
  findings: AuditFindings;
  audit_id: string;
  timestamp: string;
  tier: AuditTier;
  attestation?: string;
}

export interface PaymentRequired {
  description?: string;
  accepts?: {
    chain: string;
    token: string;
    amount: string;
    recipient: string;
  };
}

// FAQ types
export interface FAQItem {
  question: string;
  answer: string;
}

// Risk scenario types
export interface RiskScenario {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

// Trust stack layer types
export interface TrustLayer {
  layer: string;
  name: string;
  status: string;
  color: string;
  highlight?: boolean;
}
