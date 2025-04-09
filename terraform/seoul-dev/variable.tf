variable "region" {
  type = string
  default = "ap-southeast-1"
}

################################################################################
# Network Module - Variables 
################################################################################

variable "availability_zones" {
  type = list(string)
  nullable = false
}

variable "cidr_block" {
  type = string
  nullable = false
}

variable "public_subnet_ips" {
  type = list(string)
  nullable = false
  
}

variable "private_subnet_ips" {
  type = list(string)
  nullable = false
}


################################################################################
# Database Module - Variables 
################################################################################

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
