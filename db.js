/* 
This file will help to setup the database connection. 

*/

const sqlite3 = require('sqlite3').verbose(); //need to install sqlite3 module and verbose is used to get the error messages 
const db = new sqlite3.Database('posts.db'); //Posts.db will be the name of the database that will be created in the root directory  

if (!db) {
    console.log("Database creation failed!!!", err.message);
}
else {
    console.log("Database created and connected successfully");
    //Now if the database is connected then, creating the required table in the database. 

    //In sqlite3, db.run() is used to execute the sql queries.  
    db.run(' CREATE TABLE IF NOT EXISTS posts ( postID INTEGER PRIMARY KEY AUTOINCREMENT, postName TEXT NOT NULL, description TEXT NOT NULL,timestamp TEXT DEFAULT CURRENT_TIMESTAMP)');

}

module.exports = db; 
