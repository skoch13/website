require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/main');
app.use(helmet());
app.use(expressLayouts);
app.use(express.static('public', {maxAge: 21600000}));
app.use(bodyParser.urlencoded({
    extended: false
})); 
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);
console.log('Server is running...');