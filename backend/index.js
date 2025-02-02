const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const port = process.env.PORT||4000;
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(
  "mongodb+srv://user:user%40123@cluster0.rjfp7.mongodb.net/New_project?retryWrites=true&w=majority&appName=Cluster0"
);

// Root API
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image Store
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Serve images statically
app.use("/images", express.static("upload/images"));

// Image upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `https://trendmart-frontend.onrender.com/images/${req.file.filename}`,
  });
});

// Product Schema
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Add Product API
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Remove Product API
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Get All Products API
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

//Schema creating for User model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creaing Register the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, error: "existing user found same email Id" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//Creating Endpoin of User Login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email Id" });
  }
});

//Creating endpoint for newCollection
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollcetion Fetched");
  res.send(newcollection);
});

//Creating endpoint for Popular
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("popular in women fetched");
  res.send(popular_in_women);
});

// Related product
app.get("/relatedproducts", async (req, res) => {
  let products = await Product.find({});
  let related_products = products.slice(0, 4); 
  console.log("Related Products Fetched");
  res.send(related_products);
});


//Creating middelware to fecth user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};


//Creating endpoint for adding Products for cartData
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json({ message: "Added" }); // Changed to JSON response
});


//Creating endpoint to remove products for cartData
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json({ message: "Removed" });
});


//craeting endpoint to get cartdata
app.post('/getcart' ,fetchUser,async(req,res)=>{
console.log("Getcart");
let userData =await Users.findOne({_id:req.user.id});
res.json(userData.cartData);

})
// Server Listen
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server Running on Port: ${port}`);
  } else {
    console.log(`Error: ${error}`);
  }
});
