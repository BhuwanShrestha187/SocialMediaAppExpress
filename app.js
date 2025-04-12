

const express = require('express'); //importing express module  
const app = express(); //creating express app isntaance 

const port = 3000; //Defualt port number  

//Middleware to parse JSON bodies inthe request 
app.use(express.json());


//Basic route for POST 
app.post('/api/post', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    res.json({ message: 'Post created successfully', name });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});






