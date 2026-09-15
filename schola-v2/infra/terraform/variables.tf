variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "app_name" {
  type    = string
  default = "schola-v2"
}

variable "container_image" {
  description = "Published Schola container image URI"
  type        = string
  default     = "public.ecr.aws/docker/library/nginx:alpine"
}

variable "db_username" {
  type      = string
  default   = "schola"
  sensitive = true
}

variable "db_password" {
  type      = string
  sensitive = true
}
