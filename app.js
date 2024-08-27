const dbConnect = require('./db/db');

const express = require('express');
const app = express();
const cors = require('cors');
const PostRouter = require('./routes/PostRouter')
app.use(cors());

dbConnect()

app.get('/', function(red, res){
    res.send("Server is working!");
})

app.use("/api", PostRouter)


app.listen(8080, function(){
    console.log("Server is running on 8080!");
});