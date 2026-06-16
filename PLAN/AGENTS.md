# MASTER DIRECTIVE AND OPERATING PROTOCOL: PROJECT UTEKOS

**Status:** Critical and non-negotiable guidelines governing all human and machine interaction within the codebase.
**Context:** The primary objective of Project Utekos is to position the company alongside industry leaders through evidence-based marketing and conversion-optimized digital experiences.
**Business Goal:** NOK 100 million in annual revenue.

Every interaction, line of code, and architectural decision must be executed with the precision, discipline, and performance standards expected in a world championship final for web design and frontend engineering. There is zero tolerance for negligence, outdated practices, or unsupported assumptions.

---

# Part 1: Core Directives

## 1. Zero Assumption Protocol (ZAP)

All development, troubleshooting, analysis, and recommendations are governed by the **Zero Assumption Protocol (ZAP)**.

### 1.1 No Assumptions

* Solutions must never be based on assumed states within the DOM, backend systems, databases, or third-party integrations (e.g., Meta, Google, UET).
* Any recommendation must be grounded in verified, observable data.

### 1.2 Mandatory Verification

Before providing an answer or generating code, the agent must:

1. Use available tools to inspect the actual system state.
2. Verify relevant files, configurations, APIs, logs, or runtime environments.
3. Confirm assumptions through direct observation.

If required tools are unavailable or authentication fails:

* The operation must stop immediately.
* The user must be informed of the missing visibility.
* The agent must proactively identify the missing dependency and recommend a resolution.

### 1.3 Explicit Refusal

Providing confident conclusions based on fabricated, inferred, or hallucinated information constitutes a direct violation of project integrity and security standards.

---

## 2. Technical Execution and Code Quality Standards

Technology evolves continuously (e.g., Next.js, Docker, Vercel). Agents must disregard outdated training assumptions and rely exclusively on current project documentation, verified implementation details, and modern best practices.

### 2.1 CSS and Styling

* Use only modern, canonical Tailwind CSS syntax (v3.4+ / v4+).
* Use the updated variable syntax:

```html
bg-(--brand-primary)
```

* Deprecated `var()`-based utility syntax is prohibited.
* Modern utility aliases such as `grow` and `shrink` must be used consistently.
* Styling must remain aligned with the project's design token system.

### 2.2 Performance and Architecture

Code must prioritize:

* Semantic HTML
* DRY principles
* Minimal DOM manipulation
* Efficient rendering patterns
* Optimized component architecture
* Clean and maintainable code structures

---

## 3. Accessibility and Brand Integrity

Personal preferences and subjective aesthetics are subordinate to accessibility requirements.

### 3.1 WCAG Compliance

**WCAG 2.2 Level AA** is the minimum acceptable standard.

Before proposing any visual change:

* Contrast ratios must be verified.
* Readability must be evaluated.
* Accessibility implications must be confirmed.

Accessibility validation must occur proactively, not reactively.

### 3.2 Brand Consistency

The following elements are predefined and governed by strict standards:

* Color palette
* Typography
* Shapes and visual motifs
* Design tokens
* Brand voice and messaging

Any deviation from the established design system is considered a critical implementation error.

---

## 4. Continuous Context Validation

Codebases are dynamic. No file, dependency, or implementation should be treated as authoritative solely because it existed previously.

For every iteration, agents must:

* Revalidate relevant files
* Review dependency states
* Confirm architectural assumptions
* Update contextual understanding in real time

Agents must continuously learn, adapt, and correct their understanding. Defending incorrect output or relying on stale context is unacceptable.

---

# Part 2: Technical Visibility and Implementation Plan

To enforce the directives above, the project requires infrastructure that provides agents with direct, verifiable visibility into the development environment, runtime systems, and production integrations.

---

## 1. Source of Truth for Code: Direct Repository Access

Relying solely on Git commits is insufficient for real-time development workflows.

### Objective

Provide direct read and write access to the local project filesystem.

### Recommended Solution

Deploy an MCP filesystem server:

```text
mcp-server-filesystem
```

configured to point directly to the project root.

### Benefits

* Access to the current file state
* Visibility into uncommitted local changes
* Direct file modification capabilities
* Elimination of manual copy-paste workflows

---

## 2. Real-Time DOM and Console Visibility

To diagnose issues such as:

* Styles not updating
* Meta events not firing
* Next.js runtime errors
* Client-side rendering issues

the agent must observe the application exactly as the browser does.

### Recommended Solution

Integrate a Headless Browser MCP, such as:

```text
mcp-server-playwright
```

or

```text
puppeteer
```

### Capabilities

* Navigate to local environments (e.g., `localhost:3000`)
* Inspect the live DOM tree
* Monitor network requests
* Validate analytics and conversion events
* Capture browser console errors
* Verify rendered UI behavior

---

## 3. Backend and Third-Party Verification

Frontend inspection alone is insufficient for validating business-critical data.

### Use Cases

* Shopify inventory verification
* Order validation
* Meta event quality checks
* Conversion tracking audits

### Recommended Solution

Configure dedicated MCP endpoints for:

* Shopify Admin API
* Meta Conversions API
* Other critical backend services

### Benefits

Agents can verify data directly through authoritative APIs rather than inferring behavior from frontend code.

---

## 4. Documentation and Context Management

External URLs are fragile, difficult to maintain, and inefficient to process repeatedly.

### Recommended Structure

Store all project documentation locally in a dedicated directory:

```text
/docs
```

### Suggested Contents

```text
/docs
├── architecture/
├── design-system/
├── integrations/
├── protocols/
│   └── zap.md
├── deployment/
└── onboarding/
```

### Benefits

* Faster access for AI agents
* Reduced dependency on external resources
* Improved consistency and maintainability
* Centralized project knowledge

---

## 5. Authentication and Token Management

Authentication failures frequently occur because agents operate within isolated environments and cannot reliably discover credentials.

### Root Cause

Tools such as Cursor, Codex, and CLI-based agents often run in sandboxed environments where environment variables are not automatically available.

### Recommended Solution

Establish a single, centralized configuration source.

Example:

```text
.env.agents
```

located at the project root.

### Requirements

* The client application must inject required environment variables during MCP server startup.
* Credentials must be provided explicitly rather than discovered dynamically.
* Agents should never be required to search for tokens or secrets.

### Benefits

* Predictable authentication behavior
* Reduced configuration errors
* Faster onboarding
* Improved operational reliability

---

# Summary

Project Utekos operates under a strict verification-first methodology.

Core principles:

1. Never assume; always verify.
2. Use real system state as the source of truth.
3. Follow modern standards exclusively.
4. Maintain WCAG 2.2 AA compliance at all times.
5. Protect brand integrity through strict adherence to design tokens.
6. Continuously validate context and dependencies.
7. Build infrastructure that enables direct visibility into code, runtime behavior, APIs, and documentation.

These principles are mandatory and apply to every architectural decision, implementation detail, analysis, and recommendation throughout the project lifecycle.
