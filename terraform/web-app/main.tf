resource "aws_instance" "web_app" {
  ami           = "ami-01816d07b1128cd2d" 
  instance_type = "t2.micro"
  subnet_id     = var.public_subnet_1_id
  vpc_security_group_ids = [aws_security_group.web_app_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
              sudo yum install nodejs -y
              sudo npm install --global yarn
              sudo yum install -y git
              sudo git clone https://github.com/josuejimenez20/maplesyrup.git /home/ec2-user/maplesyrup
              
              cd /home/ec2-user/maplesyrup/frontend
              sudo rm -f /home/ec2-user/maplesyrup/frontend/.env
              cd /home/ec2-user/maplesyrup/frontend
              sudo bash -c "cat > .env <<EOF
              VITE_API_ENDPOINT=http://${var.alb-web-server-dns-name}/api
              EOF"

              cd /home/ec2-user/maplesyrup/frontend
              sudo yarn install

              sudo npm install -g pm2

              sudo pm2 start "yarn dev --host --port 5173" --name react-dev

              sudo pm2 save

              pm2 startup systemd -u root --hp /root
EOF

  tags = {
    Name = "web-app"
  }
  depends_on = [aws_security_group.web_app_sg, var.web-server-alb]
}

resource "aws_security_group" "web_app_sg" {
  name        = "web-app-sg"
  description = "Allow access to port 5173"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22                 
    to_port     = 22
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