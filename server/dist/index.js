"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var sess = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    // store: new PrismaSessionStore(new PrismaClient(), {
    //   checkPeriod: 2 * 60 * 1000, //ms
    //   dbRecordIdIsSessionId: true,
    //   dbRecordIdFunction: undefined,
    // }),
};
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use((0, express_session_1.default)(sess));
app.use(passport_1.default.authenticate('session'));
passport_1.default.use(new passport_local_1.Strategy(function verify(username, password, cb) {
    prisma.user
        .findUnique({
        where: {
            username: username,
        },
    })
        .then((user) => {
        if (!user) {
            return cb(null, false);
        }
        console.log('User', user);
        console.log(password);
        console.log(user.salt);
        crypto_1.default.pbkdf2(password, user.salt, 1000, 64, 'sha512', (err, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
            console.log(hashedPassword.toString('hex'));
            if (hashedPassword.toString('hex') === user.password) {
                console.log('User authenticated');
                return cb(null, user);
            }
            return cb(null, false);
        }));
    })
        .catch((err) => {
        return cb(err);
    });
}));
passport_1.default.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});
passport_1.default.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
app.get('/', (req, res) => {
    res.send('Espress + Typescript Server is running');
});
// app.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   })
// );
app.post('/login', function (req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info, status) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info });
        }
        res.json({ message: 'Login successful' });
    })(req, res, next);
});
app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Logout successful' });
    });
});
app.post('/signup', function (req, res, next) {
    var salt = crypto_1.default.randomBytes(16);
    crypto_1.default.pbkdf2(req.body.password, salt.toString(), 1000, 64, 'sha512', function (err, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            try {
                const userRole = yield prisma.role.findFirst({
                    where: {
                        name: 'user',
                    },
                });
                console.log(userRole === null || userRole === void 0 ? void 0 : userRole.id);
                const user = yield prisma.user.create({
                    data: {
                        username: req.body.username,
                        password: hashedPassword.toString('hex'),
                        salt: salt.toString(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        userRole: {
                            create: {
                                roleId: userRole.id.toString(),
                            },
                        },
                    },
                });
                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({ message: 'Signup successful' });
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Signup failed' });
            }
            // db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
            //   req.body.username,
            //   hashedPassword,
            //   salt
            // ], function(err) {
            //   if (err) { return next(err); }
            //   var user = {
            //     id: this.lastID,
            //     username: req.body.username
            //   };
            //   req.login(user, function(err) {
            //     if (err) { return next(err); }
            //     res.redirect('/');
            //   });
            // });
        });
    });
});
app.listen(PORT, () => {
    console.log(`[server]: Server is running at port ${PORT}`);
});
