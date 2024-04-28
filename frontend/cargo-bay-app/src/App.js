import Cargo_Bay_Logo from './CargoBay.png';
import trashbin from './trashbin.png';
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
  const [greeting, setGreeting] = useState("Guest");
  useEffect(() => {setGreeting('Scruffy Nerfherder')});

  const [inventory, setInventory] = useState();

  const [createFirstName, setCreateFirstName] = useState(); // This stores the entered user account information for signup.
  const [createLastName, setCreateLastName] = useState();   // This stores the entered user account information for signup.
  const [createUserName, setCreateUserName] = useState();   // This stores the entered user account information for signup.
  const [createPassword, setCreatePassword] = useState();   // This stores the entered user account information for signup.

  const [loginUserName, setLoginUserName] = useState(); // This stores the username for authentication.
  const [loginPassword, setLoginPassword] = useState(); // This stores the password for authentication.

  // The following store information for adding new items to the database.
  const [userInfoID, setUserInfoID] = useState(2);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  // The following store information for editing items that exist in the database.
  const [updateUserInfoID, setUpdateUserInfoID] = useState("");
  const [updateItemName, setUpdateItemName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");

  // The following stores the target item_ID for update and delete actions.
  // const [updateTargetItemID, setUpdateTargetItemID] = useState("");
  const [killTargetItemID, setKillTargetItemID] = useState("");

    /* THIS SECTION HOLDS METHODS AND ACTIONS */
    useEffect(()=> {
      fetch('http://localhost:8081/item')
      .then(response => response.json())
      .then(inventoryData => setInventory(inventoryData))
    },[])
  // },[inventory])

  const addUser = () =>{
    fetch('http://localhost:8081/user_info', {
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

  // const loginUser = () =>{
  //   fetch('http://localhost:8081/user_info', {
  //     method: 'GET',
  //     user_name: loginUserName,
  //     password: loginPassword
  //   })
  // }

  const addItem = () =>{
    fetch('http://localhost:8081/item', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userInfoID,
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

  const editItem = (item_ID) =>{
    // targetItemID = item_ID;
    fetch('http://localhost:8081/item/${item_ID}', {
      method: 'PATCH',
      body: JSON.stringify({
        user_id: updateUserInfoID,
        item_name: updateItemName,
        description: updateDescription,
        quantity: updateQuantity
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }


  // function onDeleteItem(){
  //   var id = document.getElementById("selectedItemId").value;
  //   const deleted = fetch('http://localhost:8081/${item_ID}',{
  //     method: 'DELETE',
  //     headers: {'Content-type': 'application/json; charset=UTF-8'}
  //   })
  // }

  // const deleteItem = () =>{
  //   fetch('http://localhost:8081/item/4', {
  //       method: 'DELETE',
  //       headers: {'Content-type': 'application/json; charset=UTF-8'}
  //     });
  // }

  const deleteItem = (id) =>{
    inventory.id = id;
    fetch(`http://localhost:8081/item/`+`${id}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json; charset=UTF-8'}
      });
  }

  const ManualDeleteItem = (id) =>{
    // const [killTargetItemID, setKillTargetItemID] = useState("");
    id = killTargetItemID;
    fetch(`http://localhost:8081/item/`+`${id}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json; charset=UTF-8'}
      });
  }

  const RenderEditBar = () =>{
    if (editMode)
      return(
        <>
          <div className="edit-enabled">
            <h3>EDIT MODE ACTIONS</h3>
            {/* For adding new items to the Database */}
            <input type="text" name="user info ID" onChange={(e) => { setUserInfoID(e.target.value) }} value={userInfoID} placeholder="Input Your User Info ID" />
            <input type="text" name="item name" onChange={(e) => { setItemName(e.target.value) }} value={itemName} placeholder="Input Item Name" />
            <input type="text" name="description" onChange={(e) => { setDescription(e.target.value) }} value={description} placeholder="Input Description" />
            <input type="text" name="quantity" onChange={(e) => { setQuantity(e.target.value) }} value={quantity} placeholder="Input Quantity" />
            <button onClick={() => { addItem() }}>Create Item</button>
            <h6>Input new item information above and click create.</h6>
            <br></br>
            {/* For editing items that exist in the Database */}
            <input type="text" name="update user info ID" onChange={(e) => { setUpdateUserInfoID(e.target.value) }} value={updateUserInfoID} placeholder="Change User Info ID" />
            <input type="text" name="update item name" onChange={(e) => { setUpdateItemName(e.target.value) }} value={updateItemName} placeholder="Change Item Name" />
            <input type="text" name="update description" onChange={(e) => { setUpdateDescription(e.target.value) }} value={updateDescription} placeholder="Change Description" />
            <input type="text" name="update quantity" onChange={(e) => { setUpdateQuantity(e.target.value) }} value={updateQuantity} placeholder="Change Quantity" />
            <h6>Input updated item information and select the row to update below.</h6>
            <input type="text" name="target for kill" onChange={(e) => { setKillTargetItemID(e.target.value) }} value={killTargetItemID} placeholder="Select Item_ID for Deletion" />
            <button onClick={() => {{ ManualDeleteItem(killTargetItemID) }} }>Delete Item</button>
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
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {inventory.map((inventory, index) =>
                  <tr key={index}>
                    <td>{inventory.id}</td>
                    <td>{inventory.user_id}</td>
                    <td>{inventory.item_name}</td>
                    <td>{inventory.description}</td>
                    <td>{inventory.quantity}</td>
                    <td><button onClick={() => {{ editItem(inventory.id) }} }>Update</button></td>
                    <td><button onClick={() => {{ deleteItem(inventory.id)}} } className="trashbutton"><img src={trashbin} alt="trashbin" className='trashimage'></img></button></td>
                    {/* <td><button onClick={() => { { setTargetItemID(inventory.item_ID) } { editItem(targetItemID) } }}>Update</button></td>
                    <td><button onClick={() => { { setTargetItemID(inventory.item_ID) } { deleteItem(targetItemID) } }} className="trashbutton"><img src={trashbin} alt="trashbin" className='trashimage'></img></button></td> */}
                  </tr>)}
              </tbody>
            </table>
          </div>
        </>)
    else
      return(
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
            {inventory.map((inventory, index) =>
              <tr key={index}>
                <td>{inventory.id}</td>
                <td>{inventory.user_id}</td>
                <td>{inventory.item_name}</td>
                <td>{inventory.description}</td>
                <td>{inventory.quantity}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      )
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

      <button onClick={setEditMode}>{editMode ? 'Edit Mode On ' : 'Edit Mode Off'}</button>
      <RenderEditBar/>
  </div>
  );
}
