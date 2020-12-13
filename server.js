const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

const MongoClient = require('mongodb').MongoClient

const user = '<user>' 
const pwd = '<password>'

connectionString = "mongodb+srv://"+user+":"+pwd+"@cluster0.nflyq.mongodb.net/haikuDB?retryWrites=true&w=majority"

app.listen(3000, function(){ 
    console.log("listening on port 3000")
})



MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client=>{
        console.log("Connected to Database Successfully")
        const db = client.db("haikuDB")

        const jamCollection = db.collection('haikuJam')
        
        let id = 0
        let array_size = 0
        //console.log(db.replSetGetStatus)
        db.stats()
            .then(results =>{
                console.log(results)
            })
        app.get('/getDBStats', (req, res)=>{ //this api returns database stats in (console for now)
            db.stats()
            .then(results =>{
                console.log(results)
            })
        })
        app.get('/newJam', (req,res)=>{ //this api is used to create new jam with new topic
            res.render('new_topic.ejs')
        })

        app.get('/', (req, res)=>{ //this api list the incomplete jam 
            jamCollection.find({'jamLength': { $lt : 3 }}).sort({jamLength:-1}).toArray()
            .then(result=>{
                if(result.length>0){
                    console.log(result)
                    id = result[0]._id
                    array_size = result[0].jam.length
                    console.log(id)
                    res.render('index.ejs', {jams: result})
                }
                else{
                    console.log("no records found")
                    res.render('new_topic.ejs')
                }
                
            })
            .catch(error=> console.error(error))
        })

        app.post('/jam', (req, res)=>{ //this api writes the completed jams to database
            console.log(req.body)
            console.log(id)
            console.log(array_size)

            if(req.body.third_line != "" && req.body.second_line != "" ){
                jamCollection.updateOne(
                    {_id : id},
                    { $set : {jam : [req.body.first_line, req.body.second_line, req.body.third_line] },
                        $inc : {jamLength: (array_size==2) ? 1 : ((array_size==0) ? 3 : 2) } 
                    }
                )
                .then(result=>{
                    res.redirect('/')
                })
                .catch(error=>{console.error(error)})
            }
            else if(req.body.third_line == "" && req.body.second_line != ""){
                jamCollection.updateOne(
                    {_id : id},
                    { $set : {jam : [req.body.first_line, req.body.second_line] },
                        $inc : {jamLength: array_size==1 ? 1 : 2 }
                    }
                )
                .then(result=>{
                    res.redirect('/')
                })
                .catch(error=>{console.error(error)})
            }
            else if(req.body.second_line == ""){
                jamCollection.updateOne(
                    {_id : id},
                    { $set : {jam : [req.body.first_line] },
                        $inc : {jamLength:  1 }
                    }
                )
                .then(result=>{
                    res.redirect('/')
                })
                .catch(error=>{console.error(error)})
            }
            
        })

        app.post('/topic', (req, res)=>{ //this api write jam with new topic to database
            jamCollection.insertOne(
                { 'topic' : req.body.topic,
                    'jam' : [req.body.first_line],
                    'jamLength' : 1
                }
            )
            .then(result=>{
                res.redirect('/')
            })
            .catch(error=>{console.error(error)})
        })
        
        app.get('/all', (req, res)=>{ //this api will list all the completed JAMs
            jamCollection.find().sort({jamLength:-1}).toArray()
            .then(result=>{
                if(result.length>0){
                    //console.log(result)
                    res.render('listJams.ejs', {jams: result})
                }
                else{
                    console.log("no records found")
                    res.render('new_topic.ejs')
                }
                
            })
            .catch(error=> console.error(error))
        })
    })
    .catch(err =>{
        console.error(err)
    })






