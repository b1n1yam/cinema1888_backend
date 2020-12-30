const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    // await mongoose.connect(db, {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    // });
    //<username>:<password>@mediabox-shard-00-00.am5ap.mongodb.net:27017,mediabox-shard-00-01.am5ap.mongodb.net:27017,mediabox-shard-00-02.am5ap.mongodb.net:27017/<dbname>?ssl=true&replicaSet=MediaBox-shard-0&authSource=admin&retryWrites=true&w=majority
    mongodb: await mongoose.connect(
      "mongodb://mediabox-shard-00-00.am5ap.mongodb.net:27017,mediabox-shard-00-01.am5ap.mongodb.net:27017,mediabox-shard-00-02.am5ap.mongodb.net:27017/<dbname>?ssl=true&replicaSet=MediaBox-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        auth: {
          user: "bin",
          password: "bin@mongo",
        },
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
