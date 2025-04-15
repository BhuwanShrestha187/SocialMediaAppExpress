

const express = require('express'); //importing express module  
const app = express(); //creating express app isntaance 

const port = 3000; //Defualt port number  

//Middleware to parse JSON bodies inthe request 
app.use(express.json());


//Import the posts routes for /api/posts endpoint 
const postsRoutes = require('./routes/posts');

//Use the posts routes for /api/posts endpoint 
app.use('/api/posts', postsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});






