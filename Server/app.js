const express = require("express");
const mysql2 = require("mysql2");
const app = express();
const bodyparser = require("body-parser");

const cors = require("cors");

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

const corsOption = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOption));
const connection = mysql2.createConnection({
  host: "localhost",
  user: "apple",
  password: "biniam",
  database: "apple",
});

connection.connect((err) => {
  if (err) console.log(err);
  console.log("Connected to MySQL");
});

app.get("/install", (req, res) => {
  let message = "Tables Created";
  let createProducts = `CREATE TABLE if not exists Products(
      product_id int auto_increment,
      product_url varchar(255) not null,
      product_name varchar(255) not null,
      PRIMARY KEY (product_id)
  )`;
  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,    
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;

  // let createUsers = `CREATE TABLE if not exists User(
  //   user_id int auto_increment,
  //   User_name varchar(255) not null,
  //  User_password varchar(255) not null,
  //   PRIMARY KEY (user_id)

  // )`;
  // let createOrders = `CREATE TABLE if not exists Orders(
  //   order_id int auto_increment,
  //   product_id int(11) not null,
  //   user_id int(11) not null,
  //   FOREIGN KEY (product_id) REFERENCES Products(product_id),
  //   FOREIGN KEY (user_id) REFERENCES User(user_id),
  //   PRIMARY KEY (order_id)

  // )`;
  connection.query(createProducts, (err, results, fields) => {
    if (err) console.log(err);
  });
  connection.query(createProductDescription, (err, results, fields) => {
    if (err) console.log(err);
  });
  connection.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(err);
  });
  // connection.query(createUsers, (err, results, fields) => {
  //   if (err) console.log(err);
  // });
  // connection.query(createOrders, (err, results, fields) => {
  //   if (err) console.log(err);
  // });
  res.end(message);
});

app.post("/add-product", (req, res) => {
  const {
    url,
    name,
    brief_description,
    description,
    img,
    link,
    Sprice,
    priceR,
    // username,
    // uPassword,
  } = req.body; // Extracting the values sent from the frontend

  let insertProducts = `INSERT INTO Products (product_url,product_name) VALUES (?,?)`;
  let insertBriefDescription = `INSERT INTO ProductDescription (product_id,  product_brief_description,product_description,product_img,product_link ) VALUES (?, ?,?,?,?)`;
  let insertPrice = `INSERT INTO ProductPrice ( product_id , starting_price,price_range) VALUES (?, ?,?)`;
  // let insertUser = `INSERT INTO User (User_name,User_password) VALUES (?, ?)`;
  // let insertOrder = `INSERT INTO Orders ( product_id,user_id) VALUES (?, ?)`;
  let id = 0;
  // Executing the query we wrote above
  connection.query(insertProducts, [url, name], (err, results, fields) => {
    if (err) console.log(`Error Found: ${err.message}`);
    console.log(results);

    id = results.insertId;
    // console.log("id from customers table to be used as a foreign key on the other tables>>> ", id)

    connection.query(
      insertBriefDescription,
      [id, brief_description, description, img, link],
      (err, results, fields) => {
        if (err) console.log(`Error Found: ${err.message}`);
      }
    );

    connection.query(
      insertPrice,
      [id, Sprice, priceR],
      (err, results, fields) => {
        if (err) console.log(`Error Found: ${err}`);
      }
    );

    // connection.query(
    //   insertUser,
    //   [username, uPassword],
    //   (err, results, fields) => {
    //     if (err) console.log(`Error Found: ${err}`);
    //     let idd = results.insertId;

    //     connection.query(insertOrder, [id, idd], (err, results, fields) => {
    //       if (err) console.log(`Error Found: ${err}`);
    //     });
    //   }
    // );
  });
  console.log(id);

  res.end("Data inserted successfully!");
  console.log("Data inserted successfully!");
});

app.get("/products", (req, res) => {
  connection.query(
    "SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id ",
    (err, results, fields) => {
      if (err) console.log("Error During selection", err);
      // console.log(results);
      res.send(results);
    }
  );
});

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
