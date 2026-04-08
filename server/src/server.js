const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// const bcrypt = require("bcryptjs");

// bcrypt.hash("admin@123", 10).then(console.log);