const express = require('express');
const { MongoClient } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qzbsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
      await client.connect();
      //console.log('db connected');

      const database = client.db('flyAwayDB');
      const tourCollection = database.collection('tourCollection');
      console.log('db connected');

    //   app.post('/services', async(req,res) => {
    //    const service = req.body;
    //    console.log('data posted',service);
       
        //    const result = await tourCollection.insertOne(doc);
        //    console.log(`A document was inserted with the _id: ${result.insertedId}`);
        //    console.log(result);
        //res.json(result);
     // })
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