//file created just to write code and it's explanations and understandings









//-----------------mongodb(atlas) and moongose library---------------------//



//mongodb is a nosql database, mongodb atlas is a nosql database on cloud.

//mongodb database map: database -> collections(one or more) -> documents(one or more stored in collections, in JSON format) -> fields(key-value pairs)

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

//-----using mongoose:

//                                                      
//const dburl = "mongodb+srv://<username>:<password>@11nov21cluster1.lxgo4.mongodb.net/<database_name>?retryWrites=true&w=majority"          
//mongoose.connect(dburl)  //this will get deprecation warning so we will add {useNewUrlParser: true, useUnifiedTopology:true} to remove the warnings
//it will create a <database_name> of that name if the name doesn't exist.

//mongoose.connect()
        //.then(() =>  console.log(connected to database); )
    //    .catch((err) => console.log(err);)

//-------defining schema--------------------

//const schema = mongoose.Schema;
//const UserSchema = new schema({
//   name:{
//             type: String,
//             required: true         //that means this field is required for user documents
//    },
//    age: {
//             type: Number
//             required: true
//    }
//}, {timestamps: true})   //the second argument acts like an option, means everytime we assign any value, timestamps will be automatically assigned to every value


//-----creating model based on user schema we created----

//const User = mongoose.model('User', UserSchema)  //the name is mostly declared with the words capital letter // the second arg is the schema
//, so we assign it with the schema we created, and we can use different methods on our schema which is given by mongoose to us like, User.save() , etc

// e.g ;  app.get('/adduser', (req,res) => {
//   const User = new User({
//       name: 'faiq',
//        age: 19
//    });
//    User.save() // we used a method called save() on the model User, here we actually saved an instance of the model in the database
//       .then((result) => { res.send(result); })
//       .catch((err) => console.log(err))
//})

//--------------------------------------------------------//