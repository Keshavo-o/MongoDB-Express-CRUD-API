const express = require('express');
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: false }));//it is a middleware that defines the type of content . It parses incoming requests with urlencoded payloads and convert it into object and stores it in req.body. BUT BUT BUT only works for 
// "Content-Type: application/x-www-form-urlencoded" type requests


mongoose.connect("mongodb://localhost:27017/temporary").then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});


const user_schema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true }
});


const user = mongoose.model("user", user_schema);//collection name is plural form of module name ie users in this case
//mongoose .model is a constructor function can be used to do CRUD opeations , this returns a model class
//user is a Mongoose model class for the users collection
//now this user can be used to do CRUD operations just like you did with users.json taking users as an array but here user is a modal class




app.use((req, res, next) => {
    console.log("New request received from device ip"+req.ip + " from path '"+req.path + "'\n");
    const html = "\nNew request received from device ip"+req.ip + " from path '"+req.path + "'"+" for request method:"+req.method;
    fs.appendFile("./log.txt",html,()=>{
        console.log("logged the request");
    })
    next();
});

app.use("/users/:id",async (req,res,next)=>{
    console.log("Checking user exits in the database");
    const user_id=req.params.id
    try{
    let my_user = await user.findById(user_id);
    if(!my_user){
        throw new Error();
    }}
    catch(err){
        return res.json({message: "User not found"});
    }
    next();
})//we can use middlewares for specific paths also 

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!',name:"Keshav Verma" });
});
app.get('/users',async (req,res)=>{
    const all_users = await user.find({});//{}gives all entries
    res.json(all_users);
});


app.get('/users/:id',async (req,res)=>{
    let users_id = req.params.id//no need to convert to number - object id is string
    let my_user = await user.findById(users_id);//findById is a default method of mongoose - it is handled internally and denotes to object id which is a string not a number . by default user.findbyId searches for objectId. 
    //If you are working on self defined ids also you can still acces object id by new mongoose.Types.ObjectId(id)

    //if you are using mongodb drivers natively use :-db.collection('users').findOne({ _id: new ObjectId(users_id) })
    return res.json(my_user);

});



app.post('/users',async(req,res)=>{
    console.log("Post request recieved");
    const user_formed = await user.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age
    })//this is a straight forward way to create a user - .create

    //although we can also use this method
    // const new_user = new user({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     age: req.body.age
    // })
    // new_user.save();
    return res.json({message:"User created successfully"});
    //a new variable __v is automatically passed which denotes the version of the document
})





app.patch('/users/:id', async (req, res) => {
    const user_id = req.params.id;
    try {
        const updated_user = await user.findByIdAndUpdate(user_id, req.body, { new: true });
        return res.json({ message: "User updated successfully", user: updated_user });
    } catch (err) {
        return res.json({ message: "Error updating user" });
    }
})





app.delete('/users/:id', async (req, res) => {
    const user_id = req.params.id;
    try {
        await user.findByIdAndDelete(user_id);//predefined for deleting by object Id
        return res.json({ message: "User deleted successfully" });
    } catch (err) {
        return res.json({ message: "Error deleting user" });
    }
});
app.listen(3030, () => {
  console.log('Server is running on port 3030');
});
