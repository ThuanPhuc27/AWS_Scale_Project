#!/bin/bash
# Install dependencies
apt-get update
apt-get install -y docker.io

# Start Docker service
systemctl start docker
systemctl enable docker

# Login to ECR (if using ECR)
aws ecr get-login-password --region ${aws_region} | docker login --username AWS --password-stdin ${ecr_repo}

# Pull and run container
docker run -d \
  -p 5000:5000 \
  -e DB_HOST=${db_host} \
  -e DB_NAME=${db_name} \
  -e DB_USER=${db_username} \
  -e DB_PASS=${db_password} \
  ${ecr_repo}:latest