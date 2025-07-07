CREATE TABLE mediapass (
    id varchar(200) PRIMARY KEY,
    medianame  VARCHAR(150) NOT NULL,
    password VARCHAR(100) NOT NULL
);



-- Create another table
CREATE TABLE  accountdetail (
    id varchar(200) PRIMARY KEY,
    bankname VARCHAR(100) NOT NULL,
    work VARCHAR(100) NOT NULL,
    password VARCHAR(100) 
);