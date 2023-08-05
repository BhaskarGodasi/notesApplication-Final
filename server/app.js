const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require("./Router/AuthRoutes")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const {requireAuth , checkUser} = require("./Middleware/AuthMiddleware")

const app = express();

// middleware
// app.use(express.static('public'));
app.use(cors())
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://JWTPASSWORD:JWTPASSWORD@cluster0.v2ihv2f.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>{
    console.log("db connected")
   
  } )
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));

app.use(AuthRoutes);


app.listen(5000,()=>{
  console.log('app listening at port 5000');
})