// // // Sample ToDo data
// // let todos = [];

// // function renderTodos() {
// //     const todoList = document.getElementById("todoList");
// //     todoList.innerHTML = "";

// //     for (let index = 0; index < todos.length; index++) {
// //         const todo = todos[index];

// //         const listItem = document.createElement("li");
// //         listItem.innerHTML = `
// //             <span>${todo}</span>
// //             <button class="editBtn">Edit</button>
// //             <button class="deleteBtn">Delete</button>
// //         `;
// //         todoList.appendChild(listItem);

// //         // Add event listeners
// //         const editBtn = listItem.querySelector(".editBtn");
// //         const deleteBtn = listItem.querySelector(".deleteBtn");

// //         editBtn.addEventListener("click", () => editTodo(index, listItem));
// //         deleteBtn.addEventListener("click", () => deleteTodo(index));
// //     }
// // }

// // function addTodo() {
// //     const todoInput = document.getElementById("todoInput");
// //     const todoText = todoInput.value.trim();

// //     if (todoText !== "") {
// //         todos.push(todoText);
// //         todoInput.value = "";
// //         renderTodos();
// //     }
// // }

// // function editTodo(index, listItem) {
// //     const spanElement = listItem.querySelector("span");

// //     const newTodoText = prompt("Edit ToDo", todos[index]);
// //     if (newTodoText !== null) {
// //         todos[index] = newTodoText.trim();
// //         spanElement.textContent = newTodoText;
// //     }
// // }

// // function deleteTodo(index) {
// //     if (confirm("Are you sure you want to delete this ToDo?")) {
// //         todos.splice(index, 1);
// //         renderTodos();
// //     }
// // }

// // // Initial rendering
// // renderTodos();



// import {
//     collection,
//     addDoc,
//     db,
//     serverTimestamp,
//     onSnapshot,
//     query,
//     orderBy,
//     getDocs,
//     deleteDoc,
//     doc,
//     updateDoc,
//   } from "./firebase.js";
  
//   //Sending data to firestore
//   let input = document.getElementById("input");
//   let list_item = document.getElementById("list_item");
  
//   const addItem = async (e) => {
//     e.preventDefault();
  
//     if (input.value.trim() !== "") {
//       if (input.value.length < 23) {
//         const docRef = await addDoc(collection(db, "todos"), {
//           value: input.value,
//           timestamp: serverTimestamp(),
//         });
//       } else {
//         alert("value should be lower 22 leter");
//       }
//     } else {
//       alert("Can't add an empty value");
//     }
//     input.value = "";
//   };
//   const addItem_btn = document.getElementById("addItem_btn");
//   addItem_btn.addEventListener("click", addItem);
  
//   //Button event listener
//   const getElements = () => {
//     let editButtons = document.querySelectorAll(".edit_btn");

//     let deleteButtons = document.querySelectorAll(".del_btn");
//     console.log(editButtons,deleteButtons)
//     editButtons.forEach((button, i) => {
//         console.log(button,i)
//       button.addEventListener("click", () => {
//         editItem(i);
//       });
//     });
  
//     deleteButtons.forEach((button, i) => {
//       button.addEventListener("click", () => {
//         deleteItem(i);
//       });
//     });
//   };
  
//   //Edit Button
//   const editItem = async (index) => {
//     let newValue = prompt("Enter new value:");
  
//     if (newValue !== null) {
//       if (newValue.length < 23) {
//         // Update Firestore data
//         const ref = query(collection(db, "todos"), orderBy("timestamp", "desc"));
//         const querySnapshot = await getDocs(ref);
//         const documents = querySnapshot.docs;
//         const docId = documents[index].id;
  
//         await updateDoc(doc(db, "todos", docId), {
//           value: newValue,
//           timestamp: serverTimestamp(),
//         });
  
//         // Update UI
//         let paragraphs = document.querySelectorAll(".para");
//         paragraphs[index].textContent = newValue;
//       } else {
//         alert("Value should be less than 20 characters");
//       }
//     } else {
//       alert("Can't add an empty value");
//     }
//   };
  
//   //Delete button
//   const deleteItem = async (index) => {
//     const ref = query(collection(db, "todos"), orderBy("timestamp", "desc"));
//     const querySnapshot = await getDocs(ref);
//     const documents = querySnapshot.docs;
//     const docId = documents[index].id;
//     await deleteDoc(doc(db, "todos", docId));
//   };
  
//   //Getting data from FireStore & Display
//   const getData = async () => {
//     const ref = query(collection(db, "todos"), orderBy("timestamp", "desc"));
//     const unsubscribe = onSnapshot(ref, (querySnapshot) => {
//       list_item.innerHTML = "";
//       querySnapshot.forEach((doc) => {
//         list_item.innerHTML += `
//           <div class="list_item">
//             <div>
//               <p class="para">${doc.data().value}</p>
//             </div>
//             <div>
//               <button class="edit_btn">Edit</button>
//               <button class="del_btn">Delete</button>
//             </div>
//           </div>
//         `;
//       });
//       getElements();
//     });
//   };
//   getData();


//my js 
let input = document.querySelector("#input");
let addItem_btn = document.querySelector("#addItem_btn");
let deleteAll = document.getElementById("deleteAll");
let todoDisplay = document.querySelector("#todoDisplay");
let list_item ;
let inputValue;
let number = 0
let todoAdd = (e) => {
    e.preventDefault();
   inputValue = input.value;
if (!inputValue.trim()){
  alert("write something")
  return // exit the function if input is empty
}

    todoDisplay.innerHTML += `
        <div class="list_item">
            <div>
        
           <input class="InputAndPara" type="text"  value="${inputValue}" readonly maxlength="26" >
            </div>
            <div>
                <button class="edit_btn">Edit</button>
                <button class="del_btn">Delete</button>
            </div>
        </div>
    `;
    // Add event listeners for Edit and Delete buttons
    let editBtns = document.querySelectorAll(".edit_btn");
    let deleteBtns = document.querySelectorAll(".del_btn");

    editBtns.forEach((editBtn) => {
        editBtn.addEventListener("click", handleEdit);
    });

    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", handleDelete);
    });

    input.value = ""; // Clear input after adding a todo
};

let edit = false
let handleEdit = (e) => {
if(edit){
  e.target.parentNode.querySelector(".edit_btn").innerHTML = "Edit"
  let list_item = e.target.parentNode.parentNode
  list_item.querySelector(".InputAndPara").readOnly = true;
  list_item.querySelector(".InputAndPara").style.outlineStyle = "none";
  list_item.querySelector(".InputAndPara").style.outlineColor = "none";
  list_item.querySelector(".InputAndPara").blur(); 
  edit = false
}
else{
  e.target.parentNode.querySelector(".edit_btn").innerHTML = "Save"
  let list_item = e.target.parentNode.parentNode
list_item.querySelector(".InputAndPara").readOnly = false;
list_item.querySelector(".InputAndPara").style.outlineStyle = "dotted"; // Use "solid" or other valid values
list_item.querySelector(".InputAndPara").style.outlineColor = "black";
list_item.querySelector(".InputAndPara").focus(); 
edit = true
}
};

let handleDelete = (e) => {

 let confirmDelete =  confirm("are you sure?")
if (confirmDelete){
  const listItem = e.target.parentElement.parentElement;
  // Check if listItem is found
  if (listItem) {
      // Remove the listItem from the DOM
      listItem.innerHTML = ""//for text
      listItem.classList = "" //for ui
  // or
      // listItem.remove()  
  }
}


};

deleteAll.addEventListener("click", (e) => {
  e.preventDefault();

  if (todoDisplay.innerHTML.trim() === "") {
    alert("No todos to delete");
  } else {
    let confirmed = confirm("Are you sure you want to delete all todos?");
    if (confirmed) {
      todoDisplay.innerHTML = "";
    }
  }
});

addItem_btn.addEventListener("click", todoAdd);



