provider "aws" {
  region = var.region
}

resource "aws_key_pair" "keypair" {
  key_name   = "keypair"
  public_key = file("${path.module}/keypair/id_rsa.pub")
}

resource "aws_instance" "bastion-instance" {
  ami           = var.amis[var.region]
  instance_type = var.instance_type
  key_name      = aws_key_pair.keypair.key_name
  tags = {
    Name = "bastion"
  }
  vpc_security_group_ids = var.security_groups
  subnet_id = var.subnet_id
  associate_public_ip_address = true

  #Userdata to install Mongo Client
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt install mysql-client-core-8.0
              EOF
}

resource "aws_eip" "demo-eip" {
  instance = aws_instance.bastion-instance.id
}