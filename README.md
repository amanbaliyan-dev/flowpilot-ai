# FlowPilot AI

AI-powered workflow automation for building reliable, observable business workflows.

## Architecture

```
Trigger
  ↓
Workflow Validation
  ↓
Deterministic Orchestrator
  ↓
AI Agent / Tool
  ↓
Structured Decision
  ↓
Validated Business Action
  ↓
Execution Result
```

The key design principle is that **AI is a decision component, not an uncontrolled execution boundary**.

## Current capabilities

- Deterministic ordered workflow execution
- Structured workflow input validation
- Failure-safe execution results
- AI agent abstraction with structured-output enforcement
- Node.js test suite
- GitHub Actions CI

## Project structure

```
src/
├── agents/
│   ├── agent.js
│   └── index.js
└── core/
    ├── engine.js
    ├── index.js
    ├── types.js
    └── validate.js
test/
├── agent.test.js
└── engine.test.js
```

## Engineering principles

1. Validate inputs before execution.
2. Keep deterministic orchestration around probabilistic AI.
3. Require structured AI output.
4. Make failures explicit and recoverable.
5. Keep integrations replaceable.
6. Add tests around every important execution boundary.

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
- [ ] Execution event store
- [ ] Retry policy
- [ ] Tool registry
- [ ] Human approval gates
- [ ] LLM provider adapters
- [ ] Workflow templates
- [ ] Evaluation harness
