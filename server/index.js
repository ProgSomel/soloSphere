const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
//! middleWire
app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzik2b9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const jobsCollection = client.db("soloSphere").collection("jobs");
    const bidsCollection = client.db("soloSphere").collection("bids");

    //! JWT
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    //! clear token on logout
    app.get("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });

    //! Get All Jobs Data
    app.get("/jobs", async (req, res) => {
      const result = await jobsCollection.find().toArray();
      res.send(result);
    });

    //! Get All Jobs of Specific user
    app.get("/jobsByBuyer/:email", async (req, res) => {
      const email = req.params.email;
      const result = await jobsCollection
        .find({ "buyer.email": email })
        .toArray();
      res.send(result);
    });

    //! Get a single job data from db using job id
    app.get("/jobById/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    //! Update a Job in DB
    app.put("/jobUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const jobData = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };
      const result = await jobsCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    //! Save a job in Database
    app.post("/job", async (req, res) => {
      const jobData = req.body;

      const result = await jobsCollection.insertOne(jobData);
      res.send(result);
    });

    //! Delete a Job From DB
    app.delete("/jobs/deleteAJob/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });

    //! bid Collection
    //! Get bids from db for user
    app.get("/bids/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    //! Get Bids from bid from DB for bid owner
    app.get("/bid-requests/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "buyer.email": email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    //! Update bid status
    app.patch("/updateBidStatus/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body;

      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { ...status },
      };
      const result = await bidsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    //! Save bid Data to database
    app.post("/bid", async (req, res) => {
      const bidData = req.body;

      const result = await bidsCollection.insertOne(bidData);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Welcome to Solo Spehere Server");
});

app.listen(port, async (req, res) => {
  console.log(`Server is running at ${port}`);
});
