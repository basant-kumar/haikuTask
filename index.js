const Jam = require('./models/schema')

const first_jam = new Jam({
    topic : 'friendship',
    jam : [{first: 'you can'}, {second:'rely'}, {third:'on friends'}]
})

first_jam.save(function(error, document){
    if(error) console.error(error)
    console.log(document)
})



async function insertJam(jam){
    const j = new Jam(jam)

    const doc = await j.save()
    console.log(doc)
}


module.exports.insertJam = insertJam;


/*
mongoose.connect(connectionString, {useNewUrlParser:true, useUnifiedTopology: true})

const db = mongoose.connection

db.once('open', _ =>{
    console.log("Connected to Database using Mongoose")
    db.db.stats((err, data) => {
        console.log(data)
    
      });
})

db.on('error', err=>{
    console.log("Connection error", err)
})

app.get('/', (req, res)=>{
    Jam.find().stream()
    .on('data', function(doc){
        console.log(doc)
    })
    .on('error', function(err){
        console.error(err)
    })
   
})



jamCollection.aggregate([
                // Project with an array length
                { "$project": {
                    "topic": 1,
                    "jam": 1,
                    "length": { "$size": "$jam" }
                }},
            
                // Sort on the "length"
                { "$sort": { "length": -1 } },
                // Project if you really want
                { "$project": {
                    "topic": 1,
                    "jam": 1,
                }}
            
                
            ]).toArray()



*/