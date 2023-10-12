const express = require('express');

const app = express();



app.get ('/',(req, res) =>{
    // res .end('bien vendido al servidor backeend NODE')
    //console.log (__dirname),
res.sendFile(__dirname+'/public/index.html')
})

// se agrego para acceder a las rutas 
app.use('/public', express.static(__dirname+'/public'));
app.use('/src', express.static(__dirname +'/src'));
app.use('/node_modules', express.static(__dirname+'/node_modules'));

//configuarar server basico
app.listen(5005, function(){
    console.log("servidor GRUPO9")
})