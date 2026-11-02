---
name: carbon-pulse-design-system
description: >-
  Use this skill whenever designing, creating, or modifying frontend UI components,
  pages, feeds, tables, or styles in this project. Enforces the CarbonPulse Design
  System (CPDS v1.0) — our customized IBM Carbon v11 architecture featuring Electric Cyan
  and Pulse Violet brand tokens, rounded card geometry, Space Grotesk display typography,
  and accessible dark-first layering.
---

# CarbonPulse Design System (CPDS v1.0) — Agent Skill

This skill instructs AI coding agents (Antigravity / Claude Code) on how to build and style interfaces that strictly adhere to the **CarbonPulse Design System (CPDS v1.0)**—our customized extension of **IBM Carbon Design System v11** (`@carbon/react`).

## 1. Core Architecture & Imports

1. **Always use `@carbon/react` primitives first**:
   Use semantic Carbon components (`Tile`, `ClickableTile`, `ExpandableTile`, `DataTable`, `Search`, `Dropdown`, `MultiSelect`, `ContentSwitcher`, `Modal`, `Tabs`, `Accordion`, `Tag`, `Toggle`, `Slider`, `InlineNotification`, `ToastNotification`, `ProgressIndicator`, `Pagination`, `CodeSnippet`).
2. **Use `@carbon/icons-react` for iconography**.
3. **Keep `body.cpds-overrides-enabled` active** so our custom CSS overrides in `src/index.scss` apply cleanly.

## 2. Custom CSS Tokens & Manual Overrides (`src/index.scss`)

| Token Category | CSS Variable | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `--cpds-brand-primary` / `--cds-interactive` | `#00d4ff` | Electric Cyan interactive accent, focus ring, active borders |
| **Brand Secondary** | `--cpds-brand-secondary` | `#7c3aed` | Pulse Violet secondary accent & gradient stop |
| **Brand Gradient** | `--cpds-brand-gradient` | `linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)` | Primary buttons, hero text highlights, header accent bar |
| **Brand Accent** | `--cpds-brand-accent` | `#10b981` | Signal Emerald for healthy SLAs & verified badges |
| **Canvas Background** | `--cds-background` (g100) | `#0b0d13` | Deep space obsidian root background |
| **Surface Layer 01** | `--cds-layer-01` (g100) | `#131722` | Primary cards, tiles, filter bars, table containers |
| **Border Radius (Small)** | `--cpds-radius-sm` | `6px` | Inputs, search bars, selects, content switcher buttons |
| **Border Radius (Medium)** | `--cpds-radius-md` | `10px` | Buttons, notifications, color swatches |
| **Border Radius (Large)** | `--cpds-radius-lg` | `14px` | Tiles, post cards, modals, data tables, hero banners |
| **Border Radius (Pill)** | `--cpds-radius-pill` | `9999px` | Carbon Tags (`.cds--tag`) |
