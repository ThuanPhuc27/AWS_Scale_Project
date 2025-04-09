terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0.0"
    }
  }
}

provider "aws" {
  region = var.region
}

module "networking" {
  source              = "../modules/networking"
  region              = var.region
  availability_zones  = var.availability_zones
  cidr_block          = var.cidr_block
  public_subnet_ips   = var.public_subnet_ips
  private_subnet_ips  = var.private_subnet_ips
}

module "security" {
  source = "../modules/security"

  region = var.region
  vpc_id = module.networking.vpc_id
}

module "frontend" {
  source = "../modules/frontend"
  region = var.region

}

module "bastion" {
  source = "../modules/bastion"
  region = var.region
  subnet_id = module.networking.public_subnet_ids[0]
  instance_type = "t2.micro"
  security_groups = [module.security.bastion_security_group_id]
}

module "database" {
  source   = "../modules/database"
  db_subnet_group_name  = module.networking.db_subnet_group_name
  db_security_group_ids = [module.security.database_security_group_id]
  db_username = var.db_username
  db_password = var.db_password
  db_name  = var.db_name
}

module "autoscaling" {
  source = "./modules/autoscaling"

  ami_id                   = "ami-1234567890"  # Thay bằng AMI phù hợp
  instance_type            = "t3.micro"
  instance_security_group_id = aws_security_group.backend_sg.id
  private_subnet_ids       = var.private_subnet_ids
  target_group_arn         = aws_lb_target_group.backend.arn
  min_size                 = 2
  max_size                 = 5
  desired_capacity         = 2
  db_endpoint              = aws_db_instance.mysql.endpoint
  db_name                  = var.db_name
  db_username              = var.db_username
  db_password              = var.db_password
  key_name                 = "my-key-pair"

  tags = {
    Environment = "production"
    Application = "backend"
  }
}