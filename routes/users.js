const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  let filtered_users = users.filter((user => user.email === req.query.email));

  if (filtered_users.length > 0){
    res.send(filtered_users);
  }
  else{
    res.send("Unable to find user!");
  }
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.email;
  const DOB = req.query.DOB;
  users.push({"firstName":firstName, "lastName":lastName, "email":email, "DOB":DOB});
  res.send("The user" + (' ')+ (req.query.firstName) + " Has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {

    const email = req.params.email;
    // get de user to modify
    let filtered_users = users.filter((user => user.email === email));

    if (filtered_users.length > 0){
        let filtered_user = filtered_users[0];
        
        const DOB = req.query.DOB;
        if (DOB) {
            filtered_user.DOB = DOB;
        }

        const firstName = req.query.firstName;
        if (firstName) {
            filtered_user.firstName = firstName;
        }

        const lastName = req.query.lastName;
        if (lastName) {
            filtered_user.lastName = lastName;
        }

        // quit de modified user from de users
        users = users.filter((user) => user.email != email);
        // add de modified user
        users.push(filtered_user);
        res.send(`User with the email ${email} updated.`);
    }
    else{
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
    users = users.filter((user) => user.email != email);
    res.send(`User with the email  ${email} deleted.`);
});

module.exports=router;


module.exports=router;
