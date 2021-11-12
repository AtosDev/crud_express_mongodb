import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";



//                       <username>:<password>                                 <database_name>
//const dburl = "mongodb+srv://faiq:faiqkhan@11nov21cluster1.lxgo4.mongodb.net/crud-mongodb?retryWrites=true&w=majority"          
//mongoose.connect(dburl)  //this will get deprecation warning so we will add {useNewUrlParser: true, useUnifiedTopology:true} to remove the warnings
//it will create a <database_name> of that name if the name doesn't exist.


mongoose.connect('mongodb+srv://faiq:faiqkhan@11nov21cluster1.lxgo4.mongodb.net/crud-mongodb?retryWrites=true&w=majority')  //using this one, it doesn't give out deprecating url warnings

//const Users = mongoose.model('Users', Schema)
//created the schema in the arg itself
const Users = mongoose.model('Users', {
    name: String,
    email: String,
    address: String
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
    Users.find({},(error, userS) => {
        if (!error) {
            res.send(userS)
        } else {
            res.status(500).send("error happened")
        }
    })
})


app.get('/user/:id', (req,res) => {
    console.log(req.params.id);
    if(users[req.params.id]) {
        res.send(users[req.params.id])
    } else {
        res.status(404).send('user not found')
    }
})


app.post('/user', (req,res) => {
    if (!req.body.name || !req.body.email || !req.body.address){
        res.status(400).send('invalid data');
    } else {
        users.push({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })

        res.send('users created');
    }
})



app.put ('/user/:id', (req, res) => {
    if (users[req.params.id]) {
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
    }
})


app.delete('/user/:id', (req,res) => {
    if (users[req.params.id]) {
        users[req.params.id] = {}
        res.send('user deleted')
    } else {
        res.status(404).send('user not found');
    }
})

app.delete('/userdelall', (req,res) => {
    if (users) {
        users = []
        res.send('All user deleted')
    } else {
        res.status(404).send('users doesn"t exists');
    }
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