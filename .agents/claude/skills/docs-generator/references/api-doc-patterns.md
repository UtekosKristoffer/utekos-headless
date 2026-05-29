# Documentation Patterns for Agent-Friendly APIs

These patterns make API documentation easy for AI agents to parse and use correctly.

## Why agents need different docs

Human developers skim docs, infer patterns, and fill in gaps from experience. Agents read docs literally. If the docs are ambiguous, the agent will guess wrong. If an error case is undocumented, the agent won't know how to recover.

Agent-friendly docs are explicit, structured, and example-heavy.

## Formatting rules

### Endpoints

Always include the HTTP method and full path on their own line in a code block. Not inline. Agents parse the code block reliably. Prose descriptions of URLs are error-prone.

### Parameters as tables

Use markdown tables for query parameters and request body fields. Always include: parameter name, type, whether it's required or optional, and a short description. Agents parse tables into structured data. Bullet lists of parameters are harder to extract reliably.

### Example requests with curl

Use curl for all example requests. Include the full URL, all required headers, and the request body for POST/PUT/PATCH. Agents can execute curl commands directly.

### Example responses as JSON blocks

Show the complete response body, not a truncated version. Include all fields, realistic values, and the correct JSON structure.

### Every error case gets its own block

Document each error response separately with the HTTP status code, the condition that triggers it, and the exact response body.

### Schema section

End the docs with a schema section that lists every data type as a table with field name, type, and description.

### Workflow examples

End the docs with a Workflows section after the schema. Each workflow is a numbered sequence of API calls that accomplish a real task. Include a descriptive name, numbered steps with method + path in inline code, and a short explanation of why each call is made. Include at least 2 workflows covering common multi-step tasks.

## Anti-patterns to avoid

- Prose-only descriptions of endpoints (no code blocks with method + path)
- Truncated responses with "..." or "and so on"
- Missing error cases (agents will not know how to recover)
- Generic placeholder data in examples ("string", "number" instead of real values)
- Undocumented query parameters (agents won't discover them by experimentation)
