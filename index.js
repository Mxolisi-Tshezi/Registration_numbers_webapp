const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Registration = require('./Database_Reg');
const RegRoutes = require('./routes');
const RegFunction = require('./Errors')

const pgPromise = require("pg-promise")
const pgp = pgPromise({})

// SSL connection
// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//     useSSL = true;
// }
// const connectionString = process.env.DATABASE_URL || 'postgresql://tester:test123@localhost:5432/test';

// const db = pgp({
//     connectionString,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const local_database_url = 'postgresql://tester:test123@localhost:5432/test';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config ={
  connectionString 
}

if(process.env.NODE_ENV == "production"){
  config.ssl = {
      rejectUnauthorized: false
  }
}
const db = pgp(config);






const registration = Registration(db)
const regFunction = RegFunction()
const registrationRoutes = RegRoutes(registration, regFunction)

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: "secret message",
    cookie: {
        maxAge: 1000 * 36000
    },
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.post('/registr', registrationRoutes.addRegNum);
app.get('/reset', registrationRoutes.deleteAll);
app.get('/show', registrationRoutes.showReg);
app.get('/', registrationRoutes.showReg);
app.post('/filter', registrationRoutes.filterReg);

const PORT = process.env.PORT || 4099

app.listen(PORT, function () {
    console.log('App started at port:', PORT)

})