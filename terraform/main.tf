provider "aws" {
  region = "us-east-1"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}

# Subnet pública 1
resource "aws_subnet" "public_subnet_1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet 1"
  }
}
# Subnet pública 2
resource "aws_subnet" "public_subnet_2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet 2"
  }
}

# Subnet privada
resource "aws_subnet" "private_subnet" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "us-east-1c"
  tags = {
    Name = "Private Subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

# Route Table Pública
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "internet_route" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

# Route Table Privada
resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.main.id
}

resource "aws_nat_gateway" "nat_gateway" {
  allocation_id = aws_eip.nat_gateway.id
  subnet_id     = aws_subnet.public_subnet_1.id
}

# EIP para el NAT Gateway
resource "aws_eip" "nat_gateway" {
  vpc = true
}

# Rutas para la Subnet Privada (apuntando al NAT Gateway)
resource "aws_route" "private_nat_route" {
  route_table_id         = aws_route_table.private_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat_gateway.id
}

# Asocia la tabla de rutas públicas con las subnets públicas
resource "aws_route_table_association" "public_subnet_association_1" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet_association_2" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_route_table.id
}

# Asocia la tabla de rutas privadas con la subnet privada
resource "aws_route_table_association" "private_subnet_association" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_route_table.id
}

# Security Group para EC2 web-server
resource "aws_security_group" "web_server_sg" {
  name        = "web-server-sg"
  description = "Allow access to 3000 and 3001 port"
  vpc_id      = aws_vpc.main.id

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

# EC2 web-server in the private subnet
resource "aws_instance" "web_server" {
  ami           = "ami-01816d07b1128cd2d" 
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.private_subnet.id
  vpc_security_group_ids = [aws_security_group.web_server_sg.id]
  associate_public_ip_address = true

  iam_instance_profile = aws_iam_instance_profile.web_server_profile.id

   # Install git and clone the repository
  user_data = <<-EOF
             #!/bin/bash
              sudo yum update -y
              sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
              sudo yum install nodejs -y
              sudo yum install -y git

              sudo git clone https://github.com/josuejimenez20/maplesyrup.git /usr/bin/maplesyrup
              cd /usr/bin/maplesyrup/backend

              RDS_ENDPOINT=$(echo "${aws_db_instance.default.endpoint}" | cut -d':' -f1)
              sudo rm -f .env
              sudo bash -c "cat > .env <<EOF
              CLOUDINARY_URL=cloudinary://638174394713967:jHto0FeQeH_6qIsZT3Mm7oSUEhQ@dtmtbvid9
              CLOUDINARY_URL_OLD_VERISON=cloudinary://838331763735293:Nyg1z-kj2cjRR34ER-O2lLrshdc@dfcowl76a

              CLOUDINARY_CLOUD_NAME=dtmtbvid9
              CLOUDINARY_API_KEY=638174394713967
              CLOUDINARY_API_SECRET=jHto0FeQeH_6qIsZT3Mm7oSUEhQ

              DATABASE_HOST=$RDS_ENDPOINT
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

  depends_on = [aws_security_group.web_server_sg, aws_db_instance.default]
}

# IAM Role para EC2 web-server
resource "aws_iam_role" "web_server_role" {
  name = "web-server-ssm"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
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

# Security Group para EC2 web-app
resource "aws_security_group" "web_app_sg" {
  name        = "web-app-sg"
  description = "Allow access to port 5173"
  vpc_id      = aws_vpc.main.id

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

# EC2 web-app in the public subnet
resource "aws_instance" "web_app" {
  ami           = "ami-01816d07b1128cd2d" 
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public_subnet_1.id
  vpc_security_group_ids = [aws_security_group.web_app_sg.id]
  associate_public_ip_address = true

  # Install git and clone the repository
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
              VITE_API_ENDPOINT=http://${aws_alb.web-server-alb.dns_name}/api
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
  depends_on = [aws_security_group.web_app_sg, aws_alb.web-server-alb]
}

# VPC Endpoints (Interface)
resource "aws_vpc_endpoint" "ssm" {
  vpc_id          = aws_vpc.main.id
  service_name    = "com.amazonaws.us-east-1.ssm"
  vpc_endpoint_type = "Interface"
  subnet_ids      = [aws_subnet.private_subnet.id]
}

resource "aws_vpc_endpoint" "ssm_messages" {
  vpc_id          = aws_vpc.main.id
  service_name    = "com.amazonaws.us-east-1.ssmmessages"
  vpc_endpoint_type = "Interface"
  subnet_ids      = [aws_subnet.private_subnet.id]
}

resource "aws_vpc_endpoint" "ec2_messages" {
  vpc_id          = aws_vpc.main.id
  service_name    = "com.amazonaws.us-east-1.ec2messages"
  vpc_endpoint_type = "Interface"
  subnet_ids      = [aws_subnet.private_subnet.id]
}

resource "aws_security_group" "db_sg" {
  name_prefix = "db-sg-"
  vpc_id        = aws_vpc.main.id

  ingress {
    from_port   = 3306                 
    to_port     = 3306
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
    Name = "db-security-group"
  }
}

resource "aws_db_subnet_group" "maplesyrup_rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = [
    aws_subnet.public_subnet_1.id,
    aws_subnet.public_subnet_2.id,
  ]

  tags = {
    Name = "RDS Subnet Group"
  }
}

resource "aws_db_instance" "default" {
  identifier             = "maplesyrup-db"
  allocated_storage      = 10
  db_name                = "maplesyrup"
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t3.micro"
  username               = "root"
  password               = "johnwick2003"
  publicly_accessible    = true
  parameter_group_name   = "default.mysql8.0"
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.maplesyrup_rds_subnet_group.name

  tags = {
    Name = "maplesyrup-db"
  }
}

resource "aws_security_group" "alb_sg" {
  name_prefix = "alb-sg-"
  vpc_id      = aws_vpc.main.id

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
  subnets         = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id, aws_subnet.private_subnet.id]
  security_groups = [aws_security_group.alb_sg.id]
}

resource "aws_alb_target_group" "web-server-target-group" {
  name          = "web-server-target-group"
  port          = 3000
  protocol      = "HTTP"
  vpc_id        = aws_vpc.main.id

   health_check {
    enabled       = true
    interval      = 300
    timeout       = 5    
    path          = "/api/health-check" 
    protocol      = "HTTP" 
    port          = "3000"
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
    target_id         = aws_instance.web_server.id
    port              = 3000

    
}



