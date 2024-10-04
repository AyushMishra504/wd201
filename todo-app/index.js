const app=require('./app')
app.listen(3000, () =>{ //tells the server to start listening for connections on a particular port
    console.log("Started express server at port 3000")
})