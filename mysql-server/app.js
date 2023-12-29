// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const customersRoute = require("./routes/customers");
require("./models/db");

const app = express();
const port = 9002;

app.use(bodyParser.json());
app.use(cors());

// Define routes
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/customers", customersRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
