const express =  require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


mongoose.connect('mongodb://nikhil:nikhil123@ds033400.mlab.com:33400/graphqldb_react')
mongoose.connection.once('open', () =>{
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('~~~~~~ CONNETCED TO DATABASE ~~~~~~');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Now listening for request on port 4000 :D");
});