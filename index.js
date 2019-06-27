const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    const body = []
    request.on('data', function (chunk) {
        body.push(chunk)
    })
    request.on('end', function () {
        response.writeHead(200, {
            'Content-Type': 'text/plain;utf-8',
        })
        response.write(Buffer.concat(body).toString())
        response.end()
    })
})
    .listen(1314)



function sendData() {
    const request = http.request({
        protocol: 'http:',
        hostname: 'localhost',
        port: 1314,
        method: 'POST',
    }, function (response) {
        const ret = fs.createWriteStream('./ret.txt', {
            flags: 'w',
            mode: 0o777,
        })
        response.pipe(ret)
    })

    request.write('aaa')
    request.end()
}

setInterval(() => {
    sendData()
}, 5000)