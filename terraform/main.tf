provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "public_subnet_1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet 1"
  }
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet 2"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "us-east-1c"
  tags = {
    Name = "Private Subnet"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "internet_route" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.main.id
}

resource "aws_nat_gateway" "nat_gateway" {
  allocation_id = aws_eip.nat_gateway.id
  subnet_id     = aws_subnet.public_subnet_1.id
}

resource "aws_eip" "nat_gateway" {
  depends_on = [aws_vpc.main]
}

resource "aws_route" "private_nat_route" {
  route_table_id         = aws_route_table.private_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat_gateway.id
}

resource "aws_route_table_association" "public_subnet_association_1" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet_association_2" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "private_subnet_association" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_route_table.id
}


module "web-server-module" {
  source = "./web-server/"

  vpc_id                  = aws_vpc.main.id
  db_instance_endpoint    = aws_db_instance.default.endpoint
  private_subnet_id  = aws_subnet.private_subnet.id
  public_subnet_1_id = aws_subnet.public_subnet_1.id
  public_subnet_2_id = aws_subnet.public_subnet_2.id
  
}

module "web-app-module" {
  source = "./web-app"
  public_subnet_1_id      = aws_subnet.public_subnet_1.id
  vpc_id                  = aws_vpc.main.id
  alb-web-server-dns-name = module.web-server-module.alb-web-server-dns-name
  web-server-alb          = module.web-server-module.web-server-alb  
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

