import React, { useState, useEffect, createContext, useContext } from "react";

// THIS IS ALL PLACE HOLDER STUFF SO LOGIN FUNCTIONS CAN EVENTUALLY MOVED TO BACKEND.

const addUser = () =>{
  fetch('http://localhost:8081/user_info', {
    method: 'GET',
    body: JSON.stringify({
      first_name: createFirstName,
      last_name: createLastName,
      user_name: createUserName,
      password: createPassword
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
}

const viewFullItem = (id) =>{
  inventory.id = id;
  fetch(`http://localhost:8081/item/`+`${id}`)
  .then(response => response.json())
  .then(itemData => setFullItem(itemData))
}

export default authentication;