//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from "cors";
//import customJsonParser from 'custom-json-parser';



//app config

const app = express();
const port = process.env.PORT || 8000;


const pusher = new Pusher({
    appId: "1583058",
    key: "fca747566048089f1313",
    secret: "7a088a9e5e0455de79a7",
    cluster: "ap2",
    useTLS: true
});



//const port = newLocal;
//middleware
app.use(express.json());
app.use(cors());





//db config
const connection_url = 
    "mongodb+srv://anupam:frYhG9qTqJq9jgn6@cluster.24k4rzd.mongodb.net/?retryWrites=true&w=majority";
//frYhG9qTqJq9jgn6


//const url = process.env.MONGODB_url;
/*

//old method to connect database

mongoose.connect(connection_url, 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
*/

//const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));


const db = mongoose.connection

db.once('open',()=> {
    console.log('DBconnected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change)=>{
        console.log("A change occured",change);

        
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted",
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestanp: messageDetails.timestanp,
                    received: messageDetails.received,
                }
            );    
        } else {
            console.log('Error triggering pusher')
        } 
    })
})

/*
"message": "hello world",
    "name": "Anupam",
    "timestamp": "hallo new",
    "received": false
*/
//???????


//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get('/messages/sync', (req, res) => {

    Messages.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });

})


// This is the old method

/*app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})*/

//this is the new method

app.post('/messages/new', async (req, res) => {
    try {
        const dbMessage = req.body;
        const data = await Messages.create(dbMessage);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});


//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));

