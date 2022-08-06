const socket = io('http://localhost:8000');
const messageArea = document.getElementById('sendarea');
const container = document.querySelector('.container');
const msgInp = document.getElementById('msgInp');
const join = document.getElementById('join');
const prompton = document.getElementById('prompton');
const box = document.getElementById('box');
const prom=document.getElementById('prompt');
box.style.display = 'none';
const append = (message, position) => {
	const msgEle = document.createElement('div');
	msgEle.innerText = message;
	msgEle.classList.add('message');
	msgEle.classList.add(position);
	container.append(msgEle);
	if(position =='left'){ 
        audio.play();
    }
}
var audio=new Audio('../elegant-notification-sound.mp3')
join.addEventListener('click', () => {
	const name = prompton.value;
	socket.emit('new-user-joined', name);
	box.style.display = 'block';
	prom.style.display='none'
	prompton.value=''
})

socket.on('user-joined', name => {
	append(`${name} joined the chat`, 'left');
});

socket.on('receive', data => {
	append(`${data.name}: ${data.message}`, 'left');
})
socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
})
messageArea.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = msgInp.value;
	append(`You: ${message}`, 'right');
	socket.emit('send', message);
	msgInp.value = '';
})