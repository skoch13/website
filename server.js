const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
//const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/main');
app.use(expressLayouts);
app.use(express.static('public'));
/* app.use(bodyParser.urlencoded({
    extended: false
})); */
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);