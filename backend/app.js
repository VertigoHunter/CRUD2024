const express = require('express');
const app = express();
const port = 8081;

app.use(express.json())

const knex = require('knex')(require('./knexfile.js')["development"])

const cors = require("cors");
const allowedOrigins = ["http://localhost:3000","http://localhost:8081"];

    app.use(
        cors({
            origin: function(origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg =
                        "The CORS policy for this site does not " +
                        "allow access from the specified Origin.";
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        })
    );

app.get('/', (request, response) => {
  response.status(200).send('Response from root route!')
})

app.post('/', (request, response) => {
  cosole.log(request.body);
  response.status(201).send(`Body received: ${request.body.name}`)
})

app.listen(port, () => console.log(`Your Knex and Express application are running and listening on port ${port}.`))

/* THE FOLLOWING ARE GET REQUESTS TO RETRIEVE INFORMATION FROM THE DATABASE */

// GET ROUTE #1. Below retrieves the current inventory as provided by item_table.
app.get('/item', (request, response) => {
  knex('item')
  .select('*')
  .then(inventory => response.status(200).json(inventory))
  .catch(err =>
    response.status(404).json({
      message:
      'The data is not available.'
    })
    );
});

// GET ROUTE #2. Below retrieves the current item by id as provided by item_table.
app.get('/item/:id', (request, response) => {
  var { id } = request.params;
  knex('item')
  .select('*')
  .where('id', id)
  .then(inventory => {response.status(200).json(inventory)})
  .catch(err =>
    response.status(404).json({
      message:
      'The data is not available.'
    })
    );
});

// GET ROUTE #3. Below retrieves the current users from the user_info table.
app.get('/user_info', (request, response) => {
  knex('user_info')
  .select('*')
  .then(profile => response.status(200).json(profile))
  .catch(err =>
    response.status(404).json({
      message:
      'The data is not available.'
    })
    );
});

// GET ROUTE. Below retrieves the current user profile from the user_info table. Might be disabled/hidden later for security?
// app.get('/user_info', (request, response) => {
//   knex('user_info')
//   .select('*')
//   .then(profile => response.status(200).json(profile))
//   .catch(err =>
//     response.status(404).json({
//       message:
//       'The data is not available.'
//     })
//     );
// });

/* THE FOLLOWING ARE POST REQUESTS TO SUBMIT NEW INFORMATION TO THE DATABASE */

// POST REQUEST #1. Below submits new profile information to the user_info table and acts as SignUp/CreateAccount.
app.post('/user_info', async(request, response) => {
  const maxIdQuery = await knex('user_info').max('id as maxId').first() // Counts the highest ID that exists

  await knex('user_info').insert({
    id: maxIdQuery.maxId + 1,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    user_name: request.body.user_name,
    password: request.body.password
  })
  .then(()=>{
    knex('user_info')
    .select('*')
    .then(profile => response.status(200).json(profile))
    .catch(err =>
    response.status(404).json({
      message:
      'The data is not available.'
      })
    );
  })
})

// POST REQUEST #2. Below submits new item information to inventory.
app.post('/item', async(request, response) => {
  const maxIdQuery = await knex('item').max('id as maxId').first() // Counts the highest ID that exists

  await knex('item').insert({
    id: maxIdQuery.maxId + 1,
    user_id: request.body.user_id,
    item_name: request.body.item_name,
    description: request.body.description,
    quantity: request.body.quantity
  })
  .then(()=>{
    knex('item')
    .select('*')
    .then(profile => response.status(200).json(profile))
    .catch(err =>
    response.status(404).json({
      message:
      'The data is not available.'
      })
    );
  })
})

/* THE FOLLOWING ARE PUT REQUESTS FOR UPDATES TO THE DATABASE */

// PATCH REQUEST #1. Below provides an update to the current inventory as provided by item_table.
app.patch('/item/:id', async(request, response) =>{
  await knex('item').where('id', request.params.id)
  .update({
    id: request.body.id,
    item_name: request.body.item_name,
    description: request.body.description,
    quantity: request.body.quantity
  })
  .then(()=>{
    knex('item')
    .select('*')
    .then(item => {
      response.json(item);
    })
  })
});

// PUT REQUEST #2. Below provides an update to the current inventory as provided by user_info_table.
app.put('/user_info/:id', function(request, response){
  knex('user_info').where('id', req.params.id)
  .update({
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    user_name: request.body.user_name,
    password: request.body.password
  })
  .then(()=>{
    knex('user_info')
    .select('*')
    .then(profile => {
      response.json(profile);
    })
  })

  //DELETE REQUEST. Deletes the item by its item_ID as provided by item_table.
  // app.delete('/item/:id', (request, response) => {
  //   knex('item').where('id', 7).del()
  // })


  // app.delete('/item/:id', (request, callback) => {
  //   var query = knex('item')
  //   .del()
  //   .where({id:request.params.id});
  //   query.exec( function(err){
  //     if(err) return callback(err);
  //     sendResponse(callback);
  //   })
  // });

  app.delete('/item/:id', (request, response) => {
    let { id } = request.params;
    knex('item')
    .select('*')
    .where('id', id)
    .delete()
    .then(inventory => {return res.json({msg: "bob"});})
    console.log(inventory)
    .catch((err) => {
      console.error(err);
      return res.json({msg: err});
      });
  });

  // app.delete('/item/:item_ID', async (request, response) => {
  //   let {item_ID} = request.params
  //   let result = await knex('item')
  //   .delete(['*'])
  //   .where({item_ID})
  //   respond.send(result [0])
  // });

  // app.delete('/item/:item_ID', function(request, response){
  //   knex('item').where('item_ID', req.params.item_ID)
  //   .del()
  //   .then(()=>{
  //     knex('item')
  //     .select('*')
  //     .then(inventory => {
  //       response.json(inventory);
  //     })
  //   })
  // });

  // app.delete('/item/:item_ID', function(req, res){
  //   knex('item').where('item_ID', req.params.item_ID)
  //   .del()
  //   .then(function(){
  //       knex('item')
  //           .select('*')
  //           .then(item => {
  //               res.json(item);
  //           })
  //   })

})

  // app.delete('/item/:item_ID', function(request, response){
  //   var { item_ID } = request.params;
  //   knex('item')
  //   .where('item_ID', item_ID)
  //   .del()
  //   .then(function(){
  //     knex.select()
  //         .from('item')
  //         .then(function(item){
  //           res.send(item);
  //         })
  //   })
  // })

  // app.delete('/item/:item_ID', function(request, response){
  //   var { item_ID } = request.params;
  //   knex('item')
  //   .where('item_ID', item_ID)
  //   .del()
  //   .then(()=>{
  //       knex('item')
  //           .select('*')
  //           .then(item => {
  //               res.json(item);
  //           })
  //   })
  // })
