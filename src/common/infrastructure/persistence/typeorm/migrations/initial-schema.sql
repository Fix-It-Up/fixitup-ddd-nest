CREATE TABLE IF NOT EXISTS customers (
  id bigint UNSIGNED  NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(15) NOT NULL,
  car_make varchar(20) NOT NULL,
  PRIMARY KEY(id)) 
  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS mechanics (
  id bigint UNSIGNED  NOT NULL AUTO_INCREMENT,
  mechanic_name varchar(100) NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(15) NOT NULL,
  address varchar(20) NOT NULL,
  description varchar(200) NOT NULL,
  PRIMARY KEY(id))
  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS appointments (
  id bigint UNSIGNED  NOT NULL AUTO_INCREMENT,
  customer_id bigint NOT NULL,
  mechanic_id bigint NOT NULL,
  status varchar(50) NOT NULL,
  type varchar(50) NOT NULL,
  date varchar(200) NOT NULL,
  amount decimal(19,4) NOT NULL,
  PRIMARY KEY(id))
  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;