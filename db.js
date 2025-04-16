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
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          postID INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT NOT NULL,
          username TEXT NOT NULL,
          description TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
            console.log('Error creating posts table:', err.message);
        } else {
            console.log('Posts table ready');
        }
    });


    // Create replies table
    db.run(`
    CREATE TABLE IF NOT EXISTS replies (
      replyID INTEGER PRIMARY KEY AUTOINCREMENT,
      postID INTEGER NOT NULL,
      userId TEXT NOT NULL,
      username TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (postID) REFERENCES posts(postID)
    )
  `, (err) => {
        if (err) {
            console.log('Error creating replies table:', err.message);
        } else {
            console.log('Replies table ready');
        }
    });
}

module.exports = db; 
