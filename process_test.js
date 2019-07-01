const child_process = require('child_process')
const socket_process = child_process.spawn('node',['./process_test1.js'],{
    stdio:[0,1,2,'ipc'],
})
socket_process.send('aaa')

socket_process.on('exit',console.log)