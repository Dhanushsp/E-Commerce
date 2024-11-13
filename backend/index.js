const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");


app.use(express.json());
app.use(cors());

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));


// API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on the Port " + port);
    } else {
        console.log("Error:" + error);
    }
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// Serving static files from the "upload/images" directory
app.use("/images", express.static("upload/images"));

// Image upload route
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});



// Schema for Creating Products 
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
    description: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

// Add product to the database
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        sizes: req.body.sizes,
    });

    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Remove product from the database
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Get all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// User schema
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// User signup
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same Email address" });
    }

    let cart = Array(300).fill(0);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, token });
});


// app.post('/signup', async (req, res) => {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new Users({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     });

//     await user.save();
//     res.send({ success: true, user });
// });

// // User login
// app.post('/login', async (req, res) => {
//     let user = await Users.findOne({ email: req.body.email });
//     if (user) {
//         const passCompare = req.body.password === user.password;
//         if (passCompare) {
//             const data = {
//                 user: {
//                     id: user.id
//                 }
//             };
//             const token = jwt.sign(data, process.env.JWT_SECRET);

//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, errors: "Wrong Password" });
//         }
//     } else {
//         res.json({ success: false, errors: "Wrong Email ID" });
//     }
// });




// User login
app.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, errors: "Wrong Email ID" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.json({ success: false, errors: "Wrong Password" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);


        res.json({ success: true, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, errors: "Internal server error" });
    }
});





// Get new collections
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
});

// Get popular products in the women's category
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: 'women' });
    let popular_in_women = products.slice(0, 4);
    res.send(popular_in_women);
});

// endpoint for getting womens products data
app.post("/relatedproducts", async (req, res) => {
    console.log("Related Products");
    const { category } = req.body;
    const products = await Product.find({ category });
    const arr = products.slice(0, 4);
    res.send(arr);
});

// Middleware for fetching authenticated user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);

            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};

app.post('/addtocart', fetchUser, async (req, res) => {
    const { itemId, size, quantity } = req.body;
    let userData = await Users.findOne({ _id: req.user.id });

    // Update user's cart with itemId, quantity, and size
    userData.cartData[itemId] = {
        quantity: quantity,
        size: size
    };

    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({ success: true, cartData: userData.cartData });
});

app.post('/increaseproductquantity', fetchUser, async (req, res) => {
    const { itemId, size } = req.body;

    // Retrieve user data
    let userData = await Users.findOne({ _id: req.user.id });

    // Initialize cartData if it's empty or undefined
    if (!userData.cartData) {
        userData.cartData = [];
    }

    // Find the existing item with the specified itemId and size
    const existingItem = userData.cartData.find(item => item.itemId === itemId && item.size === size);

    if (existingItem) {
        // Increase quantity if the item with the specified size exists
        existingItem.quantity += 1;
    } else {
        // If the item doesn't exist, add it to the cart with quantity 1
        userData.cartData.push({ itemId, size, quantity: 1 });
    }

    // Save the updated cart data to the database
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

    // Send the updated user data as the response
    res.send(userData);
});

app.post('/decreaseproductquantity', fetchUser, async (req, res) => {
    const { itemId, size } = req.body;

    // Retrieve user data
    let userData = await Users.findOne({ _id: req.user.id });

    // Initialize cartData if it's empty or undefined
    if (!userData.cartData) {
        userData.cartData = [];
    }

    // Find the existing item with the specified itemId and size
    const existingItem = userData.cartData.find(item => item.itemId === itemId && item.size === size);

    if (existingItem) {
        // Increase quantity if the item with the specified size exists
        existingItem.quantity -= 1;
    }

    // Save the updated cart data to the database
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

    // Send the updated user data as the response
    res.send(userData);
});

// Remove product from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    delete userData.cartData[req.body.itemId];
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send(userData);
});

// Get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    res.send(userData.cartData);
});


// Updated Order Schema
const orderSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    customer: {
        name: String,
        address: String,
        pincode: String,
        mobile: String
    },
    paymentMethod: String,
    items: [
        {
            productId: String,
            productName: String,
            quantity: Number,
            size: String,
            price: Number
        }
    ],
    totalAmount: Number,
    isPlaced: { type: Boolean, default: false },
});




app.post('/order', async (req, res) => {
    const {
        customer,  // This should be an object with `name`, `address`, `pincode`, `mobile`
        paymentMethod,
        items,  // This should be an array of item objects
        totalAmount
    } = req.body;

    try {
        // Create the new order object with the correct structure
        const newOrder = new Order({
            date: new Date(),
            customer: {
                name: customer.name,
                address: customer.address,
                pincode: customer.pincode,
                mobile: customer.mobile
            },
            paymentMethod: paymentMethod,
            items: items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                size: item.size,
                price: item.price
            })),
            totalAmount: totalAmount,
            isPlaced: true  // Marking the order as placed
        });

        await newOrder.save();
        res.json({ success: true, message: "Order submitted successfully!", orderId: newOrder._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error while submitting the order. Please try again." });
    }
});

const Order = mongoose.model('Order', orderSchema);


app.get('/OrderTracking', async (req, res) => {
    try {
        const orders = await Order.find(); // Adjust query as needed
        res.json(orders); // Send back orders as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error fetching orders." });
    }
});


app.delete('/deleteorder/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the order by ID
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (deletedOrder) {
            res.json({ success: true, message: "Order deleted successfully!" });
        } else {
            res.status(404).json({ success: false, message: "Order not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error deleting the order. Please try again." });
    }
});



const Admin = mongoose.model('Admin', {
    username: {  // Correctly using "username" here
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// // User signup
// app.post('/admin/signup', async (req, res) => {
//     let check = await Admin.findOne({ email: req.body.email });
//     if (check) {
//         return res.status(400).json({ success: false, errors: "Existing user found with same Email address" });
//     }

//     let cart = Array(300).fill(0);

//     const user = new Admin({
//         username: req.body.username, // Ensure `username` is here, not `name`
//         email: req.body.email,
//         password: req.body.password,

//     });


//     await user.save();

//     const data = {
//         user: {
//             id: user.id
//         }
//     };

//     const token = jwt.sign(data, process.env.JWT_SECRET);

//     res.json({ success: true, token });
// });


// User login
app.post('/admin/login', async (req, res) => {
    let user = await Admin.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, process.env.JWT_SECRET);

            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email ID" });
    }
});



// const nodemailer = require('nodemailer');
// app.use(express.json());

// let otps = {}; // In-memory storage for OTPs (temporary)

// // Configure Nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'sddhanushdp@gmail.com', // replace with your email
//         pass: 'Dhan@2363' // replace with your email password
//     }
// });

// // Generate 4-digit OTP
// function generateOTP() {
//     return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit OTP
// }

// // Endpoint to send OTP
// app.post('/admin/send-otp', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ success: false, errors: "Email is required" });
//     }

//     const otp = generateOTP(); // Generate OTP
//     otps[email] = otp; // Store OTP in memory for this email

//     // Set a timeout to clear the OTP after 5 minutes
//     setTimeout(() => {
//         delete otps[email];
//     }, 5 * 60 * 1000);

//     // Send OTP via email
//     const mailOptions = {
//         from: 'sddhanushdp@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.json({ success: true, message: "OTP sent to your email" });
//     } catch (error) {
//         console.error("Error sending OTP:", error); // Log the error details
//         res.status(500).json({ success: false, errors: "Error sending email" });
//     }

// });

// // Endpoint to verify OTP
// app.post('/admin/verify-otp', (req, res) => {
//     const { email, otp } = req.body;

//     if (otps[email] && otps[email] === parseInt(otp)) {
//         delete otps[email]; // OTP verified, clear from memory
//         res.json({ success: true, message: "OTP verified successfully" });
//     } else {
//         res.status(400).json({ success: false, errors: "Invalid or expired OTP" });
//     }
// });


