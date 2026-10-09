if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();   
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const categories = require("./utils/category.js");

const indexRouter = require('./routes/index.js');
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

// app.use(setPageTitle);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('ejs', ejsMate);

const port = process.env.PORT || 8080;
// const MONGO_URL = 'mongodb://127.0.0.1:27017/stayease';
const dbUrl = process.env.ATLASDB_URL;
const mySecret = process.env.MY_SECRET;

main()
    .then(() => {
        console.log('Connected to DataBase');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: mySecret,
    },
    touchAfter: 24 * 60 * 60,
});

store.on('error', (err) => {
    console.log('ERROR in MONGO SESSION STORE', err);
});

const sessionOptions = {
    store,
    secret: mySecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    const flashTypes = ['success', 'error', 'warning'];

    flashTypes.forEach(type => {
        res.locals[type] = req.flash(type);
    });

    res.locals.currUser = req.user;
    res.locals.listingCategories = categories;

    next();
});

// HOME:
app.use('/', indexRouter);

// LISTING:
app.use('/listings', listingRouter);

// REVIEW:
app.use('/listings/:id/reviews', reviewRouter);

// USER:
app.use('/', userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, 'Page not Found!'));
});

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render('listings/error', { message });
    // res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});