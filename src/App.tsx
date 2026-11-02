import { useState, useEffect, useMemo } from 'react';
import {
  Theme,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
  Search,
  Dropdown,
  MultiSelect,
  ContentSwitcher,
  Switch,
  Button,
  Tag,
  Tile,
  ClickableTile,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableSelectAll,
  TableSelectRow,
  TableBatchActions,
  TableBatchAction,
  Pagination,
  Modal,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  Checkbox,
  RadioButtonGroup,
  RadioButton,
  Toggle,
  InlineNotification,
  ToastNotification,
  ActionableNotification,
  Accordion,
  AccordionItem,
  ProgressBar,
  ProgressIndicator,
  ProgressStep,
  CodeSnippet,
  OverflowMenu,
  OverflowMenuItem,
  InlineLoading,
  Slider,
} from '@carbon/react';
import {
  Add,
  Notification,
  ColorSwitch,
  Catalog,
  Activity,
  ThumbsUp,
  Chat,
  Bookmark,
  BookmarkFilled,
  TrashCan,
  Download,
  Filter,
  ColorPalette,
  CheckmarkFilled,
  Rocket,
  Terminal,
  Renew,
} from '@carbon/icons-react';
import { INITIAL_POSTS, CATEGORIES, type PostItem } from './data/mockPosts';
import { GuidelinesPage } from './components/GuidelinesPage';

const AVAILABLE_TAGS = [
  { id: 'Carbon v11', label: 'Carbon v11' },
  { id: 'CSS Tokens', label: 'CSS Tokens' },
  { id: 'Kubernetes', label: 'Kubernetes' },
  { id: 'LLM Inference', label: 'LLM Inference' },
  { id: 'SecOps', label: 'SecOps' },
  { id: 'Agent Skills', label: 'Agent Skills' },
  { id: 'WebAssembly', label: 'WebAssembly' },
  { id: 'TypeScript', label: 'TypeScript' },
];

export function App() {
  // Navigation & Theme State
  const [activeNav, setActiveNav] = useState<'feed' | 'guidelines'>('feed');
  const [carbonTheme, setCarbonTheme] = useState<'g100' | 'g90' | 'g10' | 'white'>('g100');
  const [overridesEnabled, setOverridesEnabled] = useState<boolean>(true);
  const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(false);

  // Feed & Filtering State
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedTags, setSelectedTags] = useState<Array<{ id: string; label: string }>>([]);
  const [viewModeIndex, setViewModeIndex] = useState<number>(0); // 0: All, 1: Pinned/Featured, 2: Bookmarked, 3: DataTable View
  const [onlyCodePosts, setOnlyCodePosts] = useState<boolean>(false);
  const [minLikesFilter, setMinLikesFilter] = useState<number>(0);

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  // Compose Modal State
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSummary, setNewSummary] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('Alex Rivera');
  const [newRole, setNewRole] = useState<string>('Senior Frontend Architect');
  const [newCategory, setNewCategory] = useState<PostItem['category']>('Design Systems');
  const [newSeverity, setNewSeverity] = useState<PostItem['severity']>('featured');
  const [newCode, setNewCode] = useState<string>('');
  const [newPinned, setNewPinned] = useState<boolean>(true);

  // Live Feedback Notifications State
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Sync manual CSS overrides class on <body>
  useEffect(() => {
    if (overridesEnabled) {
      document.body.classList.add('cpds-overrides-enabled');
    } else {
      document.body.classList.remove('cpds-overrides-enabled');
    }
  }, [overridesEnabled]);

  // Filtered Posts Calculation
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All Categories' || post.category === selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((sel) => post.tags.includes(sel.id));

      const matchesViewTab =
        viewModeIndex === 0 ||
        viewModeIndex === 3 ||
        (viewModeIndex === 1 && (post.pinned || post.severity === 'announcement')) ||
        (viewModeIndex === 2 && post.bookmarked);

      const matchesCodeFilter = !onlyCodePosts || Boolean(post.codeSnippet);
      const matchesLikes = post.likes >= minLikesFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTags &&
        matchesViewTab &&
        matchesCodeFilter &&
        matchesLikes
      );
    });
  }, [
    posts,
    searchQuery,
    selectedCategory,
    selectedTags,
    viewModeIndex,
    onlyCodePosts,
    minLikesFilter,
  ]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, page, pageSize]);

  // Interactive Post Actions
  const handleToggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const liked = !p.likedByMe;
        return {
          ...p,
          likedByMe: liked,
          likes: liked ? p.likes + 1 : p.likes - 1,
        };
      })
    );
  };

  const handleToggleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  const handleDeletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setToastMessage({
      title: 'Post Removed',
      subtitle: `Post ${id} was removed from the active feed.`,
    });
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newSummary.trim()) return;
    const initials = newAuthor
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const created: PostItem = {
      id: `POST-${1043 + posts.length}`,
      title: newTitle.trim(),
      summary: newSummary.trim(),
      author: newAuthor.trim() || 'Anonymous Engineer',
      authorRole: newRole.trim() || 'Contributor',
      avatarInitials: initials || 'CP',
      category: newCategory,
      severity: newSeverity,
      timestamp: 'Just now',
      readTimeMin: Math.max(2, Math.ceil(newSummary.length / 180)),
      likes: 1,
      comments: 0,
      views: 1,
      tags: [newCategory, 'Carbon v11', 'Community Update'],
      codeSnippet: newCode.trim() ? newCode.trim() : undefined,
      pinned: newPinned,
      bookmarked: false,
      likedByMe: true,
      status: 'Published',
    };

    setPosts((prev) => [created, ...prev]);
    setNewTitle('');
    setNewSummary('');
    setNewCode('');
    setIsComposeOpen(false);
    setToastMessage({
      title: 'Broadcast Published to Feed',
      subtitle: `"${created.title.slice(0, 48)}..." is now live on CarbonPulse.`,
    });
  };

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setToastMessage({
        title: 'Telemetry & Feed Synchronized',
        subtitle: 'All nodes reporting 99.99% uptime across CarbonPulse mesh.',
      });
    }, 900);
  };

  // Carbon DataTable Headers & Rows
  const tableHeaders = [
    { key: 'id', header: 'Post ID' },
    { key: 'title', header: 'Headline' },
    { key: 'author', header: 'Author' },
    { key: 'category', header: 'Channel' },
    { key: 'status', header: 'Status' },
    { key: 'likes', header: 'Reactions' },
    { key: 'views', header: 'Views' },
    { key: 'timestamp', header: 'Published' },
  ];

  const tableRows = filteredPosts.map((p) => ({
    id: p.id,
    title: p.title,
    author: p.author,
    category: p.category,
    status: p.status,
    likes: p.likes,
    views: p.views.toLocaleString(),
    timestamp: p.timestamp,
  }));

  return (
    <Theme theme={carbonTheme}>
      <div className="cpds-app-wrapper">
        {/* 1. CARBON UI SHELL HEADER */}
        <Header aria-label="CarbonPulse Engineering Feed & Design System">
          <HeaderName
            href="#feed"
            prefix="IBM Carbon ×"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('feed');
            }}
          >
            CarbonPulse Hub
          </HeaderName>

          <HeaderNavigation aria-label="Primary Navigation">
            <HeaderMenuItem
              isCurrentPage={activeNav === 'feed'}
              onClick={() => setActiveNav('feed')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={16} /> Live Posts & News Feed
              </span>
            </HeaderMenuItem>
            <HeaderMenuItem
              isCurrentPage={activeNav === 'guidelines'}
              onClick={() => setActiveNav('guidelines')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Catalog size={16} /> Design System Guidelines & Skill
              </span>
            </HeaderMenuItem>
          </HeaderNavigation>

          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Toggle Custom CSS Overrides (Step 6)"
              isActive={overridesEnabled}
              onClick={() => setOverridesEnabled((prev) => !prev)}
              tooltipAlignment="end"
            >
              <ColorPalette size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Cycle Carbon Theme (g100 / g90 / g10 / white)"
              onClick={() => {
                const order: Array<'g100' | 'g90' | 'g10' | 'white'> = ['g100', 'g90', 'g10', 'white'];
                const next = order[(order.indexOf(carbonTheme) + 1) % order.length];
                setCarbonTheme(next);
              }}
              tooltipAlignment="end"
            >
              <ColorSwitch size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="System Notifications & Design Controls"
              isActive={rightPanelOpen}
              onClick={() => setRightPanelOpen((prev) => !prev)}
              tooltipAlignment="end"
            >
              <Notification size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>

          {/* Expandable Carbon Right HeaderPanel */}
          <HeaderPanel
            aria-label="Design System & Telemetry Drawer"
            expanded={rightPanelOpen}
          >
            <div style={{ padding: '1.25rem' }}>
              <h4 style={{ fontFamily: 'var(--cpds-font-display)', marginTop: 0, marginBottom: '0.5rem' }}>
                Design System Control Center
              </h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.78, marginBottom: '1rem' }}>
                Toggle our manual CSS overrides (Step 6) or switch Carbon themes live:
              </p>
              <Toggle
                id="header-panel-css-toggle"
                labelText="CarbonPulse CSS Overrides"
                labelA="Stock Carbon"
                labelB="CPDS Active"
                toggled={overridesEnabled}
                onToggle={() => setOverridesEnabled((prev) => !prev)}
              />
            </div>
            <SwitcherDivider />
            <Switcher aria-label="Quick Theme Switcher">
              <SwitcherItem
                aria-label="Dark g100 Theme"
                isSelected={carbonTheme === 'g100'}
                onClick={() => setCarbonTheme('g100')}
              >
                Theme: Carbon g100 (Deep Obsidian)
              </SwitcherItem>
              <SwitcherItem
                aria-label="Dark g90 Theme"
                isSelected={carbonTheme === 'g90'}
                onClick={() => setCarbonTheme('g90')}
              >
                Theme: Carbon g90 (Slate Dark)
              </SwitcherItem>
              <SwitcherItem
                aria-label="Light g10 Theme"
                isSelected={carbonTheme === 'g10'}
                onClick={() => setCarbonTheme('g10')}
              >
                Theme: Carbon g10 (Soft Light)
              </SwitcherItem>
              <SwitcherItem
                aria-label="White Theme"
                isSelected={carbonTheme === 'white'}
                onClick={() => setCarbonTheme('white')}
              >
                Theme: Carbon White (Pure Light)
              </SwitcherItem>
            </Switcher>
          </HeaderPanel>
        </Header>

        {/* MAIN PAGE CONTAINER */}
        <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.75rem 1.5rem 4rem' }}>
          {/* Optional Toast Notification when user creates/deletes a post */}
          {toastMessage && (
            <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9000 }}>
              <ToastNotification
                kind="success"
                title={toastMessage.title}
                subtitle={toastMessage.subtitle}
                caption={new Date().toLocaleTimeString()}
                onCloseButtonClick={() => setToastMessage(null)}
                timeout={5000}
              />
            </div>
          )}

          {activeNav === 'guidelines' ? (
            <GuidelinesPage
              overridesEnabled={overridesEnabled}
              onToggleOverrides={() => setOverridesEnabled((prev) => !prev)}
              currentTheme={carbonTheme}
              onChangeTheme={setCarbonTheme}
            />
          ) : (
            <>
              {/* HERO BANNER */}
              <div className="cpds-hero-banner">
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem',
                  }}
                >
                  <div style={{ maxWidth: '760px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      <Tag type="cyan" size="md">
                        IBM Carbon Design System v11
                      </Tag>
                      <Tag type="purple" size="md">
                        {overridesEnabled ? 'Custom CSS Overrides Active' : 'Stock Carbon Mode'}
                      </Tag>
                      <Tag type="green" size="md">
                        28+ Carbon Components Integrated
                      </Tag>
                    </div>
                    <h1 className="cpds-hero-title">
                      CarbonPulse <span className="cpds-gradient-text">Engineering & AI News Feed</span>
                    </h1>
                    <p style={{ fontSize: '1.02rem', opacity: 0.86, margin: 0, lineHeight: 1.55 }}>
                      Real-time technical dispatches, architecture RFCs, release notes, and security advisories—powered by IBM Carbon Design System and customized with manual CSS tokens.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button
                      kind="primary"
                      renderIcon={Add}
                      onClick={() => setIsComposeOpen(true)}
                    >
                      Publish New Post
                    </Button>
                    <Button
                      kind="secondary"
                      renderIcon={Catalog}
                      onClick={() => setActiveNav('guidelines')}
                    >
                      Design Guidelines & Skill
                    </Button>
                  </div>
                </div>
              </div>

              {/* ACTIONABLE NOTIFICATION BANNER */}
              <ActionableNotification
                kind="info"
                lowContrast
                inline
                title="CarbonPulse Design System v1.0:"
                subtitle="You can toggle between Stock IBM Carbon and our manual CSS overrides anytime, or inspect the Agent Skill in the Guidelines tab."
                actionButtonLabel={overridesEnabled ? 'Switch to Stock Carbon' : 'Enable Custom CSS'}
                onActionButtonClick={() => setOverridesEnabled((prev) => !prev)}
                hideCloseButton
                style={{ marginBottom: '1.5rem', maxWidth: '100%' }}
              />

              {/* KPI METRICS ROW (Carbon ClickableTiles + ProgressBar) */}
              <div className="cpds-kpi-grid">
                <ClickableTile onClick={() => setViewModeIndex(0)}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Active Engineering Posts
                  </div>
                  <div className="cpds-kpi-value" style={{ color: 'var(--cpds-brand-primary)' }}>
                    {posts.length}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {filteredPosts.length} matching current filters
                  </div>
                </ClickableTile>

                <ClickableTile onClick={() => setViewModeIndex(1)}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Community Reactions
                  </div>
                  <div className="cpds-kpi-value">
                    {posts.reduce((acc, p) => acc + p.likes, 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981' }}>
                    +18.4% engagement this week
                  </div>
                </ClickableTile>

                <ClickableTile onClick={() => setViewModeIndex(3)}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Total Feed Impressions
                  </div>
                  <div className="cpds-kpi-value">
                    {posts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    Click to open Carbon DataTable view
                  </div>
                </ClickableTile>

                <Tile>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.75, textTransform: 'uppercase' }}>
                      Global Mesh Health
                    </span>
                    <Tag type="green" size="sm">
                      99.98% SLA
                    </Tag>
                  </div>
                  <ProgressBar
                    label="Edge Ingestion Pipeline"
                    helperText="All 42 clusters healthy"
                    value={96}
                    max={100}
                  />
                </Tile>
              </div>

              {/* RICH FILTER & SEARCH TOOLBAR (Step 4: Search, Dropdown, MultiSelect, ContentSwitcher) */}
              <div className="cpds-filter-bar">
                <div>
                  <label
                    htmlFor="feed-search"
                    style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.35rem', opacity: 0.8 }}
                  >
                    Search Posts, Authors, or Tags
                  </label>
                  <Search
                    id="feed-search"
                    size="md"
                    labelText="Search engineering posts"
                    placeholder="Search e.g. 'Carbon', 'Kubernetes', 'LLM', 'Maya'..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    onClear={() => setSearchQuery('')}
                  />
                </div>

                <Dropdown
                  id="category-dropdown"
                  titleText="Channel Category"
                  label="Select category"
                  items={[...CATEGORIES]}
                  selectedItem={selectedCategory}
                  onChange={({ selectedItem }) => {
                    if (selectedItem) {
                      setSelectedCategory(selectedItem);
                      setPage(1);
                    }
                  }}
                />

                <MultiSelect
                  id="tag-multiselect"
                  titleText="Filter by Tech Tags"
                  label="All tags"
                  items={AVAILABLE_TAGS}
                  itemToString={(item) => (item ? item.label : '')}
                  onChange={({ selectedItems }) => {
                    setSelectedTags(selectedItems || []);
                    setPage(1);
                  }}
                />

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Button
                    kind="ghost"
                    size="md"
                    renderIcon={Renew}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Categories');
                      setSelectedTags([]);
                      setOnlyCodePosts(false);
                      setMinLikesFilter(0);
                      setViewModeIndex(0);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* VIEW MODE CONTENT SWITCHER + ADVANCED FILTERS */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ minWidth: '340px', flex: '1 1 420px', maxWidth: '640px' }}>
                  <ContentSwitcher
                    selectedIndex={viewModeIndex}
                    onChange={(data) => {
                      if (typeof data.index === 'number') {
                        setViewModeIndex(data.index);
                        setPage(1);
                      }
                    }}
                    size="md"
                  >
                    <Switch name="all" text={`All Posts (${posts.length})`} />
                    <Switch name="featured" text="Pinned & Announcements" />
                    <Switch name="bookmarked" text={`Saved (${posts.filter((p) => p.bookmarked).length})`} />
                    <Switch name="table" text="Carbon DataTable View" />
                  </ContentSwitcher>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <Checkbox
                    id="only-code-checkbox"
                    labelText="Has Code Snippet"
                    checked={onlyCodePosts}
                    onChange={(_, { checked }) => {
                      setOnlyCodePosts(checked);
                      setPage(1);
                    }}
                  />
                  <Toggle
                    id="quick-override-bar-toggle"
                    size="sm"
                    labelText=""
                    labelA="Stock CSS"
                    labelB="Custom CSS (Step 6)"
                    toggled={overridesEnabled}
                    onToggle={() => setOverridesEnabled((prev) => !prev)}
                  />
                </div>
              </div>

              {/* MAIN CONTENT AREA: EITHER DATATABLE VIEW OR FEED + SIDEBAR */}
              {viewModeIndex === 3 ? (
                <div style={{ marginBottom: '2rem' }}>
                  <DataTable rows={tableRows} headers={tableHeaders} isSortable>
                    {({
                      rows,
                      headers,
                      getHeaderProps,
                      getRowProps,
                      getSelectionProps,
                      getToolbarProps,
                      getBatchActionProps,
                      onInputChange,
                      selectedRows,
                    }) => {
                      const batchActionProps = getBatchActionProps();
                      return (
                        <TableContainer
                          title="Engineering Posts & Announcements Directory"
                          description="Interactive Carbon DataTable with live sorting, row selection, batch actions, and instant filtering."
                        >
                          <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...batchActionProps}>
                              <TableBatchAction
                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                renderIcon={Download}
                                onClick={() => {
                                  setToastMessage({
                                    title: 'Exported Selected Posts',
                                    subtitle: `Exported ${selectedRows.length} rows as JSON payload.`,
                                  });
                                }}
                              >
                                Export JSON
                              </TableBatchAction>
                              <TableBatchAction
                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                renderIcon={TrashCan}
                                onClick={() => {
                                  const ids = selectedRows.map((r) => r.id);
                                  setPosts((prev) => prev.filter((p) => !ids.includes(p.id)));
                                  setToastMessage({
                                    title: 'Batch Deleted Posts',
                                    subtitle: `Removed ${ids.length} selected posts from the feed.`,
                                  });
                                }}
                              >
                                Delete Selected
                              </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                              <TableToolbarSearch
                                persistent
                                placeholder="Filter table rows..."
                                onChange={onInputChange}
                              />
                              <Button
                                kind="primary"
                                size="sm"
                                renderIcon={Add}
                                onClick={() => setIsComposeOpen(true)}
                              >
                                New Post
                              </Button>
                            </TableToolbarContent>
                          </TableToolbar>
                          <Table size="lg" useZebraStyles={false}>
                            <TableHead>
                              <TableRow>
                                <TableSelectAll {...getSelectionProps()} />
                                {headers.map((header) => (
                                  <TableHeader {...getHeaderProps({ header })} key={header.key}>
                                    {header.header}
                                  </TableHeader>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow {...getRowProps({ row })} key={row.id}>
                                  <TableSelectRow {...getSelectionProps({ row })} />
                                  {row.cells.map((cell) => (
                                    <TableCell key={cell.id}>
                                      {cell.info.header === 'status' ? (
                                        <Tag
                                          type={
                                            cell.value === 'Trending'
                                              ? 'cyan'
                                              : cell.value === 'Verified'
                                              ? 'green'
                                              : 'purple'
                                          }
                                          size="sm"
                                        >
                                          {cell.value}
                                        </Tag>
                                      ) : cell.info.header === 'category' ? (
                                        <Tag type="teal" size="sm">
                                          {cell.value}
                                        </Tag>
                                      ) : (
                                        cell.value
                                      )}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      );
                    }}
                  </DataTable>
                </div>
              ) : (
                <div className="cpds-feed-layout">
                  {/* LEFT COLUMN: POST CARDS FEED */}
                  <div>
                    {paginatedPosts.length === 0 ? (
                      <Tile style={{ padding: '2.5rem', textAlign: 'center' }}>
                        <h3 style={{ fontFamily: 'var(--cpds-font-display)', marginTop: 0 }}>
                          No Posts Match Your Active Filters
                        </h3>
                        <p style={{ opacity: 0.8, marginBottom: '1.25rem' }}>
                          Try clearing your search query or resetting the tag filters.
                        </p>
                        <Button
                          kind="primary"
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('All Categories');
                            setSelectedTags([]);
                            setOnlyCodePosts(false);
                            setMinLikesFilter(0);
                            setViewModeIndex(0);
                          }}
                        >
                          Reset All Filters
                        </Button>
                      </Tile>
                    ) : (
                      paginatedPosts.map((post) => (
                        <Tile
                          key={post.id}
                          className={`cpds-post-card ${post.pinned ? 'cpds-post-card--pinned' : ''}`}
                        >
                          <div className="cpds-post-header">
                            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                              <div className="cpds-avatar">{post.avatarInitials}</div>
                              <div>
                                <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  {post.author}
                                  <CheckmarkFilled size={14} style={{ color: 'var(--cpds-brand-primary)' }} />
                                  <span style={{ fontSize: '0.78rem', opacity: 0.7, fontWeight: 400 }}>
                                    • {post.timestamp}
                                  </span>
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>
                                  {post.authorRole} • {post.readTimeMin} min read
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {post.pinned && (
                                <Tag type="cyan" size="sm">
                                  Pinned
                                </Tag>
                              )}
                              <Tag
                                type={
                                  post.category === 'AI & LLM'
                                    ? 'purple'
                                    : post.category === 'Security'
                                    ? 'red'
                                    : post.category === 'Design Systems'
                                    ? 'cyan'
                                    : 'teal'
                                }
                                size="sm"
                              >
                                {post.category}
                              </Tag>
                              <OverflowMenu aria-label="Post options" size="sm" flipped>
                                <OverflowMenuItem
                                  itemText={post.bookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                                  onClick={() => handleToggleBookmark(post.id)}
                                />
                                <OverflowMenuItem
                                  itemText="Copy Post ID"
                                  onClick={() => {
                                    navigator.clipboard?.writeText(post.id);
                                    setToastMessage({
                                      title: 'Copied Post ID',
                                      subtitle: `${post.id} copied to clipboard.`,
                                    });
                                  }}
                                />
                                <OverflowMenuItem
                                  hasDivider
                                  isDelete
                                  itemText="Delete Post"
                                  onClick={() => handleDeletePost(post.id)}
                                />
                              </OverflowMenu>
                            </div>
                          </div>

                          <h2 className="cpds-post-title">{post.title}</h2>
                          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.88, margin: '0 0 0.85rem 0' }}>
                            {post.summary}
                          </p>

                          {post.codeSnippet && (
                            <div style={{ marginBottom: '1rem' }}>
                              <CodeSnippet type="multi" feedback="Copied to clipboard">
                                {post.codeSnippet}
                              </CodeSnippet>
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {post.tags.map((tag) => (
                              <Tag key={tag} type="cool-gray" size="sm">
                                #{tag}
                              </Tag>
                            ))}
                          </div>

                          <div className="cpds-post-footer">
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              <Button
                                kind={post.likedByMe ? 'primary' : 'ghost'}
                                size="sm"
                                renderIcon={ThumbsUp}
                                onClick={() => handleToggleLike(post.id)}
                              >
                                {post.likes} Likes
                              </Button>
                              <Button kind="ghost" size="sm" renderIcon={Chat}>
                                {post.comments} Comments
                              </Button>
                              <Button
                                kind="ghost"
                                size="sm"
                                renderIcon={post.bookmarked ? BookmarkFilled : Bookmark}
                                onClick={() => handleToggleBookmark(post.id)}
                              >
                                {post.bookmarked ? 'Saved' : 'Save'}
                              </Button>
                            </div>

                            <span style={{ fontFamily: 'var(--cpds-font-mono)', fontSize: '0.76rem', opacity: 0.7 }}>
                              {post.id} • {post.views.toLocaleString()} views
                            </span>
                          </div>
                        </Tile>
                      ))
                    )}

                    {/* CARBON PAGINATION */}
                    <Pagination
                      backwardText="Previous page"
                      forwardText="Next page"
                      itemsPerPageText="Posts per page:"
                      page={page}
                      pageNumberText="Page Number"
                      pageSize={pageSize}
                      pageSizes={[4, 6, 10]}
                      totalItems={filteredPosts.length}
                      onChange={({ page: newPage, pageSize: newSize }) => {
                        setPage(newPage);
                        setPageSize(newSize);
                      }}
                    />
                  </div>

                  {/* RIGHT COLUMN: INTERACTIVE CARBON WIDGETS SIDEBAR */}
                  <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Widget 1: Release Pipeline ProgressIndicator */}
                    <Tile>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h4 style={{ fontFamily: 'var(--cpds-font-display)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Rocket size={18} /> Release v4.19 Rollout
                        </h4>
                        <Tag type="cyan" size="sm">Stage 3/4</Tag>
                      </div>
                      <ProgressIndicator vertical currentIndex={2}>
                        <ProgressStep
                          complete
                          label="Design Token Audit"
                          secondaryLabel="Passed 100% WCAG contrast"
                        />
                        <ProgressStep
                          complete
                          label="Canary Mesh Rollout"
                          secondaryLabel="us-east & eu-central healthy"
                        />
                        <ProgressStep
                          current
                          label="Global Edge Propagation"
                          secondaryLabel="In progress (84% nodes)"
                        />
                        <ProgressStep
                          label="Post-Release Verification"
                          secondaryLabel="Scheduled"
                        />
                      </ProgressIndicator>

                      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(148,163,184,0.15)' }}>
                        {isSyncing ? (
                          <InlineLoading description="Syncing cluster telemetry..." status="active" />
                        ) : (
                          <Button
                            kind="secondary"
                            size="sm"
                            renderIcon={Terminal}
                            onClick={handleSimulateSync}
                          >
                            Sync Live Telemetry
                          </Button>
                        )}
                      </div>
                    </Tile>

                    {/* Widget 2: Engagement Threshold Slider */}
                    <Tile>
                      <h4 style={{ fontFamily: 'var(--cpds-font-display)', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Filter size={16} /> Reaction Threshold Filter
                      </h4>
                      <Slider
                        id="likes-threshold-slider"
                        labelText="Minimum Likes Required"
                        min={0}
                        max={200}
                        step={10}
                        value={minLikesFilter}
                        onChange={({ value }) => {
                          setMinLikesFilter(value);
                          setPage(1);
                        }}
                      />
                    </Tile>

                    {/* Widget 3: Trending FAQ Accordion */}
                    <Tile>
                      <h4 style={{ fontFamily: 'var(--cpds-font-display)', marginTop: 0, marginBottom: '0.75rem' }}>
                        Architecture & Design System FAQ
                      </h4>
                      <Accordion align="start" size="sm">
                        <AccordionItem title="What is CarbonPulse Design System?">
                          <p style={{ fontSize: '0.85rem', margin: 0 }}>
                            CarbonPulse builds on IBM Carbon v11 components with custom CSS variables (<code>--cpds-brand-primary</code>, <code>--cpds-radius-lg</code>) and an automated AI Agent Skill.
                          </p>
                        </AccordionItem>
                        <AccordionItem title="How many Carbon components are used here?">
                          <p style={{ fontSize: '0.85rem', margin: 0 }}>
                            Over 28 Carbon components: UI Shell Header, HeaderPanel, Search, Dropdown, MultiSelect, ContentSwitcher, DataTable, Pagination, Modal, Tabs, Accordion, ProgressIndicator, Slider, Toggle, Tag, CodeSnippet, and more.
                          </p>
                        </AccordionItem>
                        <AccordionItem title="Where is the Agent Skill located?">
                          <p style={{ fontSize: '0.85rem', margin: 0 }}>
                            Check <code>.agents/skills/carbon-pulse-design-system/SKILL.md</code> or open the Design Guidelines tab in the top navigation bar.
                          </p>
                        </AccordionItem>
                      </Accordion>
                    </Tile>
                  </aside>
                </div>
              )}
            </>
          )}
        </main>

        {/* COMPOSE NEW POST MODAL */}
        <Modal
          open={isComposeOpen}
          modalHeading="Publish Engineering Update or Post"
          modalLabel="CarbonPulse Broadcast Studio"
          primaryButtonText="Publish Post"
          secondaryButtonText="Cancel"
          onRequestClose={() => setIsComposeOpen(false)}
          onRequestSubmit={handleCreatePost}
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <InlineNotification
              kind="info"
              lowContrast
              hideCloseButton
              title="Markdown & Code Snippets Supported:"
              subtitle="Your post will immediately appear at the top of the live feed and inside the Carbon DataTable."
            />

            <TextInput
              id="compose-title"
              labelText="Post Headline *"
              placeholder="e.g., Migrating 200+ Microfrontends to CarbonPulse Design System v1.0"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <TextInput
                id="compose-author"
                labelText="Author Name"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <TextInput
                id="compose-role"
                labelText="Author Role / Team"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
            </div>

            <Select
              id="compose-category"
              labelText="Channel Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as PostItem['category'])}
            >
              <SelectItem value="Design Systems" text="Design Systems" />
              <SelectItem value="AI & LLM" text="AI & LLM" />
              <SelectItem value="Cloud Native" text="Cloud Native" />
              <SelectItem value="Security" text="Security" />
              <SelectItem value="Release Notes" text="Release Notes" />
            </Select>

            <RadioButtonGroup
              legendText="Broadcast Priority Level"
              name="severity-radio-group"
              valueSelected={newSeverity}
              onChange={(val) => setNewSeverity(val as PostItem['severity'])}
            >
              <RadioButton labelText="Standard Post" value="normal" id="radio-normal" />
              <RadioButton labelText="Featured Dispatch" value="featured" id="radio-featured" />
              <RadioButton labelText="Major Announcement" value="announcement" id="radio-announcement" />
            </RadioButtonGroup>

            <TextArea
              id="compose-summary"
              labelText="Post Summary & Technical Details *"
              placeholder="Share key metrics, architectural tradeoffs, or release highlights..."
              rows={4}
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
            />

            <TextArea
              id="compose-code"
              labelText="Optional Code Snippet or Config Block"
              placeholder="Paste CLI command, CSS tokens, or TypeScript snippet..."
              rows={3}
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />

            <Checkbox
              id="compose-pin-checkbox"
              labelText="Pin this post to the top of the engineering feed"
              checked={newPinned}
              onChange={(_, { checked }) => setNewPinned(checked)}
            />
          </div>
        </Modal>
      </div>
    </Theme>
  );
}

export default App;
