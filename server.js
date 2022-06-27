if(process.env.NODE_ENV !== "production")[
    require("dotenv").config()
]

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index");
const vendedoresRouter = require("./routes/vendedores");


app.set('view engine','ejs');
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:"10mb", extended: false}))

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(()=> console.log(' connected to DB!'))
    .catch(()=> console.log(' error connecting to DB!'))


app.use("/",indexRouter);
app.use("/vendedores",vendedoresRouter);


app.listen(process.env.PORT || 3000);