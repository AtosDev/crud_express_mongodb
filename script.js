const BtnAllusers = document.getElementById("getusers");
const Btncreate = document.getElementById("postuser");
const BtnDelAll = document.getElementById("delallusers");

let users;

BtnAllusers.addEventListener("click", () => {
  document.getElementById("tbod").textContent = "";
  setTimeout(() => {
  tableShowUser();
  },1000)
});

Btncreate.addEventListener("click", () => {
  document.getElementById("tbod").innerText = "";

  let inpName = document.getElementById("crN").value;
  let inpEmail = document.getElementById("crE").value;
  let inpAddr = document.getElementById("crA").value;
  const URL = "https://crud-express-mongodb-basic.herokuapp.com/user";
  /* if (!inpName || !inpEmail || !inpAddr) {
    //if(inpName === ""||inpEmail === "" || inpAddr ==="") {}
    alert("Input All Fields");
  } */
  axios
    .post(URL, {
      name: inpName,
      email: inpEmail,
      address: inpAddr,
    })
    .then((response) => {
      alert(`USER is added `);
      console.log(response.data);
      tableShowUser();
    })
    .catch((error) => {
      alert(`Input All Fields, ${error}`);
      console.log(error);
    });
  document.getElementById("crN").value = "";
  document.getElementById("crE").value = "";
  document.getElementById("crA").value = "";
  /*   setTimeout(() => {
    tableShowUser();
  }, 1000); */
});

function inp(id, index) {
  let singUser = users[index];
  document.querySelector(".bg-modal").setAttribute = (id, `${id}`);
  document.querySelector(".bg-modal").textContent = `
  <div id="display" class="modal-content">
  <div class="cross">+</div>
  <h3>Name</h3>
  <input type="text" class="inp-modal" id="upName">
  <h3>Email</h3>
  <input type="email" class="inp-modal" id="upEmail">
  <h3>Address</h3>
  <input type="text" class="inp-modal" id="upAddress">
  <button class="update">UPDATE</button>
</div>
`;

  /*  document.getElementById("upName").ariaPlaceholder = 
  let name = document.getElementById("upName").value;
  let email = document.getElementById("upEmail").value;
  let address = document.getElementById("upAddress").value; */
}

function upDATE(id) {
  console.log(id);
  let name = document.getElementById("upName").value;
  let email = document.getElementById("upEmail").value;
  let address = document.getElementById("upAddress").value;
  if (name == "" && email == "" && address == "") {
    alert("Please Enter Something in USER input field(s)!!");
  } else {
    axios
      .put(`https://crud-express-mongodb-basic.herokuapp.com/user/${id}`, {
        name,
        email,
        address, //if value pairs have same name then we can write it like this
      })
      .then((response) => {
        setTimeout(() => {
          alert("User Updated Successfully");
          console.log(response.data);
          setTimeout(() => {
            tableShowUser();
          }, 1000);
        },1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setTimeout(() => {
    document.getElementById("upName").value = "";
    document.getElementById("upEmail").value = "";
    document.getElementById("upAddress").value = "";
  }, 2000);
  cLose();
  /*   setTimeout(() => {
    tableShowUser();
  }, 1000); */
}

function cLose() {
  document.querySelector(".bg-modal").style.display = "none";
}
document.querySelector(".cross").addEventListener("click", cLose);

function editwindow() {
  document.querySelector(".bg-modal").style.display = "flex";
}

function tableShowUser() {
  document.getElementById("tbod").textContent = "";
  document.getElementById("tbod").innerText = "";
  const updBtn = document.querySelector(".update");

  axios
    .get("https://crud-express-mongodb-basic.herokuapp.com/users")
    .then((response) => {
      dataUsers = response.data;
      //console.log(dataUsers);
      if (dataUsers.length === 0) {
        alert("Please Create a User first!!");
      } else {
        dataUsers.map((item, index) => {
          //console.log(index, " ", item);
          let iddata = item;
          //let serial = index
          // console.log(serial);
          //console.log(iddata._id);
          //console.log(iddata, serial);
          var id = item._id;
          //console.log(id);

          let trUsers = document.createElement("tr");
          let td1 = document.createElement("td");
          td1.id = `${id}_userName`;
          let td2 = document.createElement("td");
          td2.id = `${id}_Useremail`;
          let td3 = document.createElement("td");
          td3.id = `${id}_Useraddress`;
          let td4 = document.createElement("td");
          let td5 = document.createElement("td");
          let td6 = document.createElement("td");

          var btn1edit = document.createElement("button");
          btn1edit.textContent = "EDIT";

          var btn2delete = document.createElement("button");
          btn2delete.textContent = "DELETE";

          btn1edit.addEventListener("click", () => {
            editwindow();
            console.log(index);
            updBtn.addEventListener("click", function () {
              upDATE(iddata._id, index);
            });
          });

          //console.log(td1);
          //console.log(td2);
          //console.log(td3);

          td1.appendChild(document.createTextNode(item.name));
          td2.appendChild(document.createTextNode(item.email));
          td3.appendChild(document.createTextNode(item.address));
          td4.appendChild(btn1edit);
          td5.appendChild(btn2delete);
          td6.appendChild(document.createTextNode(item._id));

          trUsers.appendChild(td1);
          trUsers.appendChild(td2);
          trUsers.appendChild(td3);
          trUsers.appendChild(td4);
          trUsers.appendChild(td5);
          trUsers.appendChild(td6);
          document.getElementById("tbod").appendChild(trUsers);

          btn2delete.onclick = function () {
            DELETE(`${item._id}`);
          };
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//console.log(btn1edit);

function DELETE(id) {
  axios
    .delete(`https://crud-express-mongodb-basic.herokuapp.com/user/${id}`)
    .then((response) => {
      alert("User Deleted Succesfully");
      console.log(response.data + " " + response.status);
      tableShowUser();
    })
    .catch((error) => {
      console.log(error);
    });
}

BtnDelAll.addEventListener("click", () => {
  axios
    .delete("https://crud-express-mongodb-basic.herokuapp.com/userdelall")
    .then((response) => {
      alert("All User Deleted Successfully");
      console.log(response.data + " " + response.status);
      setTimeout(() => {
        document.getElementById("tbod").innerText = "";
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
});

//----------------------------------------------------------------------------------------------//

/* axios
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

      let iddata = dataUsers[i];
      //console.log(iddata);

      //console.log(dataUsers[i]._id);

      let trUsers = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");

      var btn1edit = document.createElement("button");
      btn1edit.textContent = "EDIT";
      //btn1edit.addEventListener('click', function() { EDIT(iddata._id) })
      btn1edit.addEventListener("click", () => {
        editwindow();
      });

      document.querySelector(".update").addEventListener("click", () => {
        upDATE(iddata._id);
      });

      var btn2delete = document.createElement("button");
      btn2delete.textContent = "DELETE";
      //btn2delete.onclick = () => { DELETE(dataUsers[i]._id) }
      btn2delete.onclick = function () {
        DELETE(iddata._id);
      };

      let td4 = document.createElement("td");
      let td5 = document.createElement("td");

      td1.appendChild(document.createTextNode(dataUsers[i].name));
      td2.appendChild(document.createTextNode(dataUsers[i].email));
      td3.appendChild(document.createTextNode(dataUsers[i].address));
      td4.appendChild(btn1edit);
      td5.appendChild(btn2delete);

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
 */
