const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  /*
We will create an application that lists arrays within an object as looping through objects are useful
We will use for (let key in obj)

This application will allow hosts to give add users to their chat server, assign roles through permissions that are true or untrue

CHALLENGE,
Make a function and command to turn all permissions off and all permissions on

CHALLENGE 2,
Using the role object, make commands to assign different roles by looping through the settings and assing the values of the chosen role
*/

// Planning:
// This "application" will contain 5 main functions as following: 
// createUsers(): command === "create users" -->  add users to users list[] with .push function
// assignRole(): command === "assign role" --> adding a new default role by giving 6 false setting conditions
// function listUsers(): command === "list users" --> read through the list of users 
// function assignPermissions():  give individual permissions 
// function showPermissions(): read through the list of users and permissions of roles: Console log all user name, role, and permissions[key] 

let users = [];

//CHALLENGE 2 ONLY
let role = {
  moderator:{
    darkMode:true,
    sensitivityAmount:false,
    editAccounts:true,
    deleteAccounts:false,
    createChannels:false,
    editChannels:true
  },
  simple:{
    darkMode:true,
    sensitivityAmount:false,
    editAccounts:false,
    deleteAccounts:false,
    createChannels:false,
    editChannels:false
  },
  coAdmin:{
    darkMode:true,
    sensitivityAmount:true,
    editAccounts:true,
    deleteAccounts:false,
    createChannels:true,
    editChannels:true
  }
};

let settings = {
    darkMode:true,
    sensitivityAmount:true,
    editAccounts:true,
    deleteAccounts:true,
    createChannels:true,
    editChannels:true
}

function createUsers(){
      //user readline to prompt for the name of the user to be added
      readline.question("What is the name of user? ", _name => {
        users.push({user: _name, role: " ", permissions: {} });        // add user to user list as an object
        console.log(`${_name} has been added to user list!`);   //notify user has added to the list
        StartApp();
    })
  }

function assignRole(){
    //user readline to prompt for the new roles to be added to system
    // Add new role with default permissions
    const defaultRole = {
      darkMode: false,
      sensitivityAmount: false,
      editAccounts: false,
      deleteAccounts: false,
      createChannels: false,
      editChannels: false,
    };

    readline.question("What is the name of new role? ", roleName => {
      if (role[roleName]) {
        console.log(`The role "${roleName}" already exists.`);   
        assignRole();   
      }else{
      role[roleName]=defaultRole    // add a default permissions role 
      console.log(`${roleName} has been created with default permissions!`);   
      StartApp();
    }})
}

function listUsers() {
  if (users.length > 0) {
    console.log("Current Users: ");
    users.forEach((user) => {
      console.log(`${user.user}, Role: ${user.role}`);  //list out user name and role
    });
    StartApp();
  } else {
    console.log("No users found. Try again."); // when users.length<0, then no user in list 
    StartApp();
  }
}

function assignPermissions() {
  readline.question("Please enter the username before assigning permissions: ", (userName) => {
    const inlist = users.find((u) => u.user === userName);
    if (inlist) {
      readline.question(`What role do you want to assign to ${userName}?`, (roleName) => {
        if (role[roleName]) {
          inlist.role = roleName;
          inlist.permissions = { ...role[roleName] }; // Assign corresponding permissions based on the role
          console.log(`Role "${roleName}" assigned to user "${userName}".`);
          StartApp();
        } else {
          console.log(`Role "${roleName}" does not exist. Please try again.`);
          StartApp();
        }
      });
    } else {
      console.log(`User "${userName}" does not exist. Please try again.`);
      StartApp();
    }
  });
}

function showPermissions(){
//loop through all the users settings and roles based on their permissions
console.log("User Permissions:");
users.forEach((inlist) => {
  console.log(`Name: ${inlist.user}, Role: ${inlist.role}`);
for (let key in inlist.permissions) {
  console.log(`${key}: ${inlist.permissions[key]}`);
}
});
StartApp();
}

function togglePermissions(state) {
  users.forEach((user) => {
    for (let key in user.permissions) {
      user.permissions[key] = state;
    }
  });
  console.log(`All permissions have been turned ${state ? "on" : "off"}`); //on is true; off is false
  StartApp();
}

function StartApp() {
  readline.question("What would you like to do? ", (_command) => {
    if(_command === "quit"){
      readline.close();
      // quit when command "quit"
    } else if(_command === "create user"){
      //add name to user list
      createUsers();
    } else if(_command === "assign role"){
      //assign role to users
      assignRole();
    } else if(_command === "list users"){
      //list out names in user list
      listUsers();
    } else if(_command === "assign permission"){
      //assign permission to assign role 
      assignPermissions();
    } else if(_command === "show permission"){
      //show permission setting values
      showPermissions();
    } else if(_command === "turn all permissions on"){
      //show permission setting values
      togglePermissions(true);
    } else if(_command === "turn all permissions off"){
      //show permission setting values
      togglePermissions(false);
    } else {
      console.log("Unknown command. Please try again.");
    //unknown command, ask try again
    StartApp(); 
  }});
}

StartApp();


// The code and planning are presented clearly and are easy to read and review. I love how you note a few lines of code to better understand its purpose - Angie


//I like how the code are organized in the way that the host can create user, make new default role, and assign permission to the user. The turn on/ off is very cleary written. Nice work! - Sophia 