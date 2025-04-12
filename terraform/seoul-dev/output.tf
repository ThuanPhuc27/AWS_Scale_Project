################################################################################
# Network Module - Variables 
################################################################################

output "vpc_id" {
  value = module.networking.vpc_id
}

output "private_subnet_ids" {
  value = module.networking.private_subnet_ids
}

output "public_subnet_ids" {
  value = module.networking.private_subnet_ids
}

output "db_subnet_group_name" {
  value = module.networking.db_subnet_group_name
}

################################################################################
# Security Module - Variables 
################################################################################

output "public_security_group_id" {
  value = module.security.public_security_group_id
}

output "private_security_group_id" {
  value = module.security.private_security_group_id
}

output "database_security_group_id" {
  value = module.security.database_security_group_id
}

output "bastion_security_group_id" {
  value = module.security.bastion_security_group_id
}

################################################################################
# Frontend Module - Variables 
################################################################################

output "s3_bucket_name" {
  value = module.frontend.s3_bucket_name
}

################################################################################
# Bastion Module - Variables 
################################################################################

output "bastion_ip" {
  value = module.bastion.instance_ip_addr_public
}

################################################################################
# Database Module - Variables 
################################################################################

output "mysql_endpoint" {
  description = "The endpoint of the MySQL RDS instance"
  value       = module.database.rds_endpoint
}

################################################################################
# ALB Module - Variables 
################################################################################

# output "backend-endpoint" {
#   value = module.load-balance.alb_dns
# }