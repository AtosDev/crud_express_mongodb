const BtnAllusers = document.getElementById("getusers");
const Btnuser = document.getElementById("getuser-id");
const Btncreate = document.getElementById("postuser");
//const BtnEdit = document.getElementById("putuser-id");
const BtnDel = document.getElementById("deluser-id");
const BtnDelAll = document.getElementById("delallusers");

BtnAllusers.addEventListener("click", () => {
  document.getElementById("tbod").textContent = ""
  axios
    .get("https://crud-express-mongodb-basic.herokuapp.com/users")
    .then((response) => {
      dataUsers = response.data;
      console.log(dataUsers);
       if (dataUsers.length === 0) {
        alert("Please Create a User first!!");
      } else {
        for (i = 0; i < dataUsers.length; i++) {
          //This loop, will loop over the all the available users.
          //console.log(dataUsers[i]); //will give us all the available users in console

          let iddata = dataUsers[i]
          //console.log(iddata);

          //console.log(dataUsers[i]._id);


          let trUsers = document.createElement("tr");
          let td1 = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");

 
          var btn1edit = document.createElement('button')
          btn1edit.textContent = "EDIT"
          btn1edit.addEventListener('click', function() { EDIT(iddata._id) })

          var btn2delete = document.createElement('button')
          btn2delete.textContent = "DELETE"
          //btn2delete.onclick = () => { DELETE(dataUsers[i]._id) } 
          btn2delete.onclick = function () { DELETE(iddata._id) }

          let td4 = document.createElement("td")
          let td5 = document.createElement("td")


          td1.appendChild(document.createTextNode(dataUsers[i].name));
          td2.appendChild(document.createTextNode(dataUsers[i].email));
          td3.appendChild(document.createTextNode(dataUsers[i].address));
          td4.appendChild(btn1edit)
          td5.appendChild(btn2delete)


          trUsers.appendChild(td1);
          trUsers.appendChild(td2);
          trUsers.appendChild(td3);
          trUsers.appendChild(td4);
          trUsers.appendChild(td5);
          document.getElementById("tbod").appendChild(trUsers);
          //console.log(dataUsers[i]._id);
        }

      }
      //console.log(ID);
      //console.log(response.data); giving us the response data means the empty bracket
      //console.log(dataUsers[0]); giving us the first user, which have index 0.
    })
    .catch((error) => {
      console.log(error);
    });
});


Btncreate.addEventListener("click", () => {
  let inpName = document.getElementById("crN").value;
  let inpEmail = document.getElementById("crE").value;
  let inpAddr = document.getElementById("crA").value;
  const URL = "https://crud-express-mongodb-basic.herokuapp.com/user";
  if (!inpName || !inpEmail || !inpAddr) {
    //if(inpName === ""||inpEmail === "" || inpAddr ==="") {}
    alert("Input All Fields");
  }
  axios
    .post(URL, {
      name: inpName,
      email: inpEmail,
      address: inpAddr,
    })
    .then((response) => {
      alert(`USER is added `);
      console.log(response.data);
    })
    .catch((error) => {
      alert("Enter All fields Correctly Please!!");
      console.log(error);
    });
    document.getElementById("crN").value = ""
    document.getElementById("crE").value = ""
    document.getElementById("crA").value = ""
});

Btnuser.addEventListener("click", () => {
  let InpgetUser = document.getElementById("get_user").value;
  document.getElementById("tbod").textContent = ""
  axios
    .get(`https://crud-express-mongodb-basic.herokuapp.com/user/${InpgetUser}`)
    .then((response) => {
      //console.log(response.data);
      datauser = response.data;
      //console.log(datauser);
      let trUsers = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      td1.appendChild(document.createTextNode(datauser.name));
      td2.appendChild(document.createTextNode(datauser.email));
      td3.appendChild(document.createTextNode(datauser.address));
      trUsers.appendChild(td1);
      trUsers.appendChild(td2);
      trUsers.appendChild(td3);
      document.getElementById("tbod").appendChild(trUsers);
    })
    .catch((error) => {
      alert(`${error}, User doesn't Exist`)
      console.log(error);
    });
});


 function EDIT(editid) {
  let editNam = document.getElementById("Edna").value;
  let editEmai = document.getElementById("Edem").value;
  let editAddr = document.getElementById("EdAddr").value;
  axios
    .put(`https://crud-express-mongodb-basic.herokuapp.com/user/${editid}`, {
      name: editNam,
      email: editEmai,
      address: editAddr,
    })
    .then((response) => {
      alert('User Updated Successfully')
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  document.getElementById("Edna").value = ""
  document.getElementById("Edem").value = ""
  document.getElementById("EdAddr").value = ""
}

function DELETE(editid){
  axios
  .delete(`https://crud-express-mongodb-basic.herokuapp.com/user/${editid}`)
  .then((response) => {
    alert("User Deleted Succesfully")
    console.log(response.data +" "+ response.status);
  })
  .catch((error) => {
    console.log(error);
  });
}


BtnDel.addEventListener("click", () => {
  const DeleID = document.getElementById("delid").value;
  axios
    .delete(`https://crud-express-mongodb-basic.herokuapp.com/user/${DeleID}`)
    .then((response) => {
      alert("User Deleted Succesfully")
      console.log(response.data +" "+ response.status);
    })
    .catch((error) => {
      console.log(error);
    });
});

BtnDelAll.addEventListener("click", () => {
  axios
    .delete("https://crud-express-mongodb-basic.herokuapp.com/userdelall")
    .then((response) => {
      alert("All User Deleted Successfully")
      console.log(response.data +" "+ response.status);
    })
    .catch((error) => {
      console.log(error);
    });
});


