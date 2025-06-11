import express from "express"
require('dotenv').config() ; // Load environment variables from .env file

const app = express() 

const port = process.env.PORT || 3000
app.use(express.json());

 app.get('/', (req,res) => {
    res.send("hello aseem") ;
 } )

 let teaData = [] ;
 let nextId =   1 ;
 app.post("/teas" , (req, res) => {
    const {name , price} = req.body ;
    const newtea = {id: nextId++ , name , price } ;
    teaData.push(newtea) 
    res.status(201).send(newtea) ;
  })

  app.get('/teas', (req, res) => {
      res.status(201).send(teaData) ;
  })
  app.get('/teas/:id', (req, res) => {
    const id = paeseInt(req.params.id) ;
    const tea = teaData.find(t => t.id === id) ;
    if(!tea) {
        return res.status(404).send("Tea not found") ;

    }
    res.status(200).send(tea) ;
  })

  //update tea
  app.put('/teas/:id', (req, res) => {
    const id = parseInt(req.params.id) ;
    const tea = teaData.find(t => t.id === id ) ;
    if(!tea) {
        return res.status(404).send("Tea not found") ;
    }
    const {name, price} = req.body ;
    tea.name = name ;   
    tea.price = price ;
    res.status(200).send(tea) ;
     
  })
  //delete tea 
    app.delete('/teas/:id', (req, res) => {
        const id = parseInt(req.params.id) ;
        const index = teaData.findIndex(t => t.id === id) ;
        if(index === -1) {
            return res.status(404).send("Tea not found") ;
        }
        teaData.splice(index, 1) ;
        res.status(204).send("deleted") ;  })


app.listen(port , () => {
    console.log(`server is listening on http://localhost:${port}`) ;
} )