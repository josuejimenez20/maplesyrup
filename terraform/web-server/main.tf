  resource "aws_instance" "web-server" {
  ami                         = "ami-01816d07b1128cd2d" 
  instance_type               = "t2.micro"
  subnet_id                   = var.private_subnet_id
  vpc_security_group_ids      = [aws_security_group.web_server_sg.id]
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.web_server_profile.id

  user_data = <<-EOF
             #!/bin/bash
              sudo yum update -y
              sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
              sudo yum install nodejs -y
              sudo yum install -y git

              sudo git clone https://github.com/josuejimenez20/maplesyrup.git /usr/bin/maplesyrup
              cd /usr/bin/maplesyrup/backend

              RDS_ENDPOINT="${var.db_instance_endpoint}"
              sudo rm -f .env
              sudo bash -c "cat > .env <<EOF
              CLOUDINARY_URL=cloudinary://638174394713967:jHto0FeQeH_6qIsZT3Mm7oSUEhQ@dtmtbvid9
              CLOUDINARY_URL_OLD_VERISON=cloudinary://838331763735293:Nyg1z-kj2cjRR34ER-O2lLrshdc@dfcowl76a

              CLOUDINARY_CLOUD_NAME=dtmtbvid9
              CLOUDINARY_API_KEY=638174394713967
              CLOUDINARY_API_SECRET=jHto0FeQeH_6qIsZT3Mm7oSUEhQ

              DATABASE_HOST=$(echo "$RDS_ENDPOINT" | cut -d ':' -f 1)
              DATABASE_NAME=maplesyrup
              DATABASE_USER=root
              DATABASE_PASSWORD=johnwick2003
              EOF"

              sudo npm install
              sudo npm install -g pm2

              sudo pm2 start /usr/bin/maplesyrup/backend/app.js --name maplesyrup
              sudo pm2 save

              pm2 startup systemd -u root --hp /root
EOF

  tags = {
    Name = "web-server"
  }

  depends_on = []
}

resource "aws_iam_role" "web_server_role" {
  name = "web-server-ssm"

  assume_role_policy = jsonencode({
    Version     = "2012-10-17"
    Statement   = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

# Attach policy AmazonSSMManagedInstanceCore
resource "aws_iam_role_policy_attachment" "web_server_ssm_policy" {
  role       = aws_iam_role.web_server_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# IAM Instance Profile
resource "aws_iam_instance_profile" "web_server_profile" {
  name = "web-server-instance-profile"
  role = aws_iam_role.web_server_role.name
}

resource "aws_security_group" "web_server_sg" {
  name        = "web-server-sg"
  description = "Allow access to 3000 and 3001 port"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "alb_sg" {
  name_prefix = "alb-sg-"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ALB Security Group"
  }
}

resource "aws_alb" "web-server-alb" {
  subnets         = [var.public_subnet_1_id, var.public_subnet_2_id, var.private_subnet_id]
  security_groups = [aws_security_group.alb_sg.id]

  depends_on = [aws_instance.web-server, aws_alb_target_group.web-server-target-group]
}

resource "aws_alb_target_group" "web-server-target-group" {
  name     = "web-server-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    enabled             = true
    interval            = 30
    timeout             = 5
    path                = "/api/health-check"
    protocol            = "HTTP"
    unhealthy_threshold = 3
  }
}

resource "aws_alb_listener" "my-listener" {
  load_balancer_arn = aws_alb.web-server-alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.web-server-target-group.arn
  }
}

resource "aws_lb_target_group_attachment" "tg_attachment" {
    target_group_arn = aws_alb_target_group.web-server-target-group.arn
    target_id        = aws_instance.web-server.id
    port             = 3000  

    depends_on       = [aws_instance.web-server]
}

resource "aws_s3_bucket" "key_storage" {
  bucket = "my-key-pair-storage-bucket"
  acl    = "private"

  versioning {
    enabled = true
  }

  # server_side_encryption_configuration {
  #   rule {
  #     apply_server_side_encryption_by_default {
  #       sse_algorithm = "AES256"
  #     }
  #   }
  # }

  tags = {
    Name = "Key Pair Storage"
  }
}

# Generar la clave privada y pública con Terraform
resource "tls_private_key" "frontend-key-pair" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Crear una Key Pair en AWS usando la clave pública
resource "aws_key_pair" "frontend-key-pair" {
  key_name   = "frontend-key-pair"
  public_key = tls_private_key.frontend-key-pair.public_key_openssh
}

# Subir la clave privada al bucket S3
resource "aws_s3_object" "private_key" {
  bucket       = aws_s3_bucket.key_storage.id
  key          = "keys/frontend-key-pair.pem"
  content      = tls_private_key.frontend-key-pair.private_key_pem
  content_type = "text/plain"

  server_side_encryption = "AES256"
}

output "private_key_s3_path" {
  value = "s3://${aws_s3_bucket.key_storage.bucket}/keys/frontend-key-pair.pem"
  sensitive = true
}