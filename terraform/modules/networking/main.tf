module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "aws-scale-project"
  cidr = var.cidr_block

  azs             = var.availability_zones
  public_subnets  = var.public_subnet_ips
  private_subnets = var.private_subnet_ips
  map_public_ip_on_launch = true

  enable_nat_gateway = true
  enable_vpn_gateway = false
  single_nat_gateway = true
  tags = {
    Name = "aws-scale-project"
  }
}

resource "aws_db_subnet_group" "mysql_subnet_group" {
  name       = "mysql-subnet-group"
  subnet_ids = module.vpc.private_subnets
}
