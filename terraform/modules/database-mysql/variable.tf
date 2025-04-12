variable "db_subnet_group_name" {
  type      = string
  description = "The Subnet Group that deploy database"
  nullable = false
}

variable "db_security_group_ids" {
  type = list(string)
  description = "The Security Group IDs apply for database"
}

variable "db_username" {
  type      = string
  sensitive = true
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "db_name" {
  type = string
}
