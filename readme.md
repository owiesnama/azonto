# databse:
```
  CREATE DATABASE `videos-platform` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
  CREATE USER 'videos-platform'@'localhost' IDENTIFIED BY 'videos-platform@123';
  GRANT ALL PRIVILEGES ON *.* TO 'videos-platform'@'localhost' WITH GRANT OPTION;
  flush privileges;
```