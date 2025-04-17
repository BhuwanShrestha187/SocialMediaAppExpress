const express = require('express'); //importing express module  
const app = express(); //creating express app isntaance 

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

// Export the app for testing
module.exports = app;

// Only start the server if this file is run directly
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});






