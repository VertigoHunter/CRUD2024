import Cargo_Bay_Logo from './CargoBay.png';
// import ReactDom from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect, createContext, useContext } from "react";
import useEditModeToggle from './useEditModeToggle';
// import { GuestInventory } from './GuestInventory';
// import { ManagerInventory} from './ManagerInventory';

// export const userContext = React.createContext();

export default function App() {

  /* THIS SECTION HOLDS STATE VARIABLES*/
  const [editMode, setEditMode] = useEditModeToggle();
  //const [editFlag, setEditFlag] = useState();   // This determines whether you have enabled Edit Mode.
  //const [viewFlag, setViewFlag] = useState();   // This determines whether you are seeing the inventory or an item.
  const [greeting, setGreeting] = useState("Guest");
  useEffect(() => {setGreeting('Scruffy Nerfherder')});

  //const [inventory, setInventory] = useState(0);         // This displays and controls the full inventory.
  const [inventory, setInventory] = useState();
  //const [selectedItem, setSelectedItem] = useState();   // This displays the selected item.

  const [createFirstName, setCreateFirstName] = useState(); // This stores the entered user account information for signup.
  const [createLastName, setCreateLastName] = useState();   // This stores the entered user account information for signup.
  const [createUserName, setCreateUserName] = useState();   // This stores the entered user account information for signup.
  const [createPassword, setCreatePassword] = useState();   // This stores the entered user account information for signup.

  //const [loginUserName, setLoginUserName] = useState(); // This stores the username for authentication.
  //const [loginPassword, setLoginPassword] = useState(); // This stores the password for authentication.

  const [userInfoID, setUserInfoID] = useState(2);   // This stores the item name for inventory adjustment.
  const [itemName, setItemName] = useState("");       // This stores the item name for inventory adjustment.
  const [description, setDescription] = useState(""); // This stores the description for inventory adjustment.
  const [quantity, setQuantity] = useState("");       // This stores the quantity for inventory adjustment.

    /* THIS SECTION HOLDS METHODS AND ACTIONS */
    useEffect(()=> {
      fetch('http://localhost:8081/item')
      .then(response => response.json())
      .then(inventoryData => setInventory(inventoryData))
    },[inventory])

  const addUser = () =>{
    fetch('http://localhost:8081/user_info/', {
      method: 'POST',
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

  const addItem = () =>{
    fetch('http://localhost:8081/item', {
      method: 'POST',
      body: JSON.stringify({
        user_info_ID: userInfoID,
        item_name: itemName,
        description: description,
        quantity: quantity
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  return !inventory ? null : (
  <div className="App">
      <header className="App-header">
        <img src={Cargo_Bay_Logo} className="App-logo" alt="logo" />
      </header>

      <div>Welcome to the Cargo Bay, {(greeting)}.</div>

      <div className="begin-container">
        <div className="signUp-panel">
          <p>SIGN UP SECTION.</p>
          <input type="text" name="first" onChange={(e) => { setCreateFirstName(e.target.value) }} value={createFirstName} placeholder="First Name"/>
          <input type="text" name="last" onChange={(e) => { setCreateLastName(e.target.value) }} value={createLastName} placeholder="Last Name"/>
          <input type="text" name="username" onChange={(e) => { setCreateUserName(e.target.value) }} value={createUserName} placeholder="User Name"/>
          <input type="password" name="password" onChange={(e) => { setCreatePassword(e.target.value) }} value={createPassword} placeholder="Password"/>
          <br></br>
          <button onClick={() => {addUser()}}>Create Account</button>
        </div>

        <div className="login-panel">
          <p>LOGIN SECTION.</p>
          <input type="text" name="username_login" value="" placeholder="User Name"/>
          <input type="password" name="password_login" value="" placeholder="Password"/>
          <br></br>
          <button onClick={() => { }}>Login</button>
        </div>
      </div>

      <button onClick={setEditMode}>
        {editMode ? 'Edit Mode Enabled' : 'Click To Enable Edit Mode'}
      </button>

      <div className="edit-mode">
        <div className="edit-enabled">
          <p>EDIT MODE ACTIONS</p>
          <input type="text" name="user info ID" onChange={(e) => { setUserInfoID(e.target.value) }} value={userInfoID} placeholder="Input Your User Info ID"/>
          <input type="text" name="item name" onChange={(e) => { setItemName(e.target.value) }} value={itemName} placeholder="Input Item Name"/>
          <input type="text" name="description" onChange={(e) => { setDescription(e.target.value) }} value={description} placeholder="Input Description"/>
          <input type="text" name="quantity" onChange={(e) => { setQuantity(e.target.value) }} value={quantity} placeholder="Input Quantity"/>
          <button onClick={() => {addItem()}}>Create Item</button>
          <br></br>
          <button onClick={() => { }}>Edit Item</button>
          <button onClick={() => { }}>Delete Item</button>
          </div>
        <div className="edit-disabled"></div>
      </div>

      <div className="edit-bar">
        <p>dead edit bar</p>

      </div>

      <div className="view-bar">
        <p>VIEW ACTIONS</p>
        <button onClick={() => { }}>View Item</button>
      </div>

      <div className='inventoryTable'>
        <table>
          <tbody>
          <tr className='columntitle'>
            <th>Item ID</th>
            <th>User ID</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
          {inventory.map((inventory, index) =><tr><td>{inventory.item_ID}</td><td>{inventory.user_info_ID}</td><td>{inventory.item_name}</td><td>{inventory.description}</td><td>{inventory.quantity}</td></tr>)}
          </tbody>
        </table>
      </div>
  </div>
  );
}
