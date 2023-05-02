import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database:"operator_210101027"
})

export default db;

