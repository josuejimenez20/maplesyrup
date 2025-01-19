output "web-server_id" {
  value = aws_instance.web-server.id
}

output "alb-web-server-dns-name" {
  value = aws_alb.web-server-alb.dns_name
}

output "web-server-alb" {
  value = aws_alb.web-server-alb
}
