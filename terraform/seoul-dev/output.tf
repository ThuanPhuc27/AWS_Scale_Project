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
