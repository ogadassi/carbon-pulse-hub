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

---

## 1. Core Architecture & Imports

1. **Always use `@carbon/react` primitives first**:
   Before creating custom HTML elements, check if `@carbon/react` provides a semantic component (`Tile`, `ClickableTile`, `ExpandableTile`, `DataTable`, `Search`, `Dropdown`, `MultiSelect`, `ContentSwitcher`, `Modal`, `Tabs`, `Accordion`, `Tag`, `Toggle`, `Slider`, `InlineNotification`, `ToastNotification`, `ProgressIndicator`, `Pagination`, `CodeSnippet`).
2. **Use `@carbon/icons-react` for iconography**:
   Pass Carbon icons via the `renderIcon` prop on buttons and tabs (e.g., `<Button renderIcon={Add}>`).
3. **Keep `body.cpds-overrides-enabled` active**:
   Our custom CSS token overrides in `src/index.scss` are scoped under `body.cpds-overrides-enabled` so users can live-toggle between Stock IBM Carbon and CarbonPulse Design System.

---

## 2. Custom CSS Tokens & Manual Overrides (`src/index.scss`)

Stock IBM Carbon uses sharp `0px` corners and IBM Blue (`#0f62fe`). **CPDS v1.0** overrides these via CSS Custom Properties:

| Token Category | CSS Variable | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `--cpds-brand-primary` / `--cds-interactive` | `#00d4ff` | Electric Cyan interactive accent, focus ring, active borders |
| **Brand Secondary** | `--cpds-brand-secondary` | `#7c3aed` | Pulse Violet secondary accent & gradient stop |
| **Brand Gradient** | `--cpds-brand-gradient` | `linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)` | Primary buttons, hero text highlights, header accent bar |
| **Brand Accent** | `--cpds-brand-accent` | `#10b981` | Signal Emerald for healthy SLAs & verified badges |
| **Canvas Background** | `--cds-background` (g100) | `#0b0d13` | Deep space obsidian root background |
| **Surface Layer 01** | `--cds-layer-01` (g100) | `#131722` | Primary cards, tiles, filter bars, table containers |
| **Surface Layer 02** | `--cds-layer-02` (g100) | `#1c2230` | Nested tiles, code blocks, hover states |
| **Border Radius (Small)** | `--cpds-radius-sm` | `6px` | Inputs, search bars, selects, content switcher buttons |
| **Border Radius (Medium)** | `--cpds-radius-md` | `10px` | Buttons, notifications, color swatches |
| **Border Radius (Large)** | `--cpds-radius-lg` | `14px` | Tiles, post cards, modals, data tables, hero banners |
| **Border Radius (Pill)** | `--cpds-radius-pill` | `9999px` | Carbon Tags (`.cds--tag`) |

---

## 3. Typography Rules

- **Display & Headlines (`--cpds-font-display`)**: Use `'Space Grotesk', sans-serif` (`font-weight: 600` or `700`, `letter-spacing: -0.02em`) for page titles, KPI metrics, card titles, and navigation headers.
- **Body Copy (`--cpds-font-sans`)**: Use `'IBM Plex Sans', sans-serif` (`line-height: 1.6`) for post summaries, form labels, and documentation.
- **Technical Metadata & Code (`--cpds-font-mono`)**: Use `'IBM Plex Mono', monospace` for post IDs, timestamps, token names, and `CodeSnippet` blocks.

---

## 4. Component Design Patterns

### A. Feed Post Cards (`.cpds-post-card`)
- Wrap each post in a Carbon `<Tile className="cpds-post-card">`.
- Pinned or high-priority announcements must include `.cpds-post-card--pinned` (`4px solid var(--cpds-brand-primary)` left border).
- Include author avatar initials inside `.cpds-avatar`, category `<Tag>`, and interactive footer actions (`ThumbsUp`, `Chat`, `Bookmark`, `OverflowMenu`).

### B. Filtering & Search Bars (`.cpds-filter-bar`)
- Combine Carbon `<Search>`, `<Dropdown>`, and `<MultiSelect>` inside `.cpds-filter-bar` above the feed.
- Pair with a `<ContentSwitcher>` to let users switch between Card Feed view, Pinned view, Saved view, and `<DataTable>` directory view.

### C. Verification Checklist Before Completing Any UI Task
1. Run `npm run build` to verify TypeScript and SCSS compilation succeed with zero errors.
2. Confirm all new interactive components work in both `g100` (Dark) and `g10`/`white` (Light) Carbon themes.
3. Document any new tokens or components on the **Design System Guidelines** page (`src/components/GuidelinesPage.tsx`).
