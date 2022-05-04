function send() {
  let channel = document.getElementById("channelIn").value;
  let password = document.getElementById("passwordIn").value;
  let text = document.getElementById("textIn").value;

  fet("postText", {channel: channel, text: text, password: password});
}
function recieve() {
  let channel = document.getElementById("channelOut").value;
  let password = document.getElementById("passwordOut").value;
  let textElem = document.getElementById("textOut");

  fet("getText", {channel: channel, password: password}, res=> {
    textElem.value = res.text;
  });
}






function fet(url, body, callback = ()=>{}) {
    fetch(url,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(a=>{return a.json()}).then(res=>{
        callback(res);
    });
}
