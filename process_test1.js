process.on('message',console.log)

setTimeout(()=>{
    process.exit(2)
},5000)