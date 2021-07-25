const express = require("express");
const routes = require("./routes/index");
const volleyball = require("volleyball");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// eslint-disable-next-line no-unused-vars
const models = require("./db/index");
const db = require("./db/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(volleyball);
app.use(cors());
app.use(cookieParser());

// app.use(express.urlencoded{extend:})
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`server running on  http://localhost:${PORT}`);
  });
});
