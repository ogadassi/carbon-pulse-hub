export interface PostItem {
  id: string;
  title: string;
  summary: string;
  author: string;
  authorRole: string;
  avatarInitials: string;
  category: 'AI & LLM' | 'Cloud Native' | 'Design Systems' | 'Security' | 'Release Notes';
  severity: 'normal' | 'featured' | 'announcement';
  timestamp: string;
  readTimeMin: number;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  codeSnippet?: string;
  pinned?: boolean;
  bookmarked?: boolean;
  likedByMe?: boolean;
  status: 'Published' | 'Verified' | 'Trending' | 'Archived';
}

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'POST-1042',
    title: 'Introducing CarbonPulse Design System v1.0: Electric Cyan & Glassmorphic Layers on IBM Carbon v11',
    summary:
      'We forked IBM Carbon Design System tokens with manual CSS overrides to introduce rounded geometry (--cpds-radius-lg), Space Grotesk display typography, and high-contrast neon accents while preserving 100% WCAG AA accessibility and keyboard navigation.',
    author: 'Maya Lin',
    authorRole: 'Principal Design Technologist',
    avatarInitials: 'ML',
    category: 'Design Systems',
    severity: 'announcement',
    timestamp: '12 mins ago',
    readTimeMin: 5,
    likes: 148,
    comments: 34,
    views: 2840,
    tags: ['Carbon v11', 'CSS Tokens', 'Design System', 'Accessibility'],
    codeSnippet: `:root {\n  --cds-interactive: #00d4ff;\n  --cpds-radius-lg: 14px;\n  --cpds-brand-gradient: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);\n}`,
    pinned: true,
    bookmarked: true,
    likedByMe: true,
    status: 'Trending',
  },
  {
    id: 'POST-1041',
    title: 'Zero-Downtime Envoy Mesh Upgrade Across 42 Multi-Region Kubernetes Clusters',
    summary:
      'Post-deployment telemetry shows a 23% reduction in p99 tail latency after migrating our ingress gateway fleet to Envoy 1.32 with adaptive circuit breaking and HTTP/3 QUIC socket pooling.',
    author: 'Devon Brooks',
    authorRole: 'Staff Infrastructure Engineer',
    avatarInitials: 'DB',
    category: 'Cloud Native',
    severity: 'featured',
    timestamp: '47 mins ago',
    readTimeMin: 8,
    likes: 92,
    comments: 19,
    views: 1620,
    tags: ['Kubernetes', 'Envoy', 'Rust', 'Observability'],
    pinned: true,
    bookmarked: false,
    likedByMe: false,
    status: 'Verified',
  },
  {
    id: 'POST-1040',
    title: 'Speculative Decoding in Production: Serving 70B Parameter Models at 115 Tokens/Sec',
    summary:
      'By pairing a 1.5B draft model with quantized FP8 KV-cache paging, our inference cluster doubled throughput during peak developer copilot hours without degrading pass@1 code generation accuracy.',
    author: 'Dr. Aris Thorne',
    authorRole: 'AI Systems Lead',
    avatarInitials: 'AT',
    category: 'AI & LLM',
    severity: 'featured',
    timestamp: '2 hours ago',
    readTimeMin: 11,
    likes: 215,
    comments: 51,
    views: 4390,
    tags: ['LLM Inference', 'CUDA', 'Speculative Decoding', 'vLLM'],
    codeSnippet: `vllm serve meta-llama/Llama-3.3-70B \\\n  --speculative-model meta-llama/Llama-3.2-1B \\\n  --num-speculative-tokens 5 --kv-cache-dtype fp8`,
    pinned: false,
    bookmarked: true,
    likedByMe: true,
    status: 'Trending',
  },
  {
    id: 'POST-1039',
    title: 'Security Advisory CVE-2026-8841: Automated Patch Rollout for Container Runtime Sandbox',
    summary:
      'All managed worker nodes have been patched with seccomp-bpf profile v4.8. No customer workloads were impacted. Review the updated container baseline policy in the Security Guidelines tab.',
    author: 'Elena Rostova',
    authorRole: 'Offensive Security Architect',
    avatarInitials: 'ER',
    category: 'Security',
    severity: 'announcement',
    timestamp: '4 hours ago',
    readTimeMin: 4,
    likes: 64,
    comments: 12,
    views: 1190,
    tags: ['SecOps', 'eBPF', 'Zero Trust', 'CVE'],
    pinned: false,
    bookmarked: false,
    likedByMe: false,
    status: 'Verified',
  },
  {
    id: 'POST-1038',
    title: 'Release Notes v4.18.0: Real-Time GraphQL Subscriptions & Carbon DataTable Batch Exports',
    summary:
      'Version 4.18.0 introduces streaming cursor pagination, bulk CSV/JSON export directly from Carbon DataTable toolbars, and an interactive Agent Skill generator for design tokens.',
    author: 'Liam O’Connor',
    authorRole: 'Lead Product Engineer',
    avatarInitials: 'LO',
    category: 'Release Notes',
    severity: 'normal',
    timestamp: '6 hours ago',
    readTimeMin: 6,
    likes: 79,
    comments: 23,
    views: 1405,
    tags: ['Release v4.18', 'GraphQL', 'Carbon DataTable', 'TypeScript'],
    pinned: false,
    bookmarked: false,
    likedByMe: false,
    status: 'Published',
  },
  {
    id: 'POST-1037',
    title: 'Why We Standardized on Workspace Agent Skills (.agents/skills/SKILL.md) for UI Governance',
    summary:
      'Instead of static PDFs that go stale, packaging our customized Carbon Design System into an AI Agent Skill guarantees every new screen adheres to our custom CSS variables, component density, and dark-mode contrast rules.',
    author: 'Maya Lin',
    authorRole: 'Principal Design Technologist',
    avatarInitials: 'ML',
    category: 'Design Systems',
    severity: 'featured',
    timestamp: '1 day ago',
    readTimeMin: 7,
    likes: 183,
    comments: 42,
    views: 3110,
    tags: ['Agent Skills', 'Design Tokens', 'Automation', 'Carbon'],
    pinned: false,
    bookmarked: true,
    likedByMe: false,
    status: 'Trending',
  },
  {
    id: 'POST-1036',
    title: ' WebAssembly Component Model (WASI 0.2) Plugins Now Live in Edge Workers',
    summary:
      'Developers can now compile Rust, Go, and TypeScript edge middleware into portable WASI 0.2 components with sub-millisecond cold starts and deterministic memory sandboxing.',
    author: 'Kenji Sato',
    authorRole: 'Edge Runtime Maintainer',
    avatarInitials: 'KS',
    category: 'Cloud Native',
    severity: 'normal',
    timestamp: '1 day ago',
    readTimeMin: 9,
    likes: 112,
    comments: 27,
    views: 2050,
    tags: ['WebAssembly', 'WASI', 'Rust', 'Edge Computing'],
    pinned: false,
    bookmarked: false,
    likedByMe: false,
    status: 'Published',
  },
];

export const CATEGORIES = [
  'All Categories',
  'AI & LLM',
  'Cloud Native',
  'Design Systems',
  'Security',
  'Release Notes',
] as const;
