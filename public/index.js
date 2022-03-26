const socket = io(); 


const enviar = () => {
    const mail = document.getElementById('mail');    
    const mensaje = document.getElementById('mensaje');
    if (mail.value.length<4) {
        alert('MAIL ES OBLIGATORIO');
    } else {
        socket.emit('mensajeFront', {mail: mail.value, mensaje: mensaje.value});   
        mensaje.value = ''; 
    }
}


socket.on('mensajeBack', (data) => {
    const msgs = document.getElementById('msgs');
    let html = '<table class="table table-condensed chat"><tr><th>Email</th><th>Fecha</th><th>Mensaje</th></tr>';
    
    data.map( m => {
        html += `<tr>
                    <td class="mail">${m.mail} - </td>
                    <td class="date">[${m.date}] :</td>
                    <td class="msg">${m.msg}</td>
                </tr>`;
    })
    html += '</table>'
    msgs.innerHTML = html;
});