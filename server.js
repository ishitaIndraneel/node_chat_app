var express = require("express");
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParsor = require('body-parser');
var app = express()
app.use(express.static(__dirname));
var password = encodeURIComponent('AadGuray2024')
var dbUrl = `mongodb+srv://ishiMongo:${password}@cluster0.9updx2w.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(dbUrl).then(() => {
    console.log('Successful Connection')
}).catch((err) => {
    console.log("Failed to connect to Mongo DB Database", err)
})
var Message = mongoose.model("Message", { "name": String, "message": String })


app.use(bodyParsor.json())
app.use(bodyParsor.urlencoded({ extended: false }))

app.get("/messages", (req, res) => {
    Message.find({}).then((err, messages) => {
        res.send(messages)
    })
})

app.post("/messages", (req, res) => {
    var newMessage = new Message(req.body)
    newMessage.save((err) => {
        if (err)
            sendStatus(500)
        io.emit('message', req.body);
        res.sendStatus(200)
    })
})
io.on('connection', () => {
    console.log('a user is connected')
})
var server = app.listen(3001, () => {
    console.log("server is running on port - ", server.address().port);
})