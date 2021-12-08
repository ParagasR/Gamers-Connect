<<<<<<< HEAD
var games = []
const games = new Array("Call Of Duty", "Minecraft", "Grand Theft auto" "Red Dead Redemtion 2");
document.getElementById("demo").innerHTML = games;
=======
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Gamers Connect secret',
    cookie: { expires: 300000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize 
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});
>>>>>>> d2276682f59fa6d7cbbff5ce6cedf8871474887a
