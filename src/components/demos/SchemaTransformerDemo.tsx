import React, { useState } from 'react';
import { ArrowRight, Code, CheckCircle, RefreshCw, Layers } from 'lucide-react';

export const SchemaTransformerDemo: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<'hubspot_lead' | 'shopify_order'>('shopify_order');
  const [isTransforming, setIsTransforming] = useState(false);
  const [showCanonical, setShowCanonical] = useState(true);

  const shopifyRaw = `{
  "id": 892182049,
  "email": "sarah.connor@cyber.org",
  "created_at": "2026-09-13T16:20:00-04:00",
  "total_price": "149.99",
  "currency": "USD",
  "line_items": [
    {
      "variant_id": 99120,
      "title": "Industrial Valve Model 40",
      "quantity": 1,
      "price": "149.99"
    }
  ],
  "shipping_address": {
    "first_name": "Sarah",
    "last_name": "Connor",
    "zip": "90210",
    "country_code": "US"
  }
}`;

  const shopifyCanonical = `{
  "$schema": "https://specs.internal/v2/canonical-order.json",
  "canonicalEventId": "evt_order_892182049",
  "source": {
    "system": "ECOMMERCE_STORE_US",
    "ingestTimestamp": "2026-09-13T20:20:00.000Z"
  },
  "customer": {
    "primaryEmail": "sarah.connor@cyber.org",
    "normalizedName": "Sarah Connor",
    "countryISO2": "US"
  },
  "financials": {
    "currency": "USD",
    "amountCents": 14999,
    "taxIncluded": false
  },
  "items": [
    {
      "internalSku": "SKU-VALVE-M40",
      "qty": 1,
      "unitPriceCents": 14999
    }
  ],
  "routingMetadata": {
    "erpSyncTarget": "ENTERPRISE_SALES_ORDER",
    "priorityTier": "STANDARD_FULFILLMENT"
  }
}`;

  const hubspotRaw = `{
  "portalId": 827110,
  "objectType": "CONTACT",
  "properties": {
    "firstname": { "value": "David" },
    "lastname": { "value": "Kowalski" },
    "email": { "value": "dkowalski@aerospace.io" },
    "annualrevenue": { "value": "4500000" },
    "hs_lead_status": { "value": "QUALIFIED" }
  }
}`;

  const hubspotCanonical = `{
  "$schema": "https://specs.internal/v2/canonical-lead.json",
  "canonicalLeadId": "lead_hs_827110_dkowalski",
  "source": {
    "system": "CRM_SOURCE",
    "portalId": 827110
  },
  "contact": {
    "fullName": "David Kowalski",
    "email": "dkowalski@aerospace.io",
    "companyDomain": "aerospace.io"
  },
  "qualification": {
    "rawStatus": "QUALIFIED",
    "estimatedAnnualRevenueUSD": 4500000,
    "assignedRoutingQueue": "ENTERPRISE_SOLUTIONS_TIER_1"
  }
}`;

  const handleRunTransform = () => {
    setIsTransforming(true);
    setTimeout(() => {
      setIsTransforming(false);
      setShowCanonical(true);
    }, 300);
  };

  const rawPayload = selectedFormat === 'shopify_order' ? shopifyRaw : hubspotRaw;
  const canonicalPayload = selectedFormat === 'shopify_order' ? shopifyCanonical : hubspotCanonical;

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 text-xs font-mono-tech text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#ea580c] font-bold block">
            CANONICAL SCHEMA MAPPER & DIFF
          </span>
          <span className="text-slate-400 text-[11px]">
            Translates vendor-specific formats into internal domain models with type safety.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedFormat}
            onChange={(e) => {
              setSelectedFormat(e.target.value as any);
              handleRunTransform();
            }}
            className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#ea580c]"
          >
            <option value="shopify_order">E-Commerce Order → Canonical</option>
            <option value="hubspot_lead">CRM Inbound Lead → Canonical</option>
          </select>

          <button
            onClick={handleRunTransform}
            disabled={isTransforming}
            id="btn-run-schema-transform"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold transition-colors"
          >
            {isTransforming ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
            <span>Transform</span>
          </button>
        </div>
      </div>

      {/* Side by Side Diff Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
        
        {/* Left: Raw Vendor Payload */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-amber-400 font-semibold">1. INBOUND VENDOR PAYLOAD</span>
            <span>Heterogeneous JSON</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto max-h-72 leading-relaxed text-[11px] text-slate-300">
            <pre>{rawPayload}</pre>
          </div>
        </div>

        {/* Right: Normalized Canonical JSON */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-semibold">2. CANONICAL INTERNAL SPEC</span>
            <span className="text-emerald-400 font-bold">Typed & Normalized</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto max-h-72 leading-relaxed text-[11px] text-slate-300 relative">
            {isTransforming ? (
              <div className="flex items-center justify-center h-48 text-slate-400">
                <RefreshCw className="w-5 h-5 animate-spin text-[#ea580c] mr-2" />
                <span>Applying mapping dictionary...</span>
              </div>
            ) : (
              <pre>{canonicalPayload}</pre>
            )}
          </div>
        </div>

      </div>

      {/* Transformation Footprint */}
      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400">
        <div>
          <span className="text-slate-500 block">Currency Sanitization:</span>
          <span className="text-white font-semibold">Float to Integer Cents</span>
        </div>
        <div>
          <span className="text-slate-500 block">Date Coercion:</span>
          <span className="text-white font-semibold">ISO 8601 UTC Formatted</span>
        </div>
        <div>
          <span className="text-slate-500 block">Validation Engine:</span>
          <span className="text-emerald-400 font-semibold">Canonical Schema Contract</span>
        </div>
        <div>
          <span className="text-slate-500 block">Execution Mode:</span>
          <span className="text-white font-semibold">In-Memory Normalization</span>
        </div>
      </div>

    </div>
  );
};
