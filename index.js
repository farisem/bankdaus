const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://FARIS:Nyas1811@atlascluster.2hyuslj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/*app.patch('/profile', (req, res) => {
  client.db("WEEK4").collection("users").updateOne({
    "username": req.body.username
  }, {
    $set: {
      "email": req.body.email,
      "age": req.body.age,
    },
  }).then((result) => {
    res.send('Profile Updated')
  })
})*/
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const hash = bcrypt.hashSync(password, 10);
  client.db("WEEK4").collection("users")
    .insertOne({"username": username, "password": hash})
    res.send("Register Successful")
    console.log(hash);
})
    
  //client.db("WEEK4").collection("users").find({
  //  "username":{$eq:req.body.username}  
 // }).toArray().then (( result) =>{
   // if (result.length > 0){
  //    res.status(400).send('Username already exists')
  //  } 
  //  else {
   //   client.db("WEEK4").collection("users").insertOne({
   //     "username": req.body.username,
   //     "password": req.body.password
   //   })
   //   res.send('Register Succesfully')
   // }
 // })

 // client.db("WEEK4").collection("users").insertOne({
    // "username": req.body.username,
    // "password": req.body.password
  // })
  // res.send('Register Succesfully')
// })

/*app.post('/login', (req, res) => {
  console.log(req.body)
  res.send('Login Succesful')
})*/

//
//})