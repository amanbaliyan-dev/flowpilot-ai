# FlowPilot AI

### Full-Stack AI Automation & Workflow Orchestration Platform

FlowPilot AI is a planned multi-tenant platform for designing, executing, monitoring, and improving AI-powered business workflows. It combines deterministic workflow logic with LLMs, retrieval-augmented generation (RAG), external tools, scheduled triggers, and human approval gates.

> **Project status:** Architecture and phased implementation plan. Features should be considered planned until implemented and verified in this repository.

## Overview

FlowPilot AI is designed to help teams automate repeatable business processes while maintaining control, observability, and security. Rather than acting as a simple chatbot, the platform treats AI operations as versioned, validated, auditable workflows.

### Intended use cases

- AI customer-support automation
- Lead qualification and CRM enrichment
- Document intelligence and knowledge assistants
- Invoice and contract data extraction
- Report generation and content workflows
- Internal operational agents with approval steps

## Core capabilities

- **Visual workflow builder** — create node-based workflows with triggers, conditions, branches, retries, and outputs.
- **Workflow lifecycle** — draft, validate, publish, archive, rollback, test, replay, and inspect executions.
- **Provider abstraction** — switchable model adapters for chat, structured output, tool calling, embeddings, and usage metering.
- **RAG document pipeline** — upload, parse, chunk, embed, retrieve, rerank, and cite source material.
- **Durable background execution** — queued jobs, bounded retries, idempotency, cancellation, and dead-letter handling.
- **Human-in-the-loop approvals** — pause high-risk actions for review and resume only after an authorized decision.
- **Multi-tenant security** — organization/project scoping, role-based access, scoped API keys, and audit events.
- **Observability and cost controls** — execution traces, provider latency, token usage, cost tracking, and configurable budgets.

## Technology stack

| Layer | Planned technology |
|---|---|
| Frontend | React, TypeScript |
| Public API / Gateway | Node.js, Express.js |
| AI orchestration service | Python, FastAPI |
| Primary metadata database | MongoDB |
| Queue, cache, locks, rate limits | Redis |
| Document/artifact storage | S3-compatible object storage |
| Semantic retrieval | Replaceable vector-search adapter |
| Testing | Vitest/Jest, Pytest, Playwright, k6 |
| Local infrastructure | Docker Compose |
| Observability | OpenTelemetry-compatible tooling |

## High-level architecture

```text
React + TypeScript
       |
       v
Express API Gateway -----> MongoDB
       |
       +-----> FastAPI AI Service -----> Model Providers
       |                |
       |                +-----> Vector Store / Retrieval
       |
       +-----> Redis Queues -----> Node.js & Python Workers
                                  |
                                  +-----> Object Storage
```

The Express gateway is the public entry point for authentication, tenancy, workflow management, and authorization. FastAPI owns AI-specific orchestration, retrieval, model adapters, and evaluation. Long-running work is delegated to workers; durable execution state is persisted rather than held in request memory.

## Repository structure

The intended monorepo layout:

```text
flowpilot-ai/
├── apps/
│   ├── web/                 # React + TypeScript frontend
│   ├── api-gateway/         # Node.js + Express public API
│   └── ai-service/          # Python + FastAPI AI services
├── workers/
│   ├── node-worker/
│   └── python-worker/
├── packages/
│   ├── contracts/           # Shared schemas and generated clients
│   ├── ui/                  # Shared React components
│   └── configs/
├── infrastructure/
│   ├── docker/
│   ├── kubernetes/
│   ├── terraform/
│   └── monitoring/
├── tests/
│   ├── contract/
│   ├── integration/
│   ├── e2e/
│   ├── load/
│   └── security/
├── docker-compose.yml
└── README.md
```

## Security principles

Security is part of the platform design, not an afterthought:

- Enforce organization and project scope in every repository operation.
- Validate AI-generated structured output and tool arguments before use.
- Use explicit, typed, allowlisted tools; avoid unrestricted shell or database execution.
- Keep secrets server-side, encrypt recoverable credentials, and redact sensitive logs.
- Require authorization, idempotency, and audit logging for external side effects.
- Apply rate limits, timeouts, retry budgets, SSRF protections, and tenant-level quotas.
- Route sensitive or high-risk operations through human approval.

## Development roadmap

| Phase | Scope |
|---|---|
| 1 | Authentication, organizations, projects, tenant-aware repositories, health checks, API contracts |
| 2 | Workflow definitions, validation, versioning, manual execution, execution history |
| 3 | Redis-backed jobs, retries, idempotency, cancellation, dead-letter handling, live events |
| 4 | Provider adapters, structured outputs, prompt registry, usage metering, cost controls |
| 5 | Document ingestion, hybrid retrieval, embeddings, reranking, citations, evaluation datasets |
| 6 | Authorized tools, MCP integrations, memory, approval gates, signed webhooks, external systems |
| 7 | Resilience, provider failover, autoscaling, security testing, observability, disaster recovery |

Advanced capabilities such as corrective/self-evaluating RAG, multi-agent review, persistent memory, and autonomous prompt improvement are intended as later, feature-flagged extensions.

## Quality and testing strategy

Planned validation includes:

- Unit tests for authorization, workflow validation, retries, idempotency, prompt rendering, and cost calculations
- Integration tests for MongoDB, Redis, storage, vector search, and provider adapters
- Contract tests between Express and FastAPI
- End-to-end tests for workflows, document ingestion, approvals, and organization switching
- AI evaluations for relevance, faithfulness, citation quality, tool selection, and structured-output validity
- Security and load tests covering tenant isolation, SSRF, webhook replay, rate limits, and queue saturation

## Getting started

The complete application setup will be documented here as implementation progresses. The repository is currently an architecture/roadmap landing point; no working local runtime or `.env` configuration is claimed yet.

When implementation begins, local setup is expected to use Docker Compose and environment variables documented in `.env.example` files. **Never commit real credentials or secrets.**

## Project goals

1. Build a focused, end-to-end MVP before introducing advanced distributed infrastructure.
2. Keep services independently testable with versioned contracts.
3. Make workflow execution recoverable, observable, and safe to retry.
4. Ensure every AI action is validated and every external side effect is authorized.
5. Gate production prompt/model changes with measurable evaluations.

## License

No license has been selected yet. Until one is added, all rights are reserved by the repository owner.
