# Requirements Document: Remove Open Source References

## Introduction

This feature removes all open source and GitHub references from the SkillScan web frontend since x402guard is not an open source project. All GitHub links, repository references, and open source mentions need to be removed from the UI.

## Alignment with Product Vision

SkillScan is a proprietary security auditing service. The UI should not suggest it's open source or encourage contributions to non-existent public repositories.

## Requirements

### Requirement 1: Remove GitHub Links from Navigation

**User Story:** As a user, I should not see GitHub links in the navigation since the project is not open source.

#### Acceptance Criteria

1. WHEN viewing the navigation bar THEN the system SHALL NOT display a GitHub icon or link
2. WHEN viewing the mobile menu THEN the system SHALL NOT display a GitHub link

### Requirement 2: Remove GitHub References from Hero Section

**User Story:** As a user viewing the hero section, I should not see "View on GitHub" button.

#### Acceptance Criteria

1. WHEN viewing the hero section THEN the system SHALL NOT display a "View on GitHub" button
2. WHEN viewing call-to-action buttons THEN the system SHALL only show the "Try Scanner" button

### Requirement 3: Remove GitHub Links from Footer

**User Story:** As a user viewing the footer, I should not see GitHub links or "Report Issues" links.

#### Acceptance Criteria

1. WHEN viewing the footer THEN the system SHALL NOT display GitHub icon links
2. WHEN viewing the Resources section THEN the system SHALL NOT display "GitHub" or repository links
3. WHEN viewing the Support section THEN the system SHALL NOT display "Report Issue" links to GitHub

### Requirement 4: Update FAQ to Remove Open Source References

**User Story:** As a user reading the FAQ, I should not see mentions that the project is open source or self-hostable.

#### Acceptance Criteria

1. WHEN viewing FAQ THEN the system SHALL NOT mention "open source"
2. WHEN viewing FAQ THEN the system SHALL NOT suggest self-hosting from GitHub
3. WHEN viewing FAQ section THEN the system SHALL NOT show "Open an Issue" button

### Requirement 5: Remove GitHub Links from Integration Section

**User Story:** As a user viewing the Integration section, I should see documentation links but not GitHub repository links.

#### Acceptance Criteria

1. WHEN viewing API documentation card THEN the system SHALL link to API docs, not GitHub
2. WHEN viewing Self-Hosting card THEN the system SHALL either be removed or link to a contact form

### Requirement 6: Clean Up Constants

**User Story:** As a developer, unused GitHub constants should be removed from the codebase.

#### Acceptance Criteria

1. WHEN building the project THEN there SHALL be no unused GITHUB_REPO or GITHUB_API_REPO constants
2. IF constants are still needed for internal use THEN they SHALL be moved to a non-public location

## Non-Functional Requirements

### Code Architecture and Modularity
- Remove unused imports (Github icon from lucide-react where no longer used)
- Remove unused constants from lib/constants.ts
- Maintain existing component structure

### Performance
- No performance impact expected (removing code)

### Security
- No security implications

### Reliability
- All removed links should not cause 404 errors or broken UI

### Usability
- UI should remain visually balanced after removing GitHub buttons
