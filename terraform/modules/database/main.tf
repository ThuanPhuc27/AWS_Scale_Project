resource "aws_db_instance" "mysql" {
  identifier              = "mysql-db"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t3.micro"
  allocated_storage       = 5
  storage_type            = "gp2"
  username                = var.db_username
  password                = var.db_password
  db_name                 = var.db_name
  parameter_group_name    = "default.mysql8.0"
  skip_final_snapshot     = true
  publicly_accessible     = false
  multi_az                = false
  vpc_security_group_ids  = var.db_security_group_ids
  db_subnet_group_name    = var.db_subnet_group_name

  tags = {
    Name = "mysql-db"
  }
}