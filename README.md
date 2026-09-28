# FlowPilot AI

AI-powered workflow automation for reliable, observable business workflows.

## Architecture

```
Trigger → Validation → Orchestrator → Agent → Tool → Business Action
                         ↓
                   Execution Events
                         ↓
                   Retry / Recovery
```

FlowPilot treats AI as a decision component inside a deterministic execution system. Model output is validated before it can drive business actions.

## Current capabilities

- Deterministic ordered workflow execution
- Structured workflow input validation
- Failure-safe execution results
- Structured AI agent abstraction
- Execution event recording
- Bounded exponential retry
- Pluggable tool registry
- Automated Node.js tests
- GitHub Actions CI

## Project structure

```
src/
├── agents/
│   ├── agent.js
│   └── index.js
├── core/
│   ├── engine.js
│   ├── events.js
│   ├── index.js
│   ├── retry.js
│   ├── types.js
│   └── validate.js
└── tools/
    ├── index.js
    └── registry.js
test/
├── agent.test.js
├── engine.test.js
└── reliability.test.js
```

## Reliability model

### Retry

Transient operations can use bounded exponential backoff. Retries are explicit and capped; failures are surfaced rather than retried indefinitely.

### Execution events

The recorder provides an append-only in-memory event stream that can later be backed by Supabase, PostgreSQL, or another durable store.

### Tool registry

Tools are registered by name and executed through a single boundary. This keeps agent/tool integrations replaceable and makes available capabilities discoverable.

## Local development

Requires Node.js 20+.

```bash
npm install
npm test
npm run check
```

## Roadmap

- [x] Workflow contracts
- [x] Deterministic workflow engine
- [x] Agent abstraction
- [x] Structured-output enforcement
- [x] Automated tests
- [x] CI
- [x] Execution event recorder
- [x] Retry policy
- [x] Tool registry
- [ ] Durable execution store
- [ ] Human approval gates
- [ ] LLM provider adapters
- [ ] Workflow templates
- [ ] Evaluation harness
- [ ] Observability dashboard
