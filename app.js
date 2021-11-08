const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config();
}
require("./utils/connectdb");
require("./stratergies/JwtStrategy");
require("./stratergies/LocalStrategy");
require("./authenticate");

// All the express routes
const userRouter = require('./router/userRoutes')
const employeeRoutes = require('./router/employeeRouter');
// const userRouter = require("./router/userRoutes");

// Created express server
const app = express();

// Conver incoming data to JSON format
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS;

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
            console.log('successfully cors worked in ',whitelist)
        } else {
            callback(new Error("Not allowed by CORS"));
            console.log('false')
        }
    },

    credentials: true,
};

//Add the client URL to the CORS policy

// app.use(cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }));

app.use(cors(corsOptions))

app.use(passport.initialize());

// Routes Configuration
app.use("/users", userRouter);
app.use('/employee', employeeRoutes);


app.get("/", function(req, res) {
    res.send({ status: "success" });
});


//Start the server in port 4000

const server = app.listen( 4000, function() {
    const port = server.address().port;
    console.log("App started at port:", port);
});