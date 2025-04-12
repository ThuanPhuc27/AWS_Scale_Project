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

variable "instance_type" {
  type        = string
  description = "Type of EC2 instance to launch. Example: t2.small"
  default = "t3.small"
}

variable "region" {
  type = string
  default = "ap-southeast-1"
}

variable "security_groups" {
  type = list(string)
  default = ["default"]
}

variable "subnet_id" {
  type = string
}

variable "amis" {
  type = map(any)
  default = {
    "ap-northeast-2" : "ami-0077297a838d6761d" #Ubuntu 22.04 Jammy
  }
}