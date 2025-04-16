const express = require('express'); //importing express module  
const app = express(); //creating express app isntaance 

const port = 3000; //Defualt port number  

//Middleware to parse JSON bodies inthe request 
app.use(express.json());


//Import the posts routes for /api/posts endpoint 
const postsRoutes = require('./routes/posts');

//Import the replies routes for /api/posts/:postID/replies endpoint 
const repliesRoutes = require('./routes/replies');

//Import the likes routes for /api/likes endpoint
const likesRoutes = require('./routes/likes');

//Use the posts routes for /api/posts endpoint 
app.use('/api/posts', postsRoutes);

//Use the replies routes for /api/replies endpoint 
app.use('/api/replies/', repliesRoutes);

//Use the likes routes for /api/likes endpoint
app.use('/api/likes', likesRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});






