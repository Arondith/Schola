# Schola v2 — Laravel + Livewire + Alpine + AWS

Schola v2 upgrades the original front-end study-platform prototype into a full-stack portfolio project focused on modern Laravel development and production-oriented cloud architecture.

## Easiest local setup — recommended

### Windows: one-click launcher

From the repository root, double-click:

`start-schola.bat`

Requirements:

- Docker Desktop installed
- Docker Desktop running

The launcher will:

- build the Schola application image;
- start the Laravel app, MySQL, and Redis;
- wait for the database and Redis health checks;
- run Laravel database migrations automatically;
- expose the app on port 8000; and
- open **http://localhost:8000** in your browser.

To stop the project without deleting your database data, double-click:

`stop-schola.bat`

### Docker command line

If you prefer the terminal:

```bash
cd schola-v2
docker compose up --build -d
```

Then open **http://localhost:8000**.

To stop it:

```bash
docker compose down
```

The MySQL data is stored in a named Docker volume, so normal stops do not erase your study tasks.

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

## Manual PHP setup

Use this only if you specifically want to run Laravel outside Docker.

Requirements: PHP 8.4.1+, Composer, Node.js 22+, and MySQL or SQLite.

```bash
cp .env.example .env
composer install
php artisan key:generate
npm install
npm run build
php artisan migrate
php artisan serve
```

If you use a locally installed MySQL server instead of Docker, change `DB_HOST` in `.env` from `mysql` to `127.0.0.1` and use your own local database credentials.

### Run tests

```bash
php artisan test
```

## Docker behavior

The Compose setup is optimized for an easy first launch:

- the application is available at `localhost:8000`;
- the application container uses PHP 8.4 to match the Composer dependency platform;
- MySQL and Redis stay internal to Docker, avoiding common host port conflicts;
- the app waits for healthy dependencies before starting;
- migrations run automatically;
- dependencies and built assets remain inside the application image instead of being hidden by a host bind mount.

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
