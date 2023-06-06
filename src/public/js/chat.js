const socket = io()

const sendBtn = document.querySelector("#sendBtn")

sendBtn.addEventListener('click', e => {
    
    const user = document.querySelector('#user_input').value
    const message = document.querySelector('#message_input').value
    const newMessage = {user:user, message:message}

    fetch('/chat', {
        method: "POST",
        body: JSON.stringify({
          newMessage
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(res => res.text()).then()
})

const chatTemplate = `{{#each messages}}
<span>{{this.user}}: {{this.message}}</span>
<br>
{{/each}}`

const compileTemplate = Handlebars.compile(chatTemplate)
const chatBox = document.querySelector("#chatBox")
socket.on('actualizarMensajes', messages =>{
    chatBox.innerHTML = compileTemplate({
        messages:messages
    })
})

