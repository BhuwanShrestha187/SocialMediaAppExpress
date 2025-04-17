const express = require('express'); //importing express module  
const app = express(); //creating express app isntaance 

//Middleware to parse JSON bodies inthe request 
app.use(express.json());

//Import the posts routes
const postsRoutes = require('./routes/posts');

//Import the replies routes 
const repliesRoutes = require('./routes/replies');

//Import the likes 
const likesRoutes = require('./routes/likes');

//Use the posts
app.use('/api/posts', postsRoutes);

//Use the replies
app.use('/api/replies/', repliesRoutes);

//Use the likes routes 
app.use('/api/likes', likesRoutes);


// Only start the server if this file is run directly
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


// Export the app for testing
module.exports = app;




