# Outputs
output "s3_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}

output "website_url" {
  value = "http://${aws_s3_bucket.frontend.bucket}.s3-website-${var.region}.amazonaws.com"
}