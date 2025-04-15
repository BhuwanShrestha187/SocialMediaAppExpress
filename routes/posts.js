/*
    This file will contain the routes for the posts. In my design, the mainc content of the post will be: 
    - postID
    - postName 
    - description
    - timestamp 

    Router in express is used to create routes and then wee need to export the router so that we can use it in the app.js file. 
    This ensures that the routes can be defined in a separate file and then imported into the app.js file. 
*/

//Import express and router 
const express = require('express');
const router = express.Router();  //We need router basically to create routes and then we need to export the router  

//To store the posts, for now I am just using an array 
let posts = [];

//POST route to create a new post 
router.post('/', (req, res) => {
    const { postName, description } = req.body;

    //We need to validate the required fields  
    if (!postName || !description) {
        return res.status(400).json({ error: 'Post name and description are required' }); //Status 400 is used to indicate that the request is bad 
    }

    //Then if the required fields are present, we need to create a new post  
    //At first postID  
    const postID = posts.length + 1; //Increase the ID with 1 for each post 

    //Create the timestamp when the post was created 
    const timestamp = new Date().toISOString();

    //Then only create the post object 
    const newPost = {
        postID,
        postName,
        description,
        timestamp
    };

    //Now store  the post in the array 
    posts.push(newPost);

    //Then Respond so that the client can get the post details  
    res.status(201).json(newPost); //Status 201 is used to indicate that the resource has been created 

});


//Get route to get all the posts 
router.get('/', (req, res) => {
    res.json(posts);
});

//Export the router so that it can be used in the app.js file 
module.exports = router;

