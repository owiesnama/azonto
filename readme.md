#databse:
CREATE DATABASE `edms` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
CREATE USER 'edms'@'localhost' IDENTIFIED BY 'edms@123';
GRANT ALL PRIVILEGES ON *.* TO 'edms'@'localhost' WITH GRANT OPTION;
flush privileges;

#safe update
SET SQL_SAFE_UPDATES = 0;
