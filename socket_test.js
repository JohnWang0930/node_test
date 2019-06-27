const net = require('net')

net.createServer(function (socket) {
    socket.on('data',function(data){
        console.log(data.toString())
    })
})
    .listen(12345)


let request = null // 客户端
let i = 0
function sendData() {
    if (!request) {
        const options = {
            port: 12345,
            host: 'localhost',
        }
        return request = net.connect(options, () => {
            request.write('aaaa')
        })
    }
    request.write('aaaa' + i++)
}

setInterval(() => {
    sendData()
}, 5000)