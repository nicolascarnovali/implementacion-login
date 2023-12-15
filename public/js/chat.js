const socket = io();

let user = null;

const output = document.getElementById("output");
const actions = document.getElementById("actions");

socket.on('newUser', (user)=>{
    Toastify({
        text: `${user} is logged in`,
        duration: 3000,
        close: true,
        // destination: 'http.....'
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
    }).showToast();
});