const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
  res.sendFile('index.html', {root: __dirname});
});
app.get("/public.js", (req, res)=>{
  res.sendFile('public.js', {root: __dirname});
});


let channels = {};

app.post("/postText", (req, res)=>{
  console.log("+:", req.body);
  channels[req.body.channel] = {
    text: req.body.text,
    password: req.body.password
  };
  res.send({
    hello: "goodbye"
  });
});
app.post("/getText", (req, res)=>{
  let data = channels[req.body.channel];
  if (data == undefined)
    data = "No such channel dipshit";
  else
    data = (data.password == req.body.password) ? data.text : "Wrong password fuckass";

  res.send({
    text: data
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 6969;
}
app.listen(port);
