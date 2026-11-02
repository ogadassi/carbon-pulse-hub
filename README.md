# CarbonPulse Hub — Tech News, Engineering Feed & Custom Carbon Design System

A frontend application built with **IBM Carbon Design System v11** (`@carbon/react`), customized with manual CSS overrides (**CarbonPulse Design System v1.0**), an interactive **Design System Guidelines** specification page, and a reusable **AI Agent Skill** (`SKILL.md`).

## Assignment Requirements Checklist

1. **New Project in a New Folder**: Created in `F:\Programming\new stuff\10x\carbon-pulse-hub`.
2. **Frontend Website with Messages & Posts**: Real-time Tech News & Engineering Feed with posts, announcements, reactions, bookmarks, code snippets, and a live "Publish New Post" broadcast modal.
3. **Designed with IBM Carbon Design System**: Built using `@carbon/react` and `@carbon/icons-react` across all 4 Carbon themes (`g100`, `g90`, `g10`, `white`).
4. **Wide Variety of Carbon Components**: Includes `Search`, `Dropdown`, `MultiSelect`, `ContentSwitcher`, `DataTable` (with sorting, batch selection, toolbar search, JSON export), `Pagination`, `Modal`, `Tabs`, `Accordion`, `ProgressIndicator`, `ProgressBar`, `Slider`, `Toggle`, `Tag`, `CodeSnippet`, `InlineNotification`, `ToastNotification`, `ActionableNotification`, `StructuredList`, `ExpandableTile`, `DefinitionTooltip`, `NumberInput`, `DatePicker`, and `UI Shell Header`.
5. **Maximum Carbon Component Coverage**: Over 28 distinct Carbon components integrated seamlessly.
6. **Manual CSS Overrides (`src/index.scss`)**: Overrides Carbon's sharp `0px` corners and `#0f62fe` blue with custom tokens (`--cpds-brand-primary: #00d4ff`, `--cpds-brand-secondary: #7c3aed`, `--cpds-radius-lg: 14px`, glassmorphic header blur, and `Space Grotesk` display typography) plus a live toggle switch to compare Stock Carbon vs. Custom CSS in real time.
7. **Custom AI Agent Skill (`SKILL.md`)**:
   - Antigravity Workspace Skill: [`.agents/skills/carbon-pulse-design-system/SKILL.md`](./.agents/skills/carbon-pulse-design-system/SKILL.md)
   - Claude Code Skill Mirror: [`.claude/skills/carbon-pulse-design-system/SKILL.md`](./.claude/skills/carbon-pulse-design-system/SKILL.md)
8. **Design System Guidelines Page**: Interactive 4-tab specification (`src/components/GuidelinesPage.tsx`) featuring color swatches, CSS token diff table, live geometry/glow sliders, component sandbox, and `SKILL.md` viewer.
9. **Deployed to GitHub & GitHub Pages**: Automated via `.github/workflows/deploy.yml` and `gh-pages`.

## Local Development

```bash
npm install
npm run dev
```
