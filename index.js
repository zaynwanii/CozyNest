import express, { json } from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import download from 'image-downloader';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const upload = multer({ dest: 'uploads/' });

const app = express();

dotenv.config();

const saltRounds = parseInt(process.env.BCRYPTSALT);

app.use(json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow credentials
}));

app.use(session({
    name: 'login.sid',
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
db.connect();


app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        // console.log(user);
        res.json({ user })
    } else {
        res.status(401).json("User unauthorised");
    }

})

app.get('/user-places', async (req, res) => {
    const user = req.user;
    const ownerId = user.id;
    // console.log(ownerId);
    const response = await db.query("SELECT * FROM places WHERE ownerId=$1", [ownerId])
    // console.log(response.rows[0]);
    const place = response.rows;
    res.json(place);
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;

    const result = await db.query('  SELECT places.*,users.id AS ownerid,users.name AS owner_name, users.email AS owner_email FROM places JOIN users ON places.ownerid = users.id WHERE places.id = $1', [id]);
    // console.log(result.rows);
    res.json(result.rows);

})

app.get('/places', async (req, res) => {
    const result = await db.query("Select * FROM places");
    res.json(result.rows);
})

app.get('/bookings', async (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        try {
            const result = await db.query(`SELECT bookings.id AS booking_id, bookings.placeId, bookings.userId, 
                bookings.checkIn, bookings.checkOut, bookings.name AS booking_name, bookings.phone AS booking_phone,
                 bookings.price AS booking_price,places.id AS place_id,places.ownerId, places.title, places.address, 
                 places.photos, places.description, places.perks, places.extraInfo, places.chechkIn AS place_checkIn, 
                 places.checkOut AS place_checkOut, places.maxGuests, places.price AS place_price
                FROM bookings JOIN places ON bookings.placeId = places.id WHERE bookings.userId = $1`, [user.id]);
            res.json(result.rows);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});


app.put('/places', async (req, res) => {
    const user = req.user;
    const userId = user.id;

    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    // console.log(id);
    try {
        const result = await db.query('SELECT * FROM places WHERE id=$1', [id]);
        const { ownerid } = result.rows[0];
        if (userId === ownerid) {
            try {
                const updatedPlace = db.query('UPDATE places SET title=$1,address=$2,photos=$3,description=$4,perks=$5,extraInfo=$6,chechkIn=$7,checkOut=$8,maxGuests=$9 ,price=$10 WHERE id=$11', [title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price, id]);
                res.json(updatedPlace.rows);
            } catch (error) {
                console.log("Failed updating the place", error);
            }
        }
    } catch (error) {
        console.log("Error fetching place with provided place-id", error);
    }


})

app.delete('/delete-photo', (req, res) => {
    const { link } = req.body;
    // console.log(link);
    const filePath = path.join(__dirname, link);
    try {
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
        console.error("Error deleting the photo", error);
        res.status(500).json({ message: 'Error deleting the photo' });
    }
})

app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log("Error logging out", err);
        } else {
            req.session.destroy((err) => {
                if (err) {

                    return res.status(500).json({ message: 'Error logging out' });
                }
                res.clearCookie('login.sid', { path: '/' }); // Clear session cookie       
                res.json({ message: 'logged out' });
            });
        }
    }); // Clear Passport.js session


});




app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        const user = await db.query
            ("INSERT INTO USERS(name,email,password) values($1,$2,$3) RETURNING *",
                [name, email, hash]);

        res.json(user.rows[0]);
        req.login(user, (err) => {
            // console.log(err);
            res.redirect('/profile');
        })

    })
});

app.post('/login', passport.authenticate("local", {
    successRedirect: '/profile'
})


);


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;

    const newName = 'photo' + Date.now() + '.jpg'
    await download.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json('uploads/' + newName);

})


app.post('/upload', upload.array('photos', 15), (req, res) => {
    // console.log(req.files);
    const uploadedPhotos = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path } = req.files[i];
        uploadedPhotos.push(path);
    }
    res.json(uploadedPhotos)
})

app.post('/places', async (req, res) => {

    // console.log(req.body);
    const user = req.user;
    const ownerId = user.id;
    // console.log(ownerId);
    try {
        const { title, address, addedPhotos, description, perks,
            extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
        const place = await db.query("INSERT INTO places(ownerId,title,address,photos,description,perks,extraInfo,chechkIn,checkOut,maxGuests,price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING * ",
            [ownerId, title, address, addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price]);
        res.json(place);

    } catch (error) {
        console.log("Error adding place to DB", error);
    }
})

app.post('/bookings', async (req, res) => {
    const { place, checkIn, checkOut, name, phone, price } = req.body;
    let user = '';
    if (req.isAuthenticated()) {
        user = req.user;
    }
    const placeId = place.id;

    try {

        const result = await db.query('INSERT INTO bookings(placeId,checkIn,checkOut,name,phone,price,userId) VALUES ($1,$2,$3,$4,$5,$6,$7)  RETURNING *', [placeId, checkIn, checkOut, name, phone, price, user.id]);
        //    console.log(result.rows[0]);

        res.json(result.rows[0]);
    } catch (error) {
        console.log("DBError booking place", error);

    }


})

passport.use(new Strategy(async function verify(username, password, cb) {

    try {
        const result = await db.query("SELECT * FROM users WHERE email=$1 ", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            //    console.log(user);
            const storedPassword = user.password;
            bcrypt.compare(password, storedPassword, (err, result) => {
                if (err) {
                    return cb(err);
                } else {
                    if (result) {
                        return cb(null, user);
                    } else {
                        return cb(null, false);
                    }
                }
            });
        } else {
            return cb("User not found");
        }

    } catch (error) {
        return cb(error);
    }
}))

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
})