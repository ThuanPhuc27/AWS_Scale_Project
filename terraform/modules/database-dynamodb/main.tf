provider "aws" {
  region = var.region
}

# DynamoDB Table
resource "aws_dynamodb_table" "task_table" {
  name           = "task-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "task_id"
  attribute {
    name = "task_id"
    type = "S"
  }

  attribute {
    name = "task_name"
    type = "S"
  }

  # Optionally add a range key or other attributes depending on your use case
}

# Secret for MongoDB Password
resource "random_password" "secret_password" {
  length  = 16
  special = false
}

resource "aws_secretsmanager_secret" "mongodb_password_secret" {
  name = "mongo_password1"
}

resource "aws_secretsmanager_secret_version" "mongodb_password_secret_version" {
  secret_id     = aws_secretsmanager_secret.mongodb_password_secret.id
  secret_string = random_password.secret_password.result
}

# Create a secret for DynamoDB connection string
resource "aws_secretsmanager_secret" "dynamodb_connection_string" {
  name = "dynamodb_connection_string"
}

resource "aws_secretsmanager_secret_version" "dynamodb_connection_string_version" {
  secret_id     = aws_secretsmanager_secret.dynamodb_connection_string.id
  secret_string = jsonencode({
    aws_access_key     = var.aws_access_key
    aws_secret_key     = var.aws_secret_key
    dynamodb_table_name = aws_dynamodb_table.task_table.name
    region             = var.region
  })
}

# Outputs
output "dynamodb_connection_string" {
  value = aws_secretsmanager_secret_version.dynamodb_connection_string_version.secret_string
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.task_table.name
}
