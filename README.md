# Get started with this backend of the project 

## live url of this backend is 
https://accredian-backend-ljbp.onrender.com

### First Step
```
1. npm install
```

### Define the Schema 
```
-- Create the database
CREATE DATABASE Accredian;

-- Use the newly created database
USE Accredian;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the referrals table without user_id
CREATE TABLE referrals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Create the environment file.
```
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD= 
MYSQL_DATABASE=
```

### Final step 
```
node index.js
```

