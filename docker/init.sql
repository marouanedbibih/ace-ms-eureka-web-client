-- Create the databases if they do not already exist
CREATE DATABASE IF NOT EXISTS clients_db;
CREATE DATABASE IF NOT EXISTS cars_db;

-- Create the user if it does not already exist and set the password
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';

-- Grant all privileges on the databases to the user
GRANT ALL PRIVILEGES ON clients_db.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON cars_db.* TO 'user'@'%';

-- Apply the privilege changes
FLUSH PRIVILEGES;
