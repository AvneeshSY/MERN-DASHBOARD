const express = require('express');
require('./db/config');
const cors = require("cors")
const user = require('./db/user');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm'
const app = express();
app.use(express.json());
app.use(cors());

// ....................................Register API................

app.post("/register", async (req, resp) => {
   try {
      //.................. check if the email is already exists................

      const existuser = await user.findOne({ email: req.body.email });
      if (existuser) {
         return resp.status(400).send({ error: "Email is already exist" });

      }

      //................. Create a new user instance............................

      let User = new user(req.body);

      // .................Save the new user to the database.....................

      let result = await User.save();
      // ........delete password .......
      result = result.toObject();  //converrt into object
      delete result.password;
      Jwt.sign({ result }, jwtkey, (err, token) => {
         if (err) {
            resp.send({ result: "Somthing went wrong,please try again" })
         }
         resp.send({ result, auth: token });
      })
   } catch (error) {
      resp.status(500).send({ error: "Internal Server Error" })
   }
});

// .................LOGIN API.............
app.post("/login",  async (req, resp) => {
   if (req.body.password && req.body.email) {
      let User = await user.findOne(req.body).select("-password");
      if (User) {
         Jwt.sign({ User }, jwtkey, (err, token) => {
            if (err) {
               resp.send({ result: "Somthing went wrong,please try again" })
            }
            resp.send({ User, auth: token });
         })

      }
      else {
         resp.send({ result: "no user found" })
      }
   } else {
      resp.send({ result: "no user found" })
   }
})

// ......................Add Products.............
app.post('/add-product', verifyToken, async (req, resp) => {
   let product = new Product(req.body);
   let result = await product.save();
   resp.send(result);
})
//................product Listing api.............
app.get('/products', verifyToken, async (req, resp) => {
   let products = await Product.find();
   if (Product.length > 0) {
      resp.send(products)
   } else {
      resp.send({ result: "NO Products Found" });
   }
})

app.delete('/Product/:id', verifyToken, async (req, resp) => {
   let result = await Product.deleteOne({ _id: req.params.id });

   resp.send(result);
})
// ...............UpdateProduct prefill........

app.get('/product/:id', verifyToken, async (req, resp) => {
   let result = await Product.findOne({ _id: req.params.id });
   if (result) {
      resp.send(result);
   }
   else {
      resp.send({ result: "No result found" })
   }
})
// ...............UpdateProduct Data......
app.put("/product/:id", verifyToken, async (req, resp) => {
   let result = await Product.updateOne(
      { _id: req.params.id },
      {
         $set: req.body
      }
   )
   resp.send(result);
})
app.get("/search/:key", verifyToken, async (req, resp) => {
   let result = await Product.find({
      "$or": [
         { name: { $regex: req.params.key } },
         { company: { $regex: req.params.key } },
         { category: { $regex: req.params.key } }
      ]
   })
   resp.send(result)
})
function verifyToken(req, resp, next) {
   let token = req.headers['authorization']
   if (token) {
      token = token.split(' ')[1];

      console.log('middle called',token)
   
      Jwt.verify(token, jwtkey, (err, valid) => {
         if (err) {
            resp.status(401).send({ result: "Please provide valid token with " })
         } else {

             next();
         }

      })
   } else {
      resp.status(403).send({ result: "Please add token with header" })
   }
   // console.log('middle called', token)
   // next();
}


app.listen(8080);