# Schola v2 — Laravel + Livewire + Alpine + AWS

Schola v2 upgrades the original front-end study-platform prototype into a full-stack portfolio project focused on modern Laravel development and production-oriented cloud architecture.

## What this project demonstrates

### Laravel 13

- Eloquent model and migration for study tasks
- Validation and server-side state
- Queueable background job
- Environment-driven configuration
- Built-in health endpoint (`/up`)

### Livewire 4

- Reactive task creation
- Filtering
- Completion and deletion actions
- Validation feedback without hand-written AJAX
- Browser event dispatched after persistence

### Alpine.js

Livewire 4 bundles Alpine.js. The dashboard intentionally uses Alpine directives for lightweight client interactions:

- `x-data`
- `x-show`
- `x-transition`
- event-driven toast visibility

### AWS / production-oriented architecture

Terraform under `infra/terraform/` models a scale-ready AWS deployment using:

- Application Load Balancer
- ECS Fargate
- ECS Application Auto Scaling
- RDS MySQL
- ElastiCache Redis
- S3
- SQS
- CloudWatch Logs

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

> This project demonstrates production-scale **patterns**. It does not falsely claim the application has already served production-scale traffic.

## Local setup

### Standard PHP setup

Requirements: PHP 8.3+, Composer, Node.js 22+, and MySQL or SQLite.

```bash
cp .env.example .env
composer install
php artisan key:generate
npm install
npm run build
php artisan migrate
php artisan serve
```

### Run tests

```bash
php artisan test
```

### Docker services

```bash
docker compose up --build
```

The Docker Compose file includes the application, MySQL, and Redis services as a development reference environment.

## AWS Terraform

Do not apply the Terraform configuration without reviewing costs and security settings first.

```bash
cd infra/terraform
terraform init
terraform plan -var='db_password=replace-me' -var='container_image=YOUR_IMAGE_URI'
```

## Why this exists

The project is intended to turn an existing HTML/CSS/JavaScript prototype into evidence of practical experience with:

- Laravel
- Livewire
- Alpine.js
- automated testing
- Docker
- AWS architecture
- Terraform
- queues, cache, object storage and horizontal scaling concepts

These technologies should only be described on a resume at the level actually demonstrated here.
