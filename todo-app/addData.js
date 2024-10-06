/* eslint-disable no-unused-vars */
const { Client } = require("pg");

const client = new Client({
  user: "ayush_postgresql_user",
  host: "dpg-cs15al8gph6c73agq4og-a",
  database: "ayush_postgresql",
  password: "53qcpifx9uyjHGf4PbOC89Y4ZMxoLNup",
  port: 5432, // Default PostgreSQL port
});

client.connect();

client.query(
  "INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com')",
  (err, res) => {
    if (err) {
      console.error("Error inserting data:", err);
    } else {
      console.log("Data inserted successfully");
    }
    client.end();
  }
);
