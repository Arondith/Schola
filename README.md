# Schola

Schola is a study-productivity platform that started as a front-end school prototype and is now being extended with a production-oriented Laravel architecture.

## Fastest way to open Schola on Windows

The Laravel version now includes a one-click Docker launcher.

1. Install and open Docker Desktop.
2. Clone or download this repository.
3. Double-click `start-schola.bat` in the repository root.
4. Schola opens at **http://localhost:8000**.
5. When finished, double-click `stop-schola.bat`.

The launcher builds the application, starts MySQL and Redis, runs Laravel migrations automatically, and opens the app in your browser. You do not need to run Composer, npm, MySQL, Redis, or Artisan manually for this Docker workflow.

## Versions

### v1 — Front-end prototype

The original responsive prototype remains in `Schola_Website/schola-website/` and demonstrates the interface for planning, focus sessions, resources, flashcards, study groups, notes, and profile interactions using HTML, CSS, and JavaScript.

### v2 — Laravel / Livewire / AWS portfolio build

`schola-v2/` is a full-stack portfolio implementation designed to demonstrate modern PHP and production-scale architectural patterns:

- Laravel 13
- Livewire 4
- Alpine.js interactions (bundled through Livewire)
- MySQL persistence
- Redis-ready cache configuration
- SQS-ready queued jobs
- S3-ready object storage
- Docker local environment
- PHPUnit / Livewire feature tests
- GitHub Actions CI
- Terraform reference infrastructure for AWS ECS, ALB, Auto Scaling, RDS, ElastiCache, S3, SQS and CloudWatch

> **Scope note:** v2 demonstrates scale-ready / production-oriented patterns and infrastructure-as-code. It is a portfolio implementation, not a claim that Schola has already handled production-scale traffic.

See [`schola-v2/README.md`](schola-v2/README.md) for setup, architecture, and portfolio notes.

## Project context

The original Schola interface was developed as a school project with one project partner. The v2 Laravel implementation is an individual portfolio extension created to deepen full-stack, testing, cloud, and deployment skills.
