const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { body, validationResult } = require('express-validator');

const app = express();

mongoose.connect('mongodb+srv://dasharitha10:sQcTmgXIIMIRU3he@cluster0.9vbqkls.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  age: Number,
  bloodgroup: String,
  height: Number,
  weight: Number,
});

const Record = mongoose.model('Record', recordSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'your secret key',
  resave: true,
  saveUninitialized: true,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/signup', [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('birthdate').notEmpty().withMessage('Birthdate is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, birthdate, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      birthdate,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    req.session.user = user;
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

});


app.post('/profile',  async(req, res) => {
  
  const { name, age, bloodgroup, weight, height } = req.body;
  const userId = req.session.user._id;

  try{
    const userRecord = new Record({
    userId,
    name,
    age,
    bloodgroup,
    weight,
    height,
  });

   await userRecord.save();
   res.redirect('/index');
} catch(err) {
     console.error('Error registering user:', error);
     res.status(500).json({ message: 'Internal server error' });
}
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'log.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sign.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

 app.get('/reminder', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'reminder.html'));
 });

 app.get('/record', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    Record.find({ userId })
    .then(records => {
       res.json(records);
    });
  } catch (err) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
