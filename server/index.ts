import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import { PrismaClient, User } from '@prisma/client';
import session from 'express-session';
import cors from 'cors';

const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

var sess = {
  secret: process.env.SESSION_SECRET!,
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

app.use(session(sess));
app.use(passport.authenticate('session'));

passport.use(
  new LocalStrategy(function verify(
    username: string,
    password: string,
    cb: Function
  ) {
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

        crypto.pbkdf2(
          password,
          user.salt,
          1000,
          64,
          'sha512',
          async (err, hashedPassword) => {
            if (hashedPassword.toString('hex') === user.password) {
              console.log('User authenticated');
              return cb(null, user);
            }

            return cb(null, false);
          }
        );
      })
      .catch((err) => {
        return cb(err);
      });
  })
);

passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user: any, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Espress + Typescript Server is running');
});

// app.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   })
// );

app.post('/login', function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    function (err: Error, user: User, info: any, status: number) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info });
      }
      res.json({ message: 'Login successful' });
    }
  )(req, res, next);
});

app.post('/logout', function (req: Request, res: Response, next: NextFunction) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logout successful' });
  });
});

app.post('/signup', function (req, res, next: NextFunction) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt.toString(),
    1000,
    64,
    'sha512',
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      try {
        const userRole = await prisma.role.findFirst({
          where: {
            name: 'user',
          },
        });

        const user = await prisma.user.create({
          data: {
            username: req.body.username,
            password: hashedPassword.toString('hex'),
            salt: salt.toString(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userRole: {
              create: {
                roleId: userRole!.id.toString(),
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
      } catch (err) {
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
    }
  );
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at port ${PORT}`);
});
