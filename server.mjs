import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

//                       <username>:<password>                                 <database_name>
//const dburl = "mongodb+srv://faiq:faiqkhan@11nov21cluster1.lxgo4.mongodb.net/crud-mongodb?retryWrites=true&w=majority"          
//mongoose.connect(dburl)  //this will get deprecation warning so we will add {useNewUrlParser: true, useUnifiedTopology:true} to remove the warnings
//it will create a <database_name> of that name if the name doesn't exist.

//                 put the url in enviornment variable named mongoURI
mongoose.connect('mongodb+srv://dbuser:dbpassword@11nov21cluster1.lxgo4.mongodb.net/crud-mongodb?retryWrites=true&w=majority')  //using this one, it doesn't give out deprecating url warnings
    .then(() => console.log("Connected to the Database"))
    .catch(err => console.log(err));         
 
//const Users = mongoose.model('Users', Schema)
//created the schema in the arg itself
const Users = mongoose.model('Users', {
    name: String,
    email: String,
    address: String,
    //_id: String
});


const app = express();

const port = process.env.PORT || 3000

//let users = [];  //now we are storing it in database.
app.use(cors())
app.use(express.json()) 
app.use(morgan('short')) 



app.use((req, res, next) => {
    console.log('a request came', req.body);
    next()
})


app.get('/users', (req,res) => {
    //res.send(users)
    Users.find({},(error, userS) => { //have to define empty object{} in order to get all the users in db
        if (!error) {                  //if we wrote userS in if condition and no users are present than it would have given us empty array, which is truthy  , and else block execute
            res.send(userS)
        } else {
            console.log(err);
            res.status(404).send("error happened")
        }
    })
})


app.get('/user/:id', (req,res) => {
    console.log(req.params.id)
    Users.findOne({_id: req.params.id}, (err,user) => { //findbyId() is used to find by the _Id of mongodb directly, 
        if(!err) {                                        //findOne() have it's first parameter as a object defining that _id mongodb id would be equal to parameter id, which we define
            res.send(user)                            //findById(id) is almost* equivalent to findOne({ _id: id })
            console.log(user);
        } else {
            console.log(err);
            res.status(500).send('Error Happened')
        }
    })
})


app.post('/user', (req,res) => {
    if (!req.body.name || !req.body.email || !req.body.address){
        res.status(400).send('invalid data');
    } else {
        const newUser = new Users({  //new Users is a new model,we are making on user data
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        });

        newUser.save()     //.save() will save the model variable in database
            .then((result) => {
                res.send(result);
                console.log(result);
                console.log(req.params.id);
            })
            .catch(err => console.log(err));
    }
})



app.put ('/user/:id', (req, res) => {
    let updateUser = {}   //making an empty object to update the user from it's req.params.id in .find method
    if (req.body.name) {
        updateUser.name = req.body.name
    } 
    if (req.body.email) {
        updateUser.email = req.body.email
    }
    if (req.body.address) {
        updateUser.address = req.body.address
    }
    //    findByIdAndUpdate(id, update, options, callback)
    Users.findByIdAndUpdate(req.params.id, updateUser, {new:true}, (err, update) => {   //findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...).
        if (!err) {                                     //{new:true //results the changed document, after the update has applied, default is returning the bfore doc from db}       
            res.send(update)
            console.log(update);
        } else {
            console.log(err);
            res.status(404).send("User doesn't exist")
        }                                                      
    })

    //below code is applicable in non database
    /* if (users[req.params.id]) {
        if (req.body.name) {
            users[req.params.id].name = req.body.name
        }
        if (req.body.email) {
            users[req.params.id].email = req.body.email
        }
        if (req.body.address) {
            users[req.params.id].address = req.body.address
        }

        res.send(users[req.params.id])

    } else {
        res.status(404).send('user not found');
    } */
})


app.delete('/user/:id', (req,res) => {
    Users.findOneAndDelete({_id: req.params.id}, (err,del) => {
        if (!err) {
            res.send('USER deleted')
            console.log(del);
        } else {
            console.log(err);
            res.status(500).send("User not found/Error Happened")
        }
    })
    //below code is  applicable in non database
   /*  if (users[req.params.id]) {
        users[req.params.id] = {}
        res.send('user deleted')
    } else {
        res.status(404).send('user not found');
    } */
})

app.delete('/userdelall', (req,res) => {
    Users.remove()
        .then(() => {
            res.send("All Users Deleted")
        })
        .catch(() => {
            res.status(404).send("No Users Exist")
        })
        //below code is  applicable in non database
    /* if (users) {
        users = []
        res.send('All user deleted')
    } else {
        res.status(404).send('users doesn"t exists');
    } */
})

app.get('/home', (req, res) => {
    res.send('here is your home')
})

app.get('/', (req, res) => {
    res.send('Hi this is a nice little hello server')
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})







//mongodb is a nosql database, mongodb atlas is a nosql database on cloud.
//moongose is an ODM library - object document mapping library
    //allows us to create simple database models, which have methods like
    //.get() , .findByID(), deleteOne() etc .
//In order to work with mongodb and moongose we create schemas and models

//schema: defines the structure of a type of data / document stored in a database collection
        //-properties & property types that should have and etc etc.
        //e.g let's say a,
           //User Schema will contain : 
               //name (String), required  
               //age (String), required
               //bio (String), required
            //string represents the type of data written

//models: After creation of schema we create a model based on schema, models allows us to communicate with databse collections
        //If we create a User Schema, we can use the instant and static method like save, delete or update to edit the database collection
