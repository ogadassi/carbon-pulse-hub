import React, { useState } from 'react';
import {
  Tile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
  Tag,
  Button,
  CodeSnippet,
  Accordion,
  AccordionItem,
  ProgressBar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  InlineNotification,
  Toggle,
  Slider,
  NumberInput,
  DatePicker,
  DatePickerInput,
  Breadcrumb,
  BreadcrumbItem,
  DefinitionTooltip,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from '@carbon/react';
import {
  ColorPalette,
  TextFont,
  Grid,
  Code,
  CheckmarkOutline,
  Launch,
  Information,
} from '@carbon/icons-react';

interface GuidelinesPageProps {
  overridesEnabled: boolean;
  onToggleOverrides: () => void;
  currentTheme: 'g100' | 'g90' | 'g10' | 'white';
  onChangeTheme: (theme: 'g100' | 'g90' | 'g10' | 'white') => void;
}

const COLOR_SWATCHES = [
  {
    name: 'Brand Primary (Electric Cyan)',
    token: '--cpds-brand-primary',
    carbonOverride: '--cds-interactive',
    hex: '#00d4ff',
    ibmDefault: '#0f62fe',
    usage: 'Primary interactive accents, focus rings, active indicators',
  },
  {
    name: 'Brand Secondary (Pulse Violet)',
    token: '--cpds-brand-secondary',
    carbonOverride: 'Custom Gradient Stop',
    hex: '#7c3aed',
    ibmDefault: '#8a3ffc',
    usage: 'Gradient CTAs, hero glow, AI skill badges',
  },
  {
    name: 'Brand Accent (Signal Emerald)',
    token: '--cpds-brand-accent',
    carbonOverride: '--cds-support-success',
    hex: '#10b981',
    ibmDefault: '#24a148',
    usage: 'Verified post status, live cluster health indicators',
  },
  {
    name: 'Deep Space Background',
    token: '--cds-background',
    carbonOverride: '--cds-background (g100)',
    hex: '#0b0d13',
    ibmDefault: '#161616',
    usage: 'Root canvas background with cool obsidian tint',
  },
  {
    name: 'Elevated Surface Layer 01',
    token: '--cds-layer-01',
    carbonOverride: '--cds-layer-01 (g100)',
    hex: '#131722',
    ibmDefault: '#262626',
    usage: 'Post cards, filter bars, data table containers',
  },
  {
    name: 'Elevated Surface Layer 02',
    token: '--cds-layer-02',
    carbonOverride: '--cds-layer-02 (g100)',
    hex: '#1c2230',
    ibmDefault: '#393939',
    usage: 'Nested tiles, code blocks, interactive hover states',
  },
];

const SKILL_MARKDOWN_PREVIEW = `---
name: carbon-pulse-design-system
description: >-
  Design and build frontend interfaces using the CarbonPulse Design System (CPDS v1.0),
  our customized IBM Carbon v11 system with Electric Cyan & Pulse Violet tokens,
  rounded geometry (--cpds-radius-lg), Space Grotesk display typography, and dense
  engineering feed patterns.
---

# CarbonPulse Design System (CPDS v1.0) Skill

When creating or modifying UI components in this project, follow these rules:
1. Always import official components from \`@carbon/react\` and icons from \`@carbon/icons-react\`.
2. Apply \`body.cpds-overrides-enabled\` to activate our manual CSS token overrides in \`src/index.scss\`.
3. Use \`--cpds-brand-primary (#00d4ff)\` and \`--cpds-brand-gradient\` for primary CTAs instead of stock IBM Blue (\`#0f62fe\`).
4. Enforce rounded card geometry (\`--cpds-radius-lg: 14px\`) on Tiles, Modals, and DataTables.`;

export const GuidelinesPage: React.FC<GuidelinesPageProps> = ({
  overridesEnabled,
  onToggleOverrides,
  currentTheme,
  onChangeTheme,
}) => {
  const [playgroundRadius, setPlaygroundRadius] = useState<number>(14);
  const [playgroundElevation, setPlaygroundElevation] = useState<number>(28);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb noTrailingSlash style={{ marginBottom: '1rem' }}>
        <BreadcrumbItem href="#feed">CarbonPulse Hub</BreadcrumbItem>
        <BreadcrumbItem href="#guidelines" isCurrentPage>
          Design System Guidelines & Agent Skill (Step 6, 7 & 8)
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Hero Banner */}
      <div className="cpds-hero-banner">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <Tag type="cyan" size="md">
                CPDS v1.0 Specification
              </Tag>
              <Tag type="purple" size="md">
                Built on IBM Carbon v11
              </Tag>
              <Tag type="green" size="md">
                Agent Skill Included (.agents/skills/)
              </Tag>
            </div>
            <h1 className="cpds-hero-title">
              CarbonPulse <span className="cpds-gradient-text">Design System Guidelines</span>
            </h1>
            <p style={{ fontSize: '1.02rem', opacity: 0.88, lineHeight: 1.6, margin: 0 }}>
              This living specification documents our manual CSS overrides on top of IBM Carbon Design System (Step 6),
              the custom AI Agent Skill that enforces these tokens automatically (Step 7), and interactive component
              guidelines (Step 8).
            </p>
          </div>

          <Tile style={{ minWidth: '290px', padding: '1.25rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ColorPalette size={18} /> Live CSS Override Switcher
            </div>
            <Toggle
              id="guidelines-override-toggle"
              labelText="Manual CSS Token Overrides (Step 6)"
              labelA="Stock IBM Carbon"
              labelB="CarbonPulse CSS Active"
              toggled={overridesEnabled}
              onToggle={onToggleOverrides}
            />
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.78 }}>
              Toggle this switch to compare stock IBM Carbon (0px sharp corners, #0f62fe blue) against our custom CSS overrides in real time!
            </div>
          </Tile>
        </div>
      </div>

      {/* Main Guidelines Tabs */}
      <Tabs>
        <TabList aria-label="Design System Sections">
          <Tab renderIcon={ColorPalette}>1. Color Tokens & CSS Overrides</Tab>
          <Tab renderIcon={TextFont}>2. Typography & Geometry</Tab>
          <Tab renderIcon={Grid}>3. Component Sandbox & Rules</Tab>
          <Tab renderIcon={Code}>4. AI Agent Skill (SKILL.md)</Tab>
        </TabList>

        <TabPanels>
          {/* TAB 1: COLOR TOKENS & CSS OVERRIDES */}
          <TabPanel>
            <div style={{ marginTop: '1.25rem' }}>
              <InlineNotification
                kind="info"
                lowContrast
                hideCloseButton
                title="How We Customized IBM Carbon via Manual CSS (Step 6):"
                subtitle="In src/index.scss, we override Carbon's root CSS custom properties (--cds-interactive, --cds-background, --cds-layer-01) and component classes (.cds--btn, .cds--tile, .cds--header, .cds--tag) to transform Carbon's utilitarian aesthetic into a modern developer platform."
                style={{ marginBottom: '1.5rem', maxWidth: '100%' }}
              />

              <h3 style={{ fontFamily: 'var(--cpds-font-display)', marginBottom: '0.75rem' }}>
                Color Palette & Token Swatches
              </h3>
              <div className="cpds-swatch-grid">
                {COLOR_SWATCHES.map((swatch) => (
                  <div key={swatch.name} className="cpds-swatch-card">
                    <div className="cpds-swatch-color" style={{ background: swatch.hex }} />
                    <div className="cpds-swatch-meta">
                      <div style={{ fontWeight: 700, fontFamily: 'var(--cpds-font-sans)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                        {swatch.name}
                      </div>
                      <div style={{ color: 'var(--cpds-brand-primary)' }}>{swatch.token}</div>
                      <div style={{ opacity: 0.75, marginTop: '0.2rem' }}>
                        Hex: <strong>{swatch.hex}</strong> (IBM: {swatch.ibmDefault})
                      </div>
                      <div style={{ fontFamily: 'var(--cpds-font-sans)', fontSize: '0.76rem', opacity: 0.8, marginTop: '0.45rem' }}>
                        {swatch.usage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--cpds-font-display)', marginBottom: '0.75rem' }}>
                Stock IBM Carbon v11 vs. CarbonPulse Manual CSS Overrides
              </h3>
              <StructuredListWrapper>
                <StructuredListHead>
                  <StructuredListRow head>
                    <StructuredListCell head>Design Dimension</StructuredListCell>
                    <StructuredListCell head>Stock IBM Carbon v11</StructuredListCell>
                    <StructuredListCell head>CarbonPulse Override (src/index.scss)</StructuredListCell>
                    <StructuredListCell head>CSS Selector / Variable</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  <StructuredListRow>
                    <StructuredListCell><strong>Primary Brand Color</strong></StructuredListCell>
                    <StructuredListCell>IBM Blue 60 (<code>#0f62fe</code>)</StructuredListCell>
                    <StructuredListCell>Electric Cyan (<code>#00d4ff</code>) + Pulse Violet Gradient</StructuredListCell>
                    <StructuredListCell><code>--cds-interactive</code>, <code>.cds--btn--primary</code></StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell><strong>Corner Geometry</strong></StructuredListCell>
                    <StructuredListCell>Strict <code>0px</code> sharp corners everywhere</StructuredListCell>
                    <StructuredListCell><code>6px</code> inputs, <code>10px</code> buttons, <code>14px</code> tiles & modals</StructuredListCell>
                    <StructuredListCell><code>--cpds-radius-sm/md/lg</code></StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell><strong>Display Typography</strong></StructuredListCell>
                    <StructuredListCell>IBM Plex Sans only</StructuredListCell>
                    <StructuredListCell><strong>Space Grotesk</strong> headings + IBM Plex Sans body + Plex Mono</StructuredListCell>
                    <StructuredListCell><code>--cpds-font-display</code></StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell><strong>UI Shell Header</strong></StructuredListCell>
                    <StructuredListCell>Solid opaque <code>#161616</code> bar</StructuredListCell>
                    <StructuredListCell>Translucent glassmorphic blur (<code>backdrop-filter: blur(16px)</code>) + bottom gradient</StructuredListCell>
                    <StructuredListCell><code>.cds--header</code>, <code>.cds--header::after</code></StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell><strong>Interactive Card Hover</strong></StructuredListCell>
                    <StructuredListCell>Flat background shift</StructuredListCell>
                    <StructuredListCell><code>translateY(-3px)</code> lift + cyan glow border shadow</StructuredListCell>
                    <StructuredListCell><code>.cds--tile--clickable:hover</code></StructuredListCell>
                  </StructuredListRow>
                </StructuredListBody>
              </StructuredListWrapper>
            </div>
          </TabPanel>

          {/* TAB 2: TYPOGRAPHY & GEOMETRY */}
          <TabPanel>
            <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
              <Tile>
                <h3 style={{ fontFamily: 'var(--cpds-font-display)', marginTop: 0 }}>Typography Scale</h3>
                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                  We pair geometric <strong>Space Grotesk</strong> for high-impact headlines with <strong>IBM Plex Sans</strong> for long-form readability and <strong>IBM Plex Mono</strong> for code & metrics.
                </p>
                <div style={{ borderTop: '1px solid rgba(148,163,184,0.15)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <div style={{ fontFamily: 'var(--cpds-font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Display 01 — Space Grotesk Bold (32px)
                  </div>
                  <div style={{ fontFamily: 'var(--cpds-font-display)', fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Heading 03 — Post Card Headline (21.6px)
                  </div>
                  <div style={{ fontFamily: 'var(--cpds-font-sans)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                    Body Long 02 — IBM Plex Sans Regular (16px). Used for engineering post summaries, documentation paragraphs, and modal descriptions.
                  </div>
                  <div style={{ fontFamily: 'var(--cpds-font-mono)', fontSize: '0.85rem', color: 'var(--cpds-brand-primary)' }}>
                    Code 01 — IBM Plex Mono (13.6px) :: cluster_latency_p99 = 4.2ms
                  </div>
                </div>
              </Tile>

              <Tile>
                <h3 style={{ fontFamily: 'var(--cpds-font-display)', marginTop: 0 }}>Interactive Geometry & Elevation Sandbox</h3>
                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                  Test how our custom border-radius and glow elevation tokens affect Carbon Tile containers:
                </p>
                <div style={{ margin: '1rem 0' }}>
                  <Slider
                    id="radius-slider"
                    labelText="Card Border Radius (--cpds-radius-lg in px)"
                    min={0}
                    max={28}
                    value={playgroundRadius}
                    onChange={({ value }) => setPlaygroundRadius(value)}
                  />
                </div>
                <div style={{ margin: '1rem 0' }}>
                  <Slider
                    id="elevation-slider"
                    labelText="Cyan Glow Blur Radius (px)"
                    min={0}
                    max={60}
                    value={playgroundElevation}
                    onChange={({ value }) => setPlaygroundElevation(value)}
                  />
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '1.25rem',
                    borderRadius: `${playgroundRadius}px`,
                    background: 'var(--cds-layer-02)',
                    border: '1px solid rgba(0, 212, 255, 0.45)',
                    boxShadow: `0 10px ${playgroundElevation}px rgba(0, 212, 255, 0.25)`,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontFamily: 'var(--cpds-font-display)', fontWeight: 700 }}>
                    Live Preview Card (radius: {playgroundRadius}px, glow: {playgroundElevation}px)
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.35rem' }}>
                    Carbon’s 2x Grid system combined with soft rounded geometry and ambient cyan glow.
                  </div>
                </div>
              </Tile>
            </div>
          </TabPanel>

          {/* TAB 3: COMPONENT SANDBOX & RULES */}
          <TabPanel>
            <div style={{ marginTop: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--cpds-font-display)', marginBottom: '1rem' }}>
                Carbon Component Showcase & Theme Switcher
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <Tile>
                  <h4 style={{ marginTop: 0, fontFamily: 'var(--cpds-font-display)' }}>Buttons & Interactive States</h4>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <Button kind="primary" size="md" renderIcon={Launch}>
                      Primary Gradient
                    </Button>
                    <Button kind="secondary" size="md">
                      Secondary Cyan Border
                    </Button>
                    <Button kind="tertiary" size="md">
                      Tertiary Ghost
                    </Button>
                    <Button kind="danger" size="md">
                      Danger Action
                    </Button>
                  </div>
                  <p style={{ fontSize: '0.82rem', opacity: 0.78, margin: 0 }}>
                    Guideline: Use at most one <code>primary</code> gradient button per viewport section to preserve visual hierarchy.
                  </p>
                </Tile>

                <Tile>
                  <h4 style={{ marginTop: 0, fontFamily: 'var(--cpds-font-display)' }}>Carbon Theme Layering (g100 / g90 / g10 / white)</h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                    Switch the global Carbon Theme token set to verify contrast across dark and light modes:
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {(['g100', 'g90', 'g10', 'white'] as const).map((th) => (
                      <Button
                        key={th}
                        size="sm"
                        kind={currentTheme === th ? 'primary' : 'secondary'}
                        onClick={() => onChangeTheme(th)}
                      >
                        Theme: {th.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </Tile>

                <Tile>
                  <h4 style={{ marginTop: 0, fontFamily: 'var(--cpds-font-display)' }}>Progress, NumberInput & DatePicker</h4>
                  <ProgressBar
                    label="Design Token Compliance Score"
                    helperText="98% of components follow CPDS v1.0 guidelines"
                    value={98}
                    max={100}
                  />
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <NumberInput
                      id="guidelines-number-input"
                      label="Grid Gutter (px)"
                      min={8}
                      max={32}
                      value={16}
                      step={4}
                      size="sm"
                    />
                    <DatePicker datePickerType="single">
                      <DatePickerInput
                        id="guidelines-date-picker"
                        placeholder="mm/dd/yyyy"
                        labelText="Release Audit Date"
                        size="sm"
                      />
                    </DatePicker>
                  </div>
                </Tile>
              </div>

              <ExpandableTile
                tileCollapsedIconText="Expand to inspect ExpandableTile pattern"
                tileExpandedIconText="Collapse ExpandableTile"
                style={{ marginBottom: '1.5rem' }}
              >
                <TileAboveTheFoldContent>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckmarkOutline size={20} />
                    <strong>ExpandableTile Guideline:</strong> Use ExpandableTiles for long post postmortems or collapsible telemetry logs.
                  </div>
                </TileAboveTheFoldContent>
                <TileBelowTheFoldContent>
                  <div style={{ paddingTop: '1rem', fontSize: '0.9rem', opacity: 0.85 }}>
                    Below-the-fold content remains keyboard-accessible and inherits <code>--cpds-radius-lg</code> automatically.
                    Combine with Carbon’s{' '}
                    <DefinitionTooltip openOnHover definition="A Carbon component that explains domain-specific terms inline.">
                      DefinitionTooltip
                    </DefinitionTooltip>{' '}
                    to clarify technical terminology without leaving the feed.
                  </div>
                </TileBelowTheFoldContent>
              </ExpandableTile>

              <Accordion>
                <AccordionItem title="Rule 1: When to use Carbon Tile vs. DataTable">
                  <p>
                    Use custom-styled <code>Tile</code> cards for rich narrative posts with code snippets and author metadata. Switch to <code>DataTable</code> when users need multi-column sorting, batch selection, or CSV export across dozens of items.
                  </p>
                </AccordionItem>
                <AccordionItem title="Rule 2: Accessibility & Keyboard Navigation">
                  <p>
                    Never remove Carbon’s focus outline. Instead, our CSS override maps <code>--cds-focus</code> to high-visibility Electric Cyan (<code>#00d4ff</code>) so keyboard users always have a 3:1+ contrast focus ring on dark surfaces.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
          </TabPanel>

          {/* TAB 4: AI AGENT SKILL (STEP 7) */}
          <TabPanel>
            <div style={{ marginTop: '1.25rem' }}>
              <Tile style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Information size={20} />
                  <h3 style={{ fontFamily: 'var(--cpds-font-display)', margin: 0 }}>
                    Step 7: Custom Agent Skill for CarbonPulse Design System
                  </h3>
                </div>
                <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6 }}>
                  We created a reusable AI Agent Skill inside this repository at{' '}
                  <code>.agents/skills/carbon-pulse-design-system/SKILL.md</code> (compatible with both Antigravity and Claude Code).
                  Whenever an AI agent is asked to build a new page or feature in this project, it automatically discovers and follows this skill!
                </p>
                <CodeSnippet type="multi" feedback="Copied SKILL.md to clipboard">
                  {SKILL_MARKDOWN_PREVIEW}
                </CodeSnippet>
              </Tile>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
