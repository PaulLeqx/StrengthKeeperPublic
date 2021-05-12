const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_USER_PASS +"@strenghtkeeper.zznak.mongodb.net/StrenghtKeeper?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("failed to connect to MongoDB", err));