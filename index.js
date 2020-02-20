const express = require('express');
const fs = require('fs');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    let messages = [];
    const articles = fs.readdirSync('./articles'); // load all articles from files here - use fs.readdirSync to list all files in a folder

    for (let i = 0; i<articles.length; i++){

        let fileText = fs.readFileSync('./articles'+ '/' + articles[i],{encoding:'UTF8'});
        messages.push(JSON.parse(fileText));
    }


    response.render('home', {articles: messages});

});


// note the :name below, we can access it using request.params.name
app.get('/article/:name', (request, response) => {

    const fileName = `./articles/${request.params.name}.json`;

    if(fs.existsSync(fileName)){
        const articleString = fs.readFileSync(fileName);
        const article = JSON.parse(articleString);
        response.render('article', {article: article});
    } else {
        response.render('not-found');
    }
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
