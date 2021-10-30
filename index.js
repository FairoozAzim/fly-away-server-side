const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qzbsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
      await client.connect();
      //console.log('db connected');

      const database = client.db('flyAwayDB');
      const allTours = database.collection('tourCollection');
      const allBookings = database.collection('bookings')
      console.log('db connected');
      //get API
      app.get('/tourCollection', async(req,res) => {

         const cursor = allTours.find({});
         const tours = await cursor.toArray();
         res.send(tours);
      })
      
      //post API to add tours
      
      app.post('/tourCollection', async(req,res) => {
        const tour = req.body;
        console.log("Post success");
        const result = await allTours.insertOne(tour);
        res.json(result);
    })

    
      //single doc
      app.get('/tourCollection/:id', async(req,res) => {
          const id = req.params.id;
          //console.log('Id found',id);
          const query = {_id: ObjectId(id)};
          const tour = await allTours.findOne(query);
          res.json(tour);
      })

      //post API for bookings
      app.post('/bookings', async(req,res) => {
          const booking = req.body;
          const result = await allBookings.insertOne(booking);
          res.json(result);
      })
      
      //get api to get all the bookings history
      app.get('/bookings', async(req,res) => {
        const cursor = allBookings.find({});
        const booking = await cursor.toArray();
        res.send(booking);
          
      })
      
      //get API to get user specific booking history
      app.get('/bookings/:email', async(req,res) => {
        //   const cursor = allBookings.find({email:email})
        const email = req.params.email;
        //console.log('email found',email);
         const query = {email: email};
         const bookings = await allBookings.find(query).toArray();
         //console.log(bookings);
         res.json(bookings);

      })

      //delete API to delete bookings
     app.delete('/bookings/:id', async(req,res) => {
         const id= req.params.id;
         const query = {_id: ObjectId(id)};
         const result = await allBookings.deleteOne(query);
         console.log(result);
         res.json(result);

     })

    } finally {
      //await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req,res) => {
    res.send('Server Running');
})

app.listen(port, () => {
  console.log('Running on port',port);
})