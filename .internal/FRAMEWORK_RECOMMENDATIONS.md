# Framework & Technology Recommendations

## Core Stack (Confirmed)

### Frontend Framework
**React Native + Expo + TypeScript**
- ✅ Best live preview experience
- ✅ Easiest publishing pipeline (EAS)
- ✅ Robust for SaaS
- ✅ Web preview possible via React Native Web

**Alternative considered**: Flutter
- ❌ More complex preview system
- ❌ Less mature tooling for our use case
- ✅ Could be considered later for unified web/mobile

---

## State Management

### Recommended: Zustand
**Why:**
- Lightweight (~1KB)
- Simple API, easy to learn
- No boilerplate
- Works great with TypeScript
- Good DevTools support

**Alternative: Redux Toolkit**
- More boilerplate
- Better for very large apps
- More ecosystem/tooling
- Overkill for our needs initially

**Decision: Start with Zustand, migrate to Redux Toolkit if needed**

---

## UI Component Library

### Recommended: Custom Components + React Native Paper (selective)
**Why:**
- We need glassmorphism (custom)
- We need specific design (livekit.io inspired)
- React Native Paper provides good base components
- We can extend/customize as needed

**Alternative: NativeBase / Tamagui**
- More opinionated
- Harder to customize for our specific design
- Good for rapid prototyping, but we need control

**Decision: Custom components with React Native Paper as base**

---

## Navigation

### Recommended: React Navigation v6
**Why:**
- Industry standard
- Excellent TypeScript support
- Deep linking support
- Tab navigation (we need this)
- Stack navigation for wizards

**No real alternative needed**

---

## Styling

### Recommended: StyleSheet + Design Tokens
**Why:**
- Native performance
- Type-safe with TypeScript
- Easy to implement glassmorphism
- Theme switching straightforward

**Alternative: Styled Components / Emotion**
- Runtime overhead
- Less performant
- Harder to implement glassmorphism effects

**Decision: StyleSheet with design token system**

---

## AI/LLM Integration

### Recommended: OpenAI API (GPT-4 Turbo)
**Why:**
- Best code generation quality
- Good reasoning capabilities
- Streaming support
- Function calling (tools)

**Fallback: Anthropic Claude**
- Excellent for complex reasoning
- Good safety features
- Can use for error analysis

**Cost Optimization Strategy:**
- GPT-3.5 Turbo for simple tasks (formatting, simple queries)
- GPT-4 Turbo for code generation, complex reasoning
- Cache responses when possible
- Use smaller context windows when appropriate

**Library: OpenAI SDK (official)**
- Best maintained
- TypeScript support
- Streaming built-in

---

## Code Analysis & Manipulation

### AST Parsing: Babel
**Why:**
- Industry standard for JavaScript/TypeScript
- Excellent tooling
- @babel/parser for parsing
- @babel/traverse for manipulation
- @babel/generator for code generation

**Alternative: TypeScript Compiler API**
- More complex
- Better type information
- Overkill for our needs

**Decision: Babel for AST manipulation**

### Diff/Patch: diff-match-patch
**Why:**
- Fast, reliable
- Good for showing changes
- Can generate patches

**Alternative: jsdiff**
- Similar functionality
- diff-match-patch is more performant

---

## Testing

### Unit/Integration: Jest + React Native Testing Library
**Why:**
- Standard for React Native
- Good mocking capabilities
- Snapshot testing
- Coverage reports

### E2E: Detox (Recommended) or Maestro
**Why Detox:**
- Native performance
- Good for CI/CD
- Reliable

**Why Maestro:**
- Easier to write tests
- YAML-based
- Good for non-developers

**Decision: Start with Jest, add Detox later for E2E**

---

## Internationalization

### Recommended: react-i18next
**Why:**
- Most popular i18n solution for React
- Good TypeScript support
- Pluggable (can add backend later)
- Namespace support (perfect for our feature.key.subkey structure)

**Alternative: react-intl**
- Also good
- More opinionated
- react-i18next is more flexible

---

## Date/Time

### Recommended: date-fns + date-fns-tz
**Why:**
- Tree-shakeable (small bundle)
- Immutable
- TypeScript support
- Locale support
- Timezone support

**Alternative: Moment.js / Day.js**
- Moment.js is deprecated
- Day.js is good but less features
- date-fns is most modern

---

## Build & Distribution

### EAS (Expo Application Services)
**Why:**
- Integrated with Expo
- Handles iOS/Android builds
- TestFlight/Play Store integration
- Over-the-air updates
- Build profiles

**No alternative needed - this is core to Expo**

---

## Backend

### Supabase
**Why:**
- Auth, DB, Storage, Realtime in one
- PostgreSQL (powerful)
- Row Level Security (important for multi-tenant)
- Real-time subscriptions
- Edge Functions (Deno)
- Good free tier

**Alternatives considered:**
- Firebase: Less flexible, NoSQL
- AWS Amplify: More complex setup
- Custom backend: Too much work

**Decision: Supabase is perfect for our needs**

---

## Monitoring & Error Tracking

### Sentry
**Why:**
- Industry standard
- Excellent React Native support
- Source maps
- Performance monitoring
- Release tracking
- Good free tier

**Alternative: Bugsnag**
- Also good
- Sentry has better React Native integration

---

## CI/CD

### GitHub Actions (for Mode 2) or Managed CI
**Why:**
- Integrated with GitHub
- Good free tier
- Flexible
- Can run EAS builds

**For Mode 1 (Managed):**
- We can run our own CI or use GitHub Actions in our org

---

## Container/Isolation

### Docker (for sandbox builds)
**Why:**
- Industry standard
- Good isolation
- Can run on any cloud

**For scaling:**
- Kubernetes (if many projects)
- Or serverless functions with isolated execution

**Decision: Start with Docker, scale to K8s if needed**

---

## Project Structure Recommendation

```
AppCreator/
├── apps/
│   ├── builder/              # Main React Native app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── utils/
│   │   │   └── types/
│   │   ├── app.json
│   │   └── package.json
│   └── orchestrator/         # AI agent service (Node.js)
│       ├── src/
│       │   ├── agents/
│       │   ├── codegen/
│       │   ├── modules/
│       │   ├── templates/
│       │   └── utils/
│       └── package.json
├── packages/
│   ├── shared/               # Shared types/utils
│   ├── design-system/        # Design tokens/components
│   └── modules/              # App modules (Auth, Chat, etc.)
├── .internal/                # Internal docs (hidden)
│   ├── MASTERPLAN.md
│   ├── FRAMEWORK_RECOMMENDATIONS.md
│   └── docs/
├── .github/
│   └── workflows/
└── package.json              # Root (monorepo manager)
```

**Monorepo Manager:**
- **pnpm workspaces** (recommended) - fastest, best disk usage
- **npm workspaces** - simpler, but slower
- **Yarn workspaces** - good middle ground

**Decision: pnpm workspaces**

---

## Development Tools

### Code Quality
- **ESLint**: Standard React Native config + custom rules
- **Prettier**: Code formatting
- **TypeScript**: Strict mode
- **Husky**: Git hooks (pre-commit lint/format)
- **lint-staged**: Run linters on staged files

### Git
- **Conventional Commits**: For better changelog
- **Semantic Versioning**: For releases

---

## Summary of Key Decisions

| Category | Choice | Rationale |
|---------|--------|-----------|
| Frontend | React Native + Expo | Best preview + publishing |
| State | Zustand | Lightweight, simple |
| UI | Custom + RN Paper | Need glassmorphism control |
| Navigation | React Navigation | Industry standard |
| Styling | StyleSheet + Tokens | Performance + control |
| AI | OpenAI GPT-4 Turbo | Best code generation |
| AST | Babel | Standard tooling |
| Testing | Jest + RTL | Standard for RN |
| i18n | react-i18next | Flexible, TypeScript |
| Date | date-fns | Modern, tree-shakeable |
| Backend | Supabase | All-in-one, powerful |
| Monitoring | Sentry | Best RN support |
| Monorepo | pnpm workspaces | Fast, efficient |

---

## Migration Path (If Needed)

If we need to change frameworks later:

1. **State Management**: Zustand → Redux Toolkit
   - Similar patterns, mostly refactoring stores

2. **UI Library**: Custom → Tamagui
   - Would need to rebuild components, but design tokens stay

3. **Backend**: Supabase → Custom
   - Would need to rebuild API layer, but frontend mostly unchanged

4. **AI Provider**: OpenAI → Anthropic
   - Just swap SDK, prompts mostly same

---

## Cost Considerations

### Development Phase
- Supabase: Free tier (good for dev)
- OpenAI: Pay per use (manage with limits)
- EAS: Free tier for development builds
- Sentry: Free tier (good for small scale)

### Production Phase
- Supabase: ~$25/month (Pro) for moderate usage
- OpenAI: Variable (use GPT-3.5 when possible)
- EAS: Pay per build (~$0.10-0.50 per build)
- Sentry: ~$26/month (Team) for production

**Total estimated: ~$100-200/month for moderate usage**

---

## Final Recommendation

**Proceed with confirmed stack + Zustand + react-i18next + date-fns + pnpm workspaces**

This gives us:
- ✅ Fast development
- ✅ Good performance
- ✅ Type safety
- ✅ Scalability
- ✅ Cost efficiency
- ✅ Professional codebase

