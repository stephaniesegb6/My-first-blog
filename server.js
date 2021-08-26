const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const articleRouter = require('./routers/articles');
const Article = require('./models/article')
const app = express();

app.set('views','./views')
app.set('view engine', 'ejs');
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/articles',articleRouter)

mongoose
     .connect( 'mongodb+srv://steb:binhbhmb7@firsttime.s1yxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createAt : 'desc'})
    res.render('articles/home',{articles : articles})
})

app.listen(3000,()=>{
    console.log('Connect to 3000')
})