provider "aws" {
  region = var.region
}

resource "aws_key_pair" "keypair" {
  key_name   = "keypair"
  public_key = file("${path.module}/keypair/id_rsa.pub")
}

resource "aws_instance" "backend-instance" {
  ami           = var.amis[var.region]
  instance_type = var.instance_type
  key_name      = aws_key_pair.keypair.key_name
  tags = {
    Name = "backend"
  }
  vpc_security_group_ids = var.security_groups
  subnet_id = var.subnet_id
  associate_public_ip_address = false

  #Userdata to install Mongo Client
  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    db_host     = var.db_endpoint
    db_name     = var.db_name
    db_username = var.db_username
    db_password = var.db_password
  }))
}
