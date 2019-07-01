const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')
const zlib = require('zlib')

http.createServer(function (request, response) {
    const body = []
    const parsedUrl = url.parse(request.url,true,true)
    console.log(parsedUrl)
    console.log(qs.stringify({a:[1,3]}))
    request.on('data', function (chunk) {
        body.push(chunk)
    })
    request.on('end', function () {
        response.writeHead(200, {
            'Content-Type': 'text/plain;utf-8',
            'Content-Encoding':'gzip',
        })
        response.write(zlib.gzipSync(Buffer.concat(body).toString()))
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
        path:'/a/v?a=1',
    }, function (response) {
        const ret = fs.createWriteStream('./ret.txt', {
            flags: 'w',
            mode: 0o777,
        })
        if (response.headers['content-encoding' !== 'gzip']){
            return response.pipe(ret)
        }
        return response.pipe(zlib.createGunzip()).pipe(ret)
    })

    request.write('aaa')
    request.end()
}

setInterval(() => {
    sendData()
}, 5000)