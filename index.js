require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
//

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://engrsakib-lost-finds.surge.sh"], // Replace with your React app's URL
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// coockis middleware
const logger = (req, res, next) => {
  next();
};
const veryfyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  // console.log(token)
  if (!token) {
    return res.status(401).send({ massage: "Unauthorize token" });
  }
  jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
    if (err) {
      return res.status(401).send({ massage: "unauthorize access" });
    }
    req.decoded = decoded;
    next();
  });
};
// mongoDB server cannected

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.vnqi1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    // database filed create
    const lostFindCallection = client.db("lostAndFind").collection("users");

    // user related query
    // get users
    app.get("/users/:mail", async (req, res) => {
      const email = req.params.mail;
      //   console.log(email);
      const cursor = lostFindCallection.find().filter({ mail: email });
      //   console.log(cursor);
      const result = await cursor.toArray();
      res.send(result);
      //   console.log(result);
    });

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SEC, { expiresIn: "1h" });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      try {
        res
          .clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (error) {
        console.log(error);
      }
    });
    // user added in database
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      // console.log(newUser);
      const result = await lostFindCallection.insertOne(newUser);
      res.send(result);
    });

    // donation related work
    const LostCalection = client.db("lostAndFind").collection("lostFindItems");
    // insert database
    app.post("/lostandfinds", async (req, res) => {
      const newlostandfinds = req.body;
      const result = await LostCalection.insertOne(newlostandfinds);
      res.send(result);
    });

    // update database
    app.put("/lostandfinds/:id", async (req, res) => {
      const id = req.params.id; // Extract ID from request parameters
      const recoveryData = req.body; // Get data from the request body

      try {
        // Update the document in the collection
        const result = await LostCalection.updateOne(
          { _id: new ObjectId(id) }, // Match by document ID
          { $set: recoveryData } // Set updated data
        );

        if (result.modifiedCount === 1) {
          res.send({
            success: true,
            message: "Recovery data updated successfully",
          });
        } else {
          res.send({
            success: false,
            message: "No matching item found to update",
          });
        }
      } catch (error) {
        console.error("Error updating recovery data:", error);
        res
          .status(500)
          .send({ success: false, message: "Failed to update recovery data" });
      }
    });

    // get database
    app.get("/lostandfinds", async (req, res) => {
      const cursor = LostCalection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // search
    app.get("/lostandfinds/search/:search", async (req, res) => {
      const search = req.params.search;

      try {
        const result = await LostCalection.find({
          title: { $regex: search, $options: "i" },
        }).toArray();

        res.send(result);
      } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).send({ error: "Failed to fetch search results" });
      }
    });

    // ascending sort
    app.get("/lostandfinds/sorted", async (req, res) => {
      try {
        // Sorting by dateLost in ascending order
        const result = await LostCalection.find()
          .sort({ dateLost: -1 })
          .toArray();
        // console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error while sorting by dateLost:", error);
        res.status(500).send({ message: "Failed to fetch sorted data" });
      }
    });

    app.get("/lostandfinds/sort", async (req, res) => {
      try {
        // Sorting by dateLost in ascending order
        const result = await LostCalection.find()
          .sort({ dateLost: -1 })
          .limit(6)
          .toArray();
        // console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error while sorting by dateLost:", error);
        res.status(500).send({ message: "Failed to fetch sorted data" });
      }
    });

    // sort by date and time

    // const { ObjectId } = require("mongodb");
    // const moment = require("moment-timezone");

    // deatils data fetch
    app.get("/lost-finds/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = LostCalection.find().filter({ _id: new ObjectId(id) });
      const result = await cursor.toArray();
      res.send(result);
    });

    // my items get
    app.get("/myitems/:mail", veryfyToken, async (req, res) => {
      try {
        const email = req.params.mail;
        if (req.decoded.email != email) {
          return res.status(403).send({ massage: "You are fake user" });
        }
        const result = await LostCalection.find({ mail: email }).toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    // delete current user camp
    app.delete("/myitems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await LostCalection.deleteOne(query);
      res.send(result);
    });

    // UPDATE MY CAMP
    app.get("/itemsUpadte/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await LostCalection.findOne(query);
      res.send(result);
    });

    app.put("/itemsUpadte/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const optional = { upsert: true };
      const updated = req.body;
      const updatedData = {
        $set: {
          dateLost: updated.dateLost,
          title: updated.title,
          photoURL: updated.photoURL,
          type: updated.type,
          categoryArray: updated.categoryArray,
          lostlocation: updated.lostlocation,
          description: updated.description,
        },
      };
      const result = await LostCalection.updateOne(
        query,
        updatedData,
        optional
      );
      res.send(result);
    });

    // recover item
    // myMoney
    const RecoveredCollection = client
      .db("lostAndFind")
      .collection("my_recover");

    // get recover item
    app.get("/recover/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = RecoveredCollection.find().filter({
        _id: new ObjectId(id),
      });
      const result = await cursor.toArray();
      res.send(result);
    });

    // post recover item
    app.post("/api/recovered-items", async (req, res) => {
      const recoveryData = req.body;
      try {
        const result = await RecoveredCollection.insertOne(recoveryData);
        res.status(200).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to save recovery data", error });
      }
    });

    // pathc recover item
    app.patch("/api/items/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;

      try {
        const result = await ItemsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );
        res.status(200).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to update item status", error });
      }
    });

    app.get("/api/recovered-item/:id", async (req, res) => {
      const { id } = req.params; // Extract the `id` from request parameters
      // console.log(id);

      const result = await RecoveredCollection.findOne({ itemId: id });

      res.send(result);
    });

    app.get("/myrecover/items/:mail", veryfyToken, async (req, res) => {
      try {
        const email = req.params.mail;
        // console.log("object", req.cookies);
        // console.log(req.user.email);
        if (req.decoded.email != email) {
          return res.status(403).send({ massage: "You are fake user" });
        }
        const result = await RecoveredCollection.find({
          email: email,
        }).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//server run or not
app.get("/", (req, res) => {
  res.send("lost founds server is running");
});

app.listen(port, () => {
  console.log(`lost founds server is running on port ${port}`);
});
