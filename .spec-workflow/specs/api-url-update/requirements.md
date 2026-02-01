# Requirements: API URL Update to x402guard.xyz

## Overview
Update all API calls and UI references from the current API endpoint (`https://skillguard-api.vercel.app`) to the new production domain (`http://x402guard.xyz/`).

## Goals
1. Centralize API URL configuration for easy maintenance
2. Update all code references to use the new domain
3. Update UI/documentation references for consistency with the x402guard branding

## Requirements

### R1: Update API Configuration
- Update `lib/constants.ts` to use `http://x402guard.xyz` as the default API URL
- Ensure environment variable override (`NEXT_PUBLIC_API_URL`) still works

### R2: Update Code Examples in UI
- Update `components/sections/Integration.tsx` code examples to show the new API URL
- Ensure curl examples and code snippets reflect the actual production endpoint

### R3: Update Metadata and Branding
- Verify `app/layout.tsx` metadataBase uses correct domain for x402guard.xyz
- Update any hardcoded URLs in metadata/SEO configuration

### R4: Update GitHub Repository References
- Update `GITHUB_API_REPO` constant to point to correct API repository if needed

## Out of Scope
- Backend/API changes (this is frontend-only)
- DNS configuration
- SSL/TLS certificate setup

## Acceptance Criteria
- [ ] All API calls route to `http://x402guard.xyz/`
- [ ] Code examples in Integration section show correct URL
- [ ] Build completes without errors
- [ ] Development server runs successfully
