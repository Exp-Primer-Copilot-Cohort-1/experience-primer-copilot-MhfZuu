//Create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

//Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Create GET request
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Create POST request
app.post('/comments', (req, res) => {
    //Read JSON file
    fs.readFile('comments.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            //Parse JSON file
            obj = JSON.parse(data);
            //Get and add new comment
            obj.comments.push(req.body);
            //Stringify JSON file
            json = JSON.stringify(obj);
            //Write JSON file
            fs.writeFile('comments.json', json, 'utf8', function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    res.send('POST request to the homepage');
});

//Create GET request
app.get('/comments', (req, res) => {
    //Read JSON file
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            //Parse JSON file
            obj = JSON.parse(data);
            //Send JSON file
            res.send(obj);
        }
    });
});

//Listen to port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
