const http = require('http')

http.createServer(function (request, response) {
    const body = []
    console.log(request)
    // request.setEncoding('UTF-8')
    request.on('data', function (chunk) {
        console.log('中文')
        console.log(chunk)
        body.push(chunk)
    })
    request.on('end', function () {
        console.log(Buffer.concat(body))
        response.writeHead(200,{
            ['Content-Type']:'text/plain;utf-8'
        })
        console.log(Buffer.concat(body).toString())
        response.end(Buffer.concat(body).toString())
    })
})
    .listen(1314)