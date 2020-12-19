require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
const PORT = process.env.PORT;

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  // "mongodb+srv://rsk:rskngrh@cluster1.d2szq.gcp.mongodb.net/Stories?retryWrites=true&w=majority";

  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      app.listen(PORT, () => console.log("Listening on port :", PORT))
    )
    .catch((err) => console.log(err));

app.use(router);

mongoose.set("useFindAndModify", false);
