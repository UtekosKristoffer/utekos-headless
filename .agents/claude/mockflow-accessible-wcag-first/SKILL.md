---
name: mockflow-accessible-wcag-first
description: A high-contrast, clear layout designed for maximum readability and accessibility compliance. Trigger on: Design, accessible, wcag, high-contrast, legible, a11y, inclusive.
allowed-tools: mcp__claude_ai_WireframePro__render_wireframe
---

# Accessible WCAG-First

## Requirements
- MockFlow WireframePro MCP server (desktop on port 21194 or CLI install via npm)

## Author
MockFlow

## Category
design

## Output Type
wireframe

## Instructions
Design screens with a focus on high visibility and clear structure following WCAG accessibility principles. Use a high-contrast color palette: background white (#FFFFFF), primary text dark charcoal (#1A1A1A), primary accent deep navy (#003366), and secondary accent crimson (#C62828) for critical alerts. Headlines use Source Sans Pro in bold, while body text uses Source Sans Pro with a minimum size equivalent to 16px for readability. Buttons are large, rectangular with 4px slightly rounded corners, featuring solid navy backgrounds with white text. Input fields have thick 2px dark borders and clearly visible persistent labels above the field, never relying on placeholder text alone. Navigation bars are simple with high-contrast text links and a clear underline or thick border for the active state. Information is organized in a single-column or simple grid layout to ensure a logical reading order. Spacing is generous to prevent accidental clicks. Visual hierarchy is strictly maintained through font size and weight rather than color alone. Overall feel: clear, functional, high-contrast, and highly legible.

## Input examples
Describe the screen (e.g. "a user profile settings page" or "a medical appointment booking form")

## Output
Call the `render_wireframe` MCP tool from MockFlow WireframePro to render the result.
