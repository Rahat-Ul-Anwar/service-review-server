const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());



 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yagkdpa.mongodb.net/?retryWrites=true&w=majority`;
 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const serviceCollection = client.db('serviceReview').collection('services');

        app.get('/services', async (req, res) => {
            
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        

    }
   finally{} 

}

run().catch(error => console.error('error'));




app.get('/', (req, res) => {
    
    res.send('service review server is running');

})


app.listen(port, () => {
    console.log('service review server is running on port', port);
})




