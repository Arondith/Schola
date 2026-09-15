# Schola v2 architecture

## Goal

Schola v2 demonstrates how a small Laravel application can be structured so it can grow without putting user-facing web requests, persistent data, file storage, cache state, and background work on one server.

## Request path

`Internet → Application Load Balancer → ECS Fargate tasks → Laravel / Livewire`

The web layer is treated as stateless. Multiple ECS tasks can serve requests, and Application Auto Scaling can add or remove tasks based on CPU utilization.

## Data services

- **Amazon RDS MySQL** — durable relational application data.
- **Amazon ElastiCache Redis** — cache/session-ready shared state.
- **Amazon S3** — object storage for future notes, attachments, and resource uploads.
- **Amazon SQS** — asynchronous work such as digest generation and notifications.
- **CloudWatch Logs** — centralized container logs.

## Production-scale patterns demonstrated

1. Horizontal scaling behind an ALB.
2. Stateless application containers.
3. Managed database separated from the web tier.
4. Shared cache instead of per-server memory state.
5. Object storage instead of local container disks.
6. Queue-backed background processing.
7. Health checks through Laravel's `/up` endpoint.
8. Infrastructure as code with Terraform.
9. Automated tests and CI before deployment.
10. Environment-specific configuration through variables rather than hard-coded secrets.

## Important portfolio distinction

This repository demonstrates **production-oriented / scale-ready architecture patterns**. It does not claim that Schola has already handled a large production traffic load. Real production deployment would also add HTTPS/ACM, Secrets Manager or SSM Parameter Store, NAT/VPC endpoints for private ECS tasks, WAF, database Multi-AZ for higher availability, alarms, backups, tracing, and a dedicated queue-worker service.
