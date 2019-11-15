const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secrets = require ("../config/secrets.js");
const Users = require('../users/usersModel.js');

// router.post('/register', (req, res) => {
//   let { username, password } = req.body;

//   const hash = bcrypt.hashSync(password, 8);

//   Users.add({ username, password: hash })
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// router.post('/login', (req, res) => {
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         req.session.username = user.username;
//         res.status(200).json({ message: `Welcome ${user.username}!` });
//       } else {
//         res.status(401).json({ message: 'You shall not pass!' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });
// router.post('/register', (req, res) => {
//   // implement registration
//   const hash = bcrypt.hashSync(user.password, 10);
//   user.password = hash;

//   Users.add(user)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// router.post('/login', (req, res) => {
//   // implement login
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user);
//         res.status(200).json({ token });
//       } else {
//         res.status(401).json({ message: "You do not have the valid credentials" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
  .then(saved => {
      res.status(201).json(saved);
  })
  .catch(err => {
      res.status(500).json(err)
  });
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;
  Users.findBy({username})
  .first()
  .then(user => {
      if (user && bcrypt.compareSync (password, user.password)){
          const token = getToken(user)

          res.status(200).json({ message: `Welcome ${user.username}! ${token}` });
      } else {
          res.status(401).json({ message: 'Invalid credientials' })
      }
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

function getToken(user){
  const payload = {
      subject: 'user',
      username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
      expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;
