
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes')



const PORT = 1000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());




// Routes


// MongoDB Connection
let URL = "mongodb+srv://Zillur-Rahman:Zillur123@cluster0.17qov.mongodb.net/Module20Assinment"


mongoose.connect(URL).then((res)=>{
    console.log('MongoDB Connected')
}).catch((err)=>{
    console.log(err)
})

app.use('/api/users', userRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})


