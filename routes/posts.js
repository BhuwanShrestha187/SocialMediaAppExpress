/*
    This file will contain the routes for the posts. In my design, the mainc content of the post will be: 
    - postID
    - postName 
    - description
    - timestamp 

    Router in express is used to create routes and then wee need to export the router so that we can use it in the app.js file. 
    This ensures that the routes can be defined in a separate file and then imported into the app.js file. 

    1. AT first I used the array to store the post information which was quite easy to implement.  
    2. Now I am using the database to store the post information.  
*/

//Import express and router 
const express = require('express');
const router = express.Router();  //We need router basically to create routes and then we need to export the router  
const db = require('../db'); //Importing the database connection   

// //To store the posts, for now I am just using an array to store the post information
// let posts = [];

// //POST route to create a new post 
// router.post('/', (req, res) => {
//     const { postName, description } = req.body;

//     //We need to validate the required fields  
//     if (!postName || !description) {
//         return res.status(400).json({ error: 'Post name and description are required' }); //Status 400 is used to indicate that the request is bad 
//     }

//     //Then if the required fields are present, we need to create a new post  
//     //At first postID  
//     const postID = posts.length + 1; //Increase the ID with 1 for each post 

//     //Create the timestamp when the post was created 
//     const timestamp = new Date().toISOString();

//     //Then only create the post object 
//     const newPost = {
//         postID,
//         postName,
//         description,
//         timestamp
//     };

//     //Now store  the post in the array 
//     posts.push(newPost);

//     //Then Respond so that the client can get the post details  
//     res.status(201).json(newPost); //Status 201 is used to indicate that the resource has been created 

// });



//Since we are using the database to store the posts, we need to change the routes and implement async await.   
router.post('/', async (req, res) => {
    const { postName, description, userId, username } = req.body; //Definately this needs to be passed in the request body!! 

    //Check if the required fields are sent in the request of not 
    if (!postName || !description || !userId || !username) {
        return res.status(400).json({ error: 'Post name and description with userID and username must be providfed!!!!' });
    }

    else {
        //Insert the post into the database. 
        const timestamp = new Date().toISOString();  //Extract the current timestamp  
        const query = 'INSERT INTO posts (postName, description, timestamp, userId, username) VALUES (?, ?, ?, ?, ?)'; //? means that the values are not known yet.  

        //Fow async and await, we need to use Promise as it lets us handle the asynchronous operations.   
        const newPost = await new Promise((resolve, reject) => {
            db.run(query, [postName, description, timestamp, userId, username], function (err) {
                if (err) {
                    reject(err); //Means tell the promnise that operation failed!! 
                }
                else {
                    resolve({
                        postID: this.lastID, //the new ID of the post. lastID means the last ID of the post that was inserted. 
                        postName,
                        description,
                        timestamp,
                        userId,
                        username
                    }); //This tells the promise that the operation was successful and the new post was created. 
                }
            });
        });

        //Now send back the new post back to the client so he doesnot get confused that the post was created ir not. 
        return res.status(201).json(newPost);
    }
});



//Get route to get all the posts 
router.get('/', async (req, res) => {
    //Retriuve allthe posts from the database
    const posts = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM posts', (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        })
    });

    res.json(posts);

    if (!posts) {
        return res.status(404).json({ error: 'No posts found' });
    }
});

//Export the router so that it can be used in the app.js file 
module.exports = router;

