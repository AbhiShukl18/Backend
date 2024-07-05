import express from 'express'
import { Login, Register } from './Controllers/auth.controllers.js';
const app = express();
app.use(express.json()); //  parsing the json data into the javascript

app.post("/", function (req, res) {
 const {name, email, password }=req.body.userData;
 if(name&&email&&password){

  res.send("Data captured");
 }
 else{

  res.send("All fields are mandatory");
 }
});

app.post('/register', Register)
app.post('/login', Login)

app.get("/hello", function (req, res) {
  res.send("Hello.");
});


app.listen(3000)