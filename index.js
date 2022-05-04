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
  channels[req.body.channel] = encrypt(req.body.text, req.body.password);
  res.send({
    hello: "goodbye"
  });
});
app.post("/getText", (req, res)=>{
  console.log("-:", req.body);
  res.send({
    text: decrypt(channels[req.body.channel], req.body.password)
  });
});


const port = process.env.PORT;
if (port == null || port == "") {
  port = 6969;
}
app.listen(port);



const encrypt = (text, key) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decrypt = (text, key) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);
  return text
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
