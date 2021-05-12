require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const errorHandler = require("./middleware/error");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

// Routes import
const authRoutes = require("./routes/auth.routes");
const exercisesRoutes = require("./routes/exercises.routes");
const trainingsRoutes = require("./routes/trainings.routes");

app.use(cors());
app.use(express.json());

// const corsOption = {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   allowedHeaders: ["sessionId", "Content-Type"],
//   exposedHeaders: ["sessionId"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
// };

app.get('/', (req, res) => {
  res.send('Hello to strenghtKeeper API');
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/private", require("./routes/private.routes"));
app.use("/api/exercises", exercisesRoutes);
app.use("/api/trainings", trainingsRoutes);

// Error Handler
app.use(errorHandler);

// server
const server = app.listen(port, () => {
  console.log(`Server is running on port :${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});