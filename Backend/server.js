import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
/*import bcrypt from 'bcrypt';   npm install bycrypt

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
bcrypt.compare(req.body.Password, result[0].password) */

const app = express();
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // adjust to match your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret', // a secret key used to encrypt the session cookie
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    maxAge: 1000*60*60*24
  } // set the session cookie properties
}))

// Create MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pfe",
});

app.post('/signuppage' , (req, res)=>{
  console.log(req.body);
  const sql = "INSERT INTO `User` (first_name, last_name, email, password, birth_date, address, city, CPassword, IDCard) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.FirstName,
    req.body.LastName,
    req.body.Email,
    req.body.Password,
    req.body.DateOfBirth,
    req.body.Address,
    req.body.City,
    req.body.CPassword,
    req.body.IDCard
  ]
    db.query(sql , values, (err, result)=> {
      if(err) {
        console.error("Signup Error:", err);
        return res.json({Message : "Error in Node", Error: err});
      }
      return res.json(result);
    })
})
app.post('/loginpage' , (req, res)=>{
  const sql = "SELECT * FROM `User`  WHERE email = ? and password = ?";
  db.query(sql, [req.body.Email,  req.body.Password], (err, result)=> {
    if(err) {
      return res.json({Message: "Error inside server"});}
    if(result.length > 0){
      req.session.email = result[0].email;
      console.log(req.session.email);
      return res.json({Login : true});
    }else{
      return res.json({Login: false});
    }
  })
})

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});


app.get('/',(req, res)=>{
  return res.json("From Backend Side");
})

// Sample API Endpoint
app.get("/user", (req, res) => {
  db.query("SELECT * FROM `User`", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.listen(8081, () => {
  console.log("Connected to the server");
});
