# MASTERPLAN: AI Mobile App Builder - Implementation Plan

## Executive Summary

Vi bygger en React Native + Expo app som lar brukere lage produksjonsklare mobilapper via chat med AI. Systemet skal ha live preview, autofix, og en komplett publishing pipeline.

**Se også:**
- `.internal/AGENT_ARCHITECTURE.md` - Detaljert spesifikasjon av AI agent, terminal/logg system, og context management

---

## Phase 1: Foundation & Core Infrastructure

### 1.1 Project Setup
- [ ] Initialize Expo project with TypeScript
- [ ] Configure EAS (Expo Application Services)
- [ ] Set up monorepo structure (builder app + agent orchestrator)
- [ ] Configure ESLint, Prettier, TypeScript strict mode
- [ ] Set up environment variable management
- [ ] Initialize Git repository structure

### 1.2 Design System
- [ ] Create design tokens (colors, spacing, typography, radius, elevation, blur)
- [ ] Implement glassmorphism components (GlassCard, GlassButton, GlassHeader)
- [ ] Light/Dark theme system with system preference detection
- [ ] Color palette: Very dark black + bright cyan/blue (livekit.io inspired)
- [ ] Typography scale and font loading
- [ ] Animation utilities (fade, slide, scale)

### 1.3 Core UI Components
- [ ] Chat interface (message bubbles, input, typing indicators)
- [ ] Live preview container (iframe/webview for web preview)
- [ ] Tab navigation (Chat, Preview, Features, Issues, Publish, Projects)
- [ ] Terminal/Log viewer (hidden by default, accessible via settings)
  - Real-time log streaming
  - Color coding (errors, success, info)
  - Filtering and search
  - Export functionality
- [ ] Loading states and skeletons
- [ ] Error boundaries and error displays
- [ ] Toast/notification system

### 1.4 State Management
- [ ] Choose state management solution (Zustand/Redux Toolkit)
- [ ] Project state (current project, projects list)
- [ ] Chat state (messages, AI responses, streaming)
- [ ] Preview state (build status, preview URL)
- [ ] Issues state (errors, warnings, fixes in progress)

---

## Phase 2: Backend & Infrastructure

### 2.1 Supabase Setup
- [ ] Supabase Management API integration (for automated project creation)
- [ ] Supabase CLI integration (for migrations, storage, etc.)
- [ ] Automated project initialization (create project, get API keys)
- [ ] Database schema for:
  - Users (auth handled by Supabase Auth)
  - Projects (metadata, config, status, context summaries)
  - Builds (history, logs, artifacts)
  - Agent actions (audit log)
  - Terminal logs (for user projects)
- [ ] Storage buckets setup (project assets, builds)
- [ ] RLS policies templates
- [ ] Edge functions structure
- [ ] Automated migration system (create tables, alter schema via AI)

### 2.2 Authentication
- [ ] Supabase Auth integration
- [ ] OAuth providers (Google, GitHub for Mode 2)
- [ ] Session management
- [ ] User profile management

### 2.3 Project Management
- [ ] Create project (with sandbox isolation)
- [ ] List user projects
- [ ] Project settings/config
- [ ] Project deletion (with confirmation)

### 2.4 Sandbox System
- [ ] Container/VM per project concept
- [ ] Workspace isolation
- [ ] Environment variables per project
- [ ] Build isolation
- [ ] Resource limits

---

## Phase 3: AI Agent & Orchestration

### 3.1 Agent Orchestrator (Backend Service)
- [ ] Set up Node.js backend service (apps/orchestrator)
- [ ] WebSocket server for real-time communication
- [ ] HTTP API fallback
- [ ] Project isolation and sandboxing
- [ ] Command execution system with allowlist
- [ ] Resource limits and timeout handling

### 3.2 Terminal/Logg System
- [ ] Backend logger (logs all commands, output, file changes)
- [ ] Real-time log streaming to frontend
- [ ] Frontend terminal/log viewer (hidden by default, accessible via settings)
- [ ] Log filtering (errors, commands, info)
- [ ] Log export functionality
- [ ] Search in logs
- [ ] Color coding (error=red, success=green, etc.)

### 3.3 Context Management
- [ ] Session context (recent messages, recent changes)
- [ ] Project context (structure, modules, config) - stored in DB
- [ ] Summary context (compressed project summary)
- [ ] Context window management (token limits, prioritization)
- [ ] Context summarization (compress old data)
- [ ] Smart context building for AI requests

### 3.4 Agent Core
- [ ] AI client integration (OpenAI/Anthropic)
- [ ] Prompt engineering system
- [ ] Task planning (break down user requests into steps)
- [ ] Code generation with templates/modules
- [ ] Step-by-step execution with progress updates

### 3.5 Code Modification System
- [ ] AST parsing and manipulation
- [ ] Diff-based patching system
- [ ] File system operations (create, update, delete)
- [ ] Template system for modules/capabilities
- [ ] Code validation before applying changes
- [ ] Log all file changes to terminal

### 3.6 Autofix Loop
- [ ] Error detection (lint, tests, build, runtime)
- [ ] Error categorization and signature matching
- [ ] Fix playbooks (strategies for common errors)
- [ ] Retry logic with max iterations
- [ ] Strategy switching (alternative approaches)
- [ ] Rollback mechanism
- [ ] User choice prompts (A/B/C options when stuck)

### 3.7 Module System
- [ ] Module registry (Auth, Chat, CRUD, Feed, Booking, Marketplace, etc.)
- [ ] Module templates with customization points
- [ ] Module dependencies and conflicts
- [ ] Module installation/removal
- [ ] Module configuration UI

---

## Phase 4: Build & Preview System

### 4.1 Build Pipeline
- [ ] EAS Build integration
- [ ] Build queue management
- [ ] Build status tracking
- [ ] Build artifacts storage
- [ ] Incremental builds (when possible)

### 4.2 Preview System
- [ ] In-app instant preview (webview/iframe)
- [ ] Expo Go preview (QR code generation)
- [ ] Dev build preview (deep links)
- [ ] Preview auto-refresh on changes
- [ ] Preview error display

### 4.3 Testing Integration
- [ ] Test runner integration (Jest)
- [ ] Test generation for modules
- [ ] Test execution in CI
- [ ] Test results display

---

## Phase 5: Internationalization (i18n)

### 5.1 i18n Infrastructure
- [ ] i18n library setup (react-i18next)
- [ ] Translation key structure (feature.key.subkey)
- [ ] Language detection (device + manual)
- [ ] Fallback chain (nb → en → key)
- [ ] Translation file structure

### 5.2 AI Integration with i18n
- [ ] Agent rule: never hardcode text
- [ ] Auto-generate translation keys
- [ ] Translation key validation in code gen
- [ ] Language picker component

---

## Phase 6: Date/Time System

### 6.1 Date Utilities
- [ ] Central Date/Time utility module
- [ ] UTC storage (ISO-8601)
- [ ] Locale-aware formatting
- [ ] Timezone handling
- [ ] Relative time formatting

### 6.2 AI Integration
- [ ] Agent rule: always use Date util
- [ ] Validation: no inline date formatting
- [ ] Template integration

---

## Phase 7: GitHub Integration

### 7.1 Mode 1: Managed Repo (Default)
- [ ] GitHub org setup
- [ ] Automated repo creation
- [ ] Private repo per project
- [ ] Automated commits (version control)
- [ ] "Export to GitHub" feature

### 7.2 Mode 2: User-owned GitHub
- [ ] GitHub OAuth integration
- [ ] Repo creation on user account
- [ ] Branch management (main + feature/*)
- [ ] CI/CD setup (lint, tests, build)
- [ ] Commit author configuration

### 7.3 Mode 3: No-GitHub
- [ ] Internal storage system
- [ ] Snapshot/versioning system
- [ ] Export functionality (zip/repo)

### 7.4 Common Rules
- [ ] Filter: only production code/config
- [ ] No AI logs/debug data in repo
- [ ] Secrets in vault, never in repo
- [ ] Professional code standards

---

## Phase 8: Publishing Wizard

### 8.1 iOS Publishing
- [ ] Apple Developer account check
- [ ] App Store Connect integration
- [ ] Icon generation
- [ ] Splash screen generation
- [ ] Screenshot generation (from emulator)
- [ ] Store listing template
- [ ] Privacy policy template
- [ ] TestFlight distribution
- [ ] Step-by-step wizard UI

### 8.2 Android Publishing
- [ ] Google Play Console integration
- [ ] APK/AAB generation
- [ ] Icon/splash generation
- [ ] Screenshot generation
- [ ] Store listing template
- [ ] Internal testing distribution
- [ ] Step-by-step wizard UI

### 8.3 Common Publishing Features
- [ ] Build configuration
- [ ] Version management
- [ ] Release notes
- [ ] Support URL setup

---

## Phase 9: Features Tab & Capabilities

### 9.1 Features UI
- [ ] Module toggle interface
- [ ] Feature configuration panels
- [ ] Dependency visualization
- [ ] Feature status indicators

### 9.2 Core Capabilities Implementation
- [ ] Auth + Onboarding (Supabase)
- [ ] Profiles + Settings
- [ ] CRUD (list/detail + forms)
- [ ] Uploads (Supabase Storage)
- [ ] Feed (likes/comments)
- [ ] Chat (realtime)
- [ ] Booking + Calendar
- [ ] Marketplace (listings)
- [ ] Payments/Subscriptions (Phase 2)
- [ ] Push Notifications (Phase 2)
- [ ] Admin View

---

## Phase 10: Issues Tab & Monitoring

### 10.1 Issues Detection
- [ ] Build errors
- [ ] Runtime errors
- [ ] Lint warnings
- [ ] Test failures
- [ ] Policy violations (App Store/Play)

### 10.2 Issues UI
- [ ] Issues list with severity
- [ ] Issue details
- [ ] "Fix automatically" button
- [ ] Manual fix suggestions
- [ ] Issue history

### 10.3 Observability
- [ ] Sentry integration
- [ ] Build logs
- [ ] Runtime error tracking
- [ ] Performance monitoring
- [ ] Audit log (agent actions)

---

## Phase 11: Security & Safety

### 11.1 Security Measures
- [ ] Sandbox isolation enforcement
- [ ] Command allowlist
- [ ] Secrets vault (never in logs/repo)
- [ ] Input validation
- [ ] Rate limiting

### 11.2 Destructive Actions
- [ ] Confirmation dialogs for:
  - Drop table
  - Change critical auth/policies
  - Delete storage bucket
  - Delete project
- [ ] Rollback capability

### 11.3 Code Quality Gates
- [ ] Strict TypeScript
- [ ] Lint gates
- [ ] Format checks
- [ ] Test coverage requirements
- [ ] Architecture consistency checks

---

## Phase 12: Polish & Optimization

### 12.1 Performance
- [ ] Code splitting
- [ ] Image optimization
- [ ] Bundle size optimization
- [ ] Preview loading optimization
- [ ] Agent response caching

### 12.2 UX Improvements
- [ ] Loading states everywhere
- [ ] Skeleton screens
- [ ] Error recovery flows
- [ ] Onboarding tutorial
- [ ] Keyboard shortcuts
- [ ] Accessibility (a11y)

### 12.3 Documentation
- [ ] User documentation
- [ ] Developer documentation (internal)
- [ ] API documentation
- [ ] Module documentation

---

## Implementation Strategy: Mini-Steps Approach

### Core Principle
**Every change must be atomic and testable. Never do multiple unrelated things in one commit.**

### Step Size Guidelines
1. **One file at a time** when possible
2. **One feature/component** per PR
3. **One module** per implementation cycle
4. **Test after each step** before proceeding
5. **Commit frequently** with clear messages

### Example: Adding Auth Module
- Step 1: Create Auth module template structure
- Step 2: Add Supabase Auth client setup
- Step 3: Add login screen component
- Step 4: Add signup screen component
- Step 5: Add auth state management
- Step 6: Add protected route wrapper
- Step 7: Add logout functionality
- Step 8: Add i18n keys for auth
- Step 9: Add tests
- Step 10: Integrate into main app

---

## Technology Stack Recommendations

### Confirmed Stack
- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Supabase (Auth, DB, Storage, Realtime)
- **Builds**: EAS (Expo Application Services)
- **Monitoring**: Sentry
- **State**: Zustand (lightweight, simple API)

### Additional Recommendations

#### AI/LLM
- **Primary**: OpenAI GPT-4 Turbo (best code generation)
- **Fallback**: Anthropic Claude (good for complex reasoning)
- **Cost optimization**: Use GPT-3.5 for simple tasks, GPT-4 for complex

#### Code Analysis
- **AST Parsing**: Babel parser + @babel/traverse
- **Diff Generation**: diff-match-patch or similar
- **Code Formatting**: Prettier (already in stack)

#### Testing
- **Unit/Integration**: Jest + React Native Testing Library
- **E2E**: Detox or Maestro
- **Visual Regression**: (optional) Percy/Chromatic

#### CI/CD
- **GitHub Actions** (for Mode 2, or managed CI)
- **EAS Build** (primary build system)

#### Storage (for Mode 3)
- **AWS S3** or **Supabase Storage** (for project snapshots)

#### Container/Isolation (Sandbox)
- **Docker** (for build environments)
- **Kubernetes** (if scaling to many projects)
- **Alternative**: Serverless functions with isolated execution

---

## Code Style & Documentation Rules

### Code Comments
- Write comments as if you (the developer) wrote them
- Natural, conversational tone
- Explain "why" not "what"
- No "AI-generated" markers

### Example Good Comment:
```typescript
// We use a debounce here because the preview updates can be
// expensive, and we don't want to rebuild on every keystroke
const debouncedUpdate = useDebounce(updatePreview, 500);
```

### Example Bad Comment:
```typescript
// AI: This function debounces the preview update to optimize performance
// This was generated by AI to handle user input efficiently
```

### Large Documentation
- All extensive documentation goes in `.internal/` folder
- README files should be concise and professional
- Technical deep-dives in `.internal/docs/`

---

## Risk Mitigation

### Technical Risks
1. **Agent loops**: Max iteration limits, strategy switching
2. **Cost explosion**: Token limits, caching, smart model selection
3. **Build failures**: Comprehensive error handling, rollback
4. **Security breaches**: Sandbox isolation, input validation

### Product Risks
1. **User confusion**: Clear UI, tooltips, onboarding
2. **Poor app quality**: Templates, modules, quality gates
3. **Publishing friction**: Step-by-step wizard, automation

---

## Success Metrics

### Technical
- Build success rate > 95%
- Autofix success rate > 80%
- Preview load time < 2s
- Agent response time < 5s (first token)

### Product
- User can create working app in < 30 min
- Publishing wizard completion rate > 70%
- User satisfaction (NPS) > 50

---

## Next Steps (Immediate)

1. **Review and approve this plan**
2. **Set up project structure** (Phase 1.1)
3. **Implement design system** (Phase 1.2)
4. **Build core UI** (Phase 1.3)
5. **Set up Supabase** (Phase 2.1)

---

## Notes

- This is a living document, update as we learn
- Prioritize stability over features
- Mini-steps always
- Professional code always
- User experience is paramount

