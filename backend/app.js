const  express =  require('express');
const  mongoose = require("mongoose");
const bodyParser = require("body-parser");
const imageRoute = require("./routes/images");

const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000}));

app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");


  next();
});
const connection_url = 'mongodb+srv://Admin:passwordAdminTikTok@cluster0.ddzlm.mongodb.net/urlShortner?retryWrites=true&w=majority';

mongoose.connect(
    connection_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});

app.use('/', imageRoute);
module.exports = app;
