variable "ami_id" {
  description = "AMI ID for backend instances"
  type        = string
}

variable "instance_type" {
  description = "Instance type for backend servers"
  type        = string
  default     = "t3.micro"
}

variable "instance_security_group_id" {
  description = "Security group ID for instances"
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}

variable "target_group_arn" {
  description = "Target group ARN to associate with ASG"
  type        = string
}

variable "db_endpoint" {
  description = "RDS endpoint URL"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
  default     = null
}
