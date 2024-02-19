const express = require("express");
const app = express();
const dbConnection = require("./config/db");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dbConnection();

// node middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cokie parser middleware
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.set("trust proxy", 1);

// All user Routes
app.use("/api/user", userRoute);

// All blog routes
app.use("/api/blog", blogRoute);

//Runing the Server to listen for request
app.listen(port, () => console.log(`Server runing on port: ${port}`));
