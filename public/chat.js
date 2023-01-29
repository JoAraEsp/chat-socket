const socket = io()

let mensaje = document.getElementById('mensaje');
let nombre_usuario = document.getElementById('nombre_usuario');
let btn = document.getElementById('enviar');
let salida = document.getElementById('salida');
let acciones = document.getElementById('acciones');

btn.addEventListener('click', function () {
    socket.emit('chat:mensaje', {
        mensaje: mensaje.value,
        nombre_usuario: nombre_usuario.value
    });
})

mensaje.addEventListener('keypress', function () {
    console.log(nombre_usuario.value);
    socket.emit('chat:escribiendo', nombre_usuario.value);
})

socket.on('chat:mensaje', function (data){
    acciones.innerHTML = '';
    salida.innerHTML += `<p>
        <strong>${data.nombre_usuario}</strong>: ${data.mensaje}
    </p>`
});

socket.on('chat:escribiendo', function (data){
    acciones.innerHTML = `<p><em>${data} está escribiendo. </em></p>`;
});
