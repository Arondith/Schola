output "load_balancer_dns" {
  value = aws_lb.main.dns_name
}

output "database_endpoint" {
  value     = aws_db_instance.mysql.address
  sensitive = true
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "uploads_bucket" {
  value = aws_s3_bucket.uploads.bucket
}

output "queue_url" {
  value = aws_sqs_queue.jobs.url
}
