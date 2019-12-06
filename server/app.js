const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

const CONNECT_URL = 'mongodb+srv://qczl091:asdfgh091@cluster0-khr23.gcp.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(CONNECT_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection.once('open',()=>{
    console.log('connected to database')
})
//pass in graphql schema
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,() => {
    console.log('now listening for requests on port 4000')
})