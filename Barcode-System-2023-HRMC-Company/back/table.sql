use barcode_db;

CREATE TABLE user (
  oid INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  joindate DATE NOT NULL,
  role varchar(255),
  createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (oid)
);

insert into
  user( name,
    username,
    password,
    mobile,
    Address,
    city,
    dob,
    role,
    joindate
  )
values
  (
    'ADMIN ',
    'ADMIN@gmail.com',
    '123',
    '0987654321',
    'shirdi',
    'pune',
    '1999-09-24',
    'admin',
    '2023-05-17'
  );

CREATE TABLE customer (
  C_ID INT NOT NULL,
  CUSTOMER_NAME VARCHAR(255),
  MOBILE_NUMBER VARCHAR(20),
  EMAIL VARCHAR(255),
  CITY VARCHAR(100),
  PRIMARY KEY (C_ID)
);

CREATE TABLE supervisor (
  cardNo int NOT NULL AUTO_INCREMENT,
  partNo varchar(30),
  barcode varchar(100),
  cid varchar(30),
  custName VARCHAR(100),
  city varchar(100),
  itemName varchar(100),
  itemDesc VARCHAR(200),
  batchCode VARCHAR(20),
  batchWeighed varchar(20),
  batchMadeBy VARCHAR(50),
  mouldingQty int (50),
  modulingDate datetime,
  boxQty int(10),
  moulderName VARCHAR(50),
  shift varchar(30),
  mcNo VARCHAR(200),
  operatorId varchar(20),
  inspectorId varchar(20),
  inspectorName VARCHAR(50),
  inspectedQty varchar(30),
  inspectorRejectedQty varchar(30),
  inspectedDate varchar(30),
  inspectorStartDate varchar(30),
  inspectorEndDate varchar(30),
  rejectorId VARCHAR(20),
  rejectorName VARCHAR(50),
  oid INT,
  otsDate varchar(30),
  totalRejectedQty varchar(30),
  totalOkQty varchar(30),
  totalSortedQty varchar(30),
  finishingQty varchar(30),
  RejectorSubmitDate varchar(30),
  RejectorRemark varchar(50),
  RejectorReson varchar(50),
  RejectorStartTime varchar(30),
  RejectorEndTime varchar(30),
  isChecked boolean,
  primary key (cardNo)
);

ALTER TABLE supervisor ADD isChecked boolean;

CREATE TABLE barcode (
  id int NOT NULL AUTO_INCREMENT,
  barcode varchar(100),
  cardNo varchar(300),
  oid VARCHAR(200),
  status VARCHAR(30),
  SCAN_DATE VARCHAR(30),
  primary key (id)
);

CREATE TABLE Item (
  ITEM_NO INT,
  primary key(ITEM_NO),
  ITEM_NAME VARCHAR(255),
  ITEM_DESCRIPTION VARCHAR(255),
  BOX_QTY INT,
  CUSTOMER_NAME VARCHAR(30)
);

CREATE TABLE batchCode(
  ID int NOT NULL AUTO_INCREMENT,
  BATCH_CODE varchar(30),
  primary key (ID)
);