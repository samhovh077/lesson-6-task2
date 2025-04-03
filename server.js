import express from 'express'
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.use(session({
    secret: false,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    if (!req.session.visitCount) {
        req.session.visitCount = 0;
    }
    
    req.session.visitCount++;

    res.cookie('visitCount', req.session.visitCount, { maxAge: 900000, httpOnly: true });

    res.set('X-Visit-Count', req.session.visitCount);

    res.send(`Visit count: ${req.session.visitCount}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});