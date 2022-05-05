function send(btn) {
  let channel = document.getElementById("channelIn").value;
  let password = document.getElementById("passwordIn").value;
  let text = document.getElementById("textIn").value;

  fet("postText", {channel: channel, text: text, password: password});

  flash(btn);
}
function recieve(btn) {
  let channel = document.getElementById("channelOut").value;
  let password = document.getElementById("passwordOut").value;
  let textElem = document.getElementById("textOut");

  fet("getText", {channel: channel, password: password}, res=> {
    textElem.value = res.text;
  });

  flash(btn);
}

function flash(btn) {
  btn.style.backgroundColor = "rgba(0, 255, 0, 255)";
  setTimeout(()=>{
    btn.style.backgroundColor = "rgba(0, 255, 0, 0)"
  }, 200);
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
