output "rds_endpoint" {
  description = "The endpoint of the MySQL RDS instance"
  value       = aws_db_instance.mysql.endpoint
}

output "rds_port" {
  description = "The port of the MySQL RDS instance"
  value       = aws_db_instance.mysql.port
}

output "rds_db_name" {
  description = "The database name in RDS"
  value       = aws_db_instance.mysql.db_name
}
