# AI Agent Architecture - Detaljert Spesifikasjon

## Er det mulig? Ja, men vi trenger en solid arkitektur

Dette dokumentet spesifiserer hvordan AI agenten faktisk fungerer, hvordan den kommuniserer med terminal/logg, og hvordan den husker kontekst.

---

## 1. Agent Orchestrator (Backend Service)

### 1.1 Arkitektur
Agent orchestrator er en Node.js backend service som:
- Kjører i egen prosess/container (ikke i React Native appen)
- Kommuniserer med React Native appen via WebSocket eller HTTP
- Har tilgang til terminal/kommandolinje
- Har tilgang til Supabase API
- Har tilgang til GitHub API (ved behov)

### 1.2 Lokasjon
```
apps/orchestrator/     # Node.js backend service
  src/
    agent/             # AI agent logikk
    terminal/          # Terminal/logg system
    supabase/          # Supabase automatisering
    github/            # GitHub automatisering
    context/           # Context management
```

---

## 2. Terminal/Logg System

### 2.1 Hva er det?
Et system som:
- Logger alle kommandoer agenten kjører
- Logger all output fra kommandoer
- Logger alle filendringer
- Logger alle API-kall (Supabase, GitHub, etc.)
- Gir real-time streaming til frontend

### 2.2 Implementering

#### Backend (Orchestrator)
```typescript
// apps/orchestrator/src/terminal/Logger.ts
class Logger {
  private logs: LogEntry[] = [];
  private subscribers: Set<(log: LogEntry) => void> = new Set();

  log(command: string, output: string, type: 'command' | 'output' | 'error' | 'info') {
    const entry: LogEntry = {
      id: generateId(),
      timestamp: Date.now(),
      command,
      output,
      type,
    };
    this.logs.push(entry);
    this.broadcast(entry);
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  subscribe(callback: (log: LogEntry) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
}
```

#### Frontend (React Native)
- Skjult tab/side: "Terminal" eller "Logs"
- Real-time loggvisning
- Filtrering (kun errors, kun commands, etc.)
- Eksport til fil
- Søk i logger

### 2.3 UI/UX
- **Default**: Skjult, men tilgjengelig
- **Aktivering**: Settings → "Show Terminal" eller swipe gesture
- **Visning**: Scrollbar med auto-scroll, fargekoding (error=red, success=green)
- **Ikke nødvendig**: Brukeren kan ignorere det helt, AI forklarer alt i chat

---

## 3. Context Management (Hvordan AI husker)

### 3.1 Problem
AI modeller har begrenset context window. Vi kan ikke sende hele prosjekthistorien hver gang.

### 3.2 Løsning: Hierarkisk Context System

#### Nivå 1: Session Context (korttid)
- Siste 10-20 meldinger i chatten
- Siste 5-10 filendringer
- Aktuell prosjektstatus
- Sendes med hver AI request

#### Nivå 2: Project Context (langtid)
- Prosjektstruktur (filtrer, ikke hele filer)
- Installerte moduler
- Supabase konfigurasjon
- GitHub status
- Lagres i database, sendes ved behov

#### Nivå 3: Summary Context (komprimert)
- Prosjektsammendrag (AI-generert)
- Viktige beslutninger
- Moduler og dependencies
- Oppdateres kontinuerlig

### 3.3 Implementering

```typescript
// apps/orchestrator/src/context/ContextManager.ts
class ContextManager {
  // Session context (i minnet)
  private sessionContext: SessionContext = {
    recentMessages: [],
    recentChanges: [],
    currentState: {},
  };

  // Project context (database)
  async getProjectContext(projectId: string): Promise<ProjectContext> {
    // Hent fra Supabase
  }

  // Summary context (komprimert)
  async getSummary(projectId: string): Promise<string> {
    // Hent eller generer summary
  }

  // Bygg full context for AI
  async buildContext(projectId: string, userMessage: string): Promise<FullContext> {
    const project = await this.getProjectContext(projectId);
    const summary = await this.getSummary(projectId);
    
    return {
      session: this.sessionContext,
      project: project,
      summary: summary,
      userMessage: userMessage,
    };
  }
}
```

### 3.4 Context Window Management
- Maks tokens per request (f.eks. 100k tokens)
- Prioritering: Nyeste først
- Summarization: Gamle meldinger komprimeres
- Smart truncation: Beholder viktig info

---

## 4. Terminal Command Execution

### 4.1 Sikkerhet
- **Allowlist**: Kun tillatte kommandoer
- **Sandbox**: Hver kommando kjører i isolert miljø
- **Timeout**: Maks kjøretid per kommando
- **Resource limits**: CPU, minne, disk

### 4.2 Tillatte Kommandoer
```typescript
const ALLOWED_COMMANDS = [
  'pnpm', 'npm', 'yarn',        // Package management
  'git',                        // Version control
  'expo',                       // Expo CLI
  'eas',                        // EAS CLI
  'npx',                        // NPM executables
  // Ingen: rm, sudo, curl med arbitrary URLs, etc.
];
```

### 4.3 Implementering

```typescript
// apps/orchestrator/src/terminal/CommandExecutor.ts
class CommandExecutor {
  async execute(command: string, args: string[], projectId: string): Promise<CommandResult> {
    // 1. Valider kommando
    if (!this.isAllowed(command)) {
      throw new Error(`Command not allowed: ${command}`);
    }

    // 2. Kjør i sandbox
    const result = await this.runInSandbox(command, args, projectId);

    // 3. Log resultat
    logger.log(command, result.output, result.success ? 'output' : 'error');

    return result;
  }
}
```

---

## 5. Supabase Automatisering

### 5.1 Hva kan automatiseres?
- ✅ Opprette prosjekt (via Supabase Management API)
- ✅ Opprette tabeller (via SQL migrations)
- ✅ Sette opp Storage buckets
- ✅ Konfigurere RLS policies
- ✅ Opprette Edge Functions
- ✅ Oppdatere environment variables

### 5.2 Implementering

```typescript
// apps/orchestrator/src/supabase/SupabaseManager.ts
class SupabaseManager {
  private supabaseAdmin: SupabaseClient; // Admin client

  async createProject(name: string): Promise<Project> {
    // Bruk Supabase Management API
    // Eller Supabase CLI
  }

  async createTable(projectId: string, schema: TableSchema): Promise<void> {
    // Generer migration SQL
    // Kjør via Supabase API eller CLI
  }

  async setupStorage(projectId: string, buckets: string[]): Promise<void> {
    // Opprett buckets
    // Sett opp policies
  }
}
```

### 5.3 Bruk av Supabase CLI
- Supabase CLI kan kjøres som kommando
- `supabase db push` for migrations
- `supabase storage create` for buckets
- Vi logger alt som skjer

---

## 6. AI Agent Flow

### 6.1 Hvordan fungerer det?

```
1. Bruker skriver i chat: "Legg til autentisering"
   ↓
2. Frontend sender til orchestrator via WebSocket
   ↓
3. Orchestrator bygger context:
   - Henter prosjektinfo
   - Henter siste meldinger
   - Henter prosjektsammendrag
   ↓
4. AI agent planlegger:
   - "Jeg må: 1) Installere auth modul, 2) Sette opp Supabase auth, 3) Legge til login screen"
   ↓
5. AI agent utfører steg-for-steg:
   For hvert steg:
   a) Kjører kommando (f.eks. "pnpm add @supabase/supabase-js")
   b) Logger output
   c) Leser resultat
   d) Fortsetter eller prøver alternativ ved feil
   ↓
6. AI sender oppdateringer til frontend:
   - "Installerer auth pakke..."
   - "Oppretter login screen..."
   - "Kobler til Supabase..."
   ↓
7. Når ferdig:
   - "Autentisering er nå lagt til! Du kan logge inn med email/password."
   - Oppdaterer preview
```

### 6.2 Error Handling

```typescript
async function executeWithRetry(action: () => Promise<void>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await action();
      return { success: true };
    } catch (error) {
      logger.log('error', error.message, 'error');
      
      if (i < maxRetries - 1) {
        // Prøv alternativ strategi
        const alternative = await ai.suggestAlternative(error);
        await alternative();
      } else {
        // Gi opp, spør bruker
        return { success: false, error, userChoice: await askUser(error) };
      }
    }
  }
}
```

---

## 7. Kommunikasjon Frontend ↔ Backend

### 7.1 WebSocket Connection
```typescript
// Frontend
const ws = new WebSocket('wss://orchestrator.appcreator.com');

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'agent_message':
      // AI sier noe
      addChatMessage(message.content);
      break;
    case 'terminal_log':
      // Terminal output
      addTerminalLog(message.log);
      break;
    case 'file_change':
      // Fil endret
      updatePreview();
      break;
    case 'error':
      // Feil oppstod
      showError(message.error);
      break;
  }
};
```

### 7.2 HTTP Fallback
- Hvis WebSocket feiler, bruk HTTP polling
- Eller Server-Sent Events (SSE)

---

## 8. Memory/Context Persistence

### 8.1 Hva lagres?
- Prosjektstruktur (filtrer, ikke innhold)
- Moduler og dependencies
- Supabase konfigurasjon
- Viktige beslutninger
- Error patterns og løsninger

### 8.2 Hvor lagres det?
- **Supabase Database**: Prosjektmetadata, context summaries
- **File System**: Prosjektfiler (i sandbox)
- **Cache**: Session context (i minnet, midlertidig)

### 8.3 Hvordan oppdateres det?
- Kontinuerlig: Etter hver endring
- Summarization: Periodisk (hver time/dag)
- Cleanup: Gamle logger arkiveres

---

## 9. Realisme og Begrensninger

### 9.1 Hva fungerer bra?
✅ Kodegenerering med templates
✅ Filendringer (create, update, delete)
✅ Package management (pnpm install, etc.)
✅ Supabase setup (via API/CLI)
✅ GitHub operations (via API)
✅ Build/test execution
✅ Error detection og retry

### 9.2 Hva er utfordrende?
⚠️ Komplekse feil som krever dyp forståelse
⚠️ Performance-optimalisering (krever profiling)
⚠️ Store refactorings (mange filer samtidig)
⚠️ Native module setup (kan kreve manuell konfig)

### 9.3 Hva gjør vi ved problemer?
1. AI prøver 2-3 ganger med forskjellige strategier
2. Hvis fortsatt feil: Spør brukeren (A/B/C valg)
3. Logger alt i terminal (bruker kan se hva som skjedde)
4. Rollback hvis siste endring gjorde det verre

---

## 10. Implementeringsrekkefølge

### Phase 1: Grunnleggende
1. Orchestrator service (Node.js)
2. WebSocket kommunikasjon
3. Enkel terminal logger
4. AI agent med basic code generation

### Phase 2: Context Management
1. Context manager
2. Database for prosjektcontext
3. Summarization system

### Phase 3: Automatisering
1. Supabase automatisering
2. GitHub automatisering
3. Build/test execution

### Phase 4: Avansert
1. Autofix system
2. Error pattern recognition
3. Smart retry strategies

---

## 11. Konklusjon

**Ja, det er mulig**, men vi trenger:
- Solid backend service (orchestrator)
- Terminal/logg system (skjult men tilgjengelig)
- Smart context management (hierarkisk)
- Sikker command execution (sandbox, allowlist)
- Robust error handling (retry, rollback, user choice)

**Brukeren trenger ikke se terminal**, men den er der hvis de vil debugge eller forstå hva som skjer.


