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
import{  db,collection,addDoc,doc,onSnapshot,query,serverTimestamp,orderBy,getDocs,deleteDoc,updateDoc, } from "./firebase.js"

// JavaScript code for the Todo app
let input = document.querySelector("#input");
let addItem_btn = document.querySelector("#addItem_btn");
let deleteAll = document.getElementById("deleteAll");
let todoDisplay = document.querySelector("#todoDisplay");
let inputValue;
let edit = false;


//getRealTimeDataFromFirebase
let getData = async ()=>{
  const gettodos = collection(db, "Todos");
const unsubscribe = onSnapshot(gettodos, (snapshot) => {
  snapshot.docChanges().forEach((getTodo) => {
 console.log(getTodo)
if(getTodo.type === "removed"){
var todoRemoveFromUI = document.getElementById(getTodo.doc.id)
if(todoRemoveFromUI){  
  todoRemoveFromUI.remove()  //yeh remove all mai bhand marta toh esi lya if lagaya

}
// dtodo.innerHTML = ""

}else if(getTodo.type === "added"){
  todoDisplay.innerHTML += `
  <div class="list_item" id="${getTodo.doc.id}">
  <div>
                  <!-- Input field displaying the todo text -->
                  <input class="InputAndPara" type="text" value="${getTodo.doc.data().todosValues}" readonly maxlength="26">
              </div>
              <div>
                  <!-- Edit and Delete buttons -->
                  <button class="edit_btn" onclick='handleEdit(event, "${getTodo.doc.id}")'>Edit</button>
                  <button class="del_btn" onclick='handleDelete("${getTodo.doc.id}")'>Delete</button>
                  </div>
          </div>
      `;
  
  
  // // Add event listeners for Edit and Delete buttons
  //     let editBtns = document.querySelectorAll(".edit_btn");
  //     let deleteBtns = document.querySelectorAll(".del_btn");
  
  //     editBtns.forEach((editBtn) => {
  //         editBtn.addEventListener("click", handleEdit);
  //     });
  
  //     deleteBtns.forEach((deleteBtn) => {
  //       // Pass getTodo.doc.id to the handleDelete function
  //       deleteBtn.addEventListener("click", () => handleDelete(getTodo.doc.id));
  //     });
  
  
      input.value = "";
  
}


  });
});
}

getData()




// Function to add a new todo
let todoAdd =   async (e)  => {
    e.preventDefault();
    inputValue = input.value;

    // Check if input is empty
    if (!inputValue.trim()) {
        alert("Write something");
        return; // Exit the function if input is empty
    }

//firebase add doc
  try {
    const docRef = await addDoc(collection(db, "Todos"), {
      todosValues:inputValue

    });
    console.log("Todo succesfully add", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

};
addItem_btn.addEventListener("click", todoAdd);


// Function to handle the Edit button
let handleEdit = async (event, todosid) => {
    // Check if edit mode is already active
    if (edit) {
let InputUpdatedValue = event.target.parentNode.parentNode.querySelector("div > input").value
  const todoRef = doc(db, "Todos", todosid);
await updateDoc(todoRef, {
  todosValues: InputUpdatedValue
});
        // Change the button text back to "Edit"
        event.target.parentNode.querySelector(".edit_btn").innerHTML = "Edit"

        // Get the parent list item
        let list_item = event.target.parentNode.parentNode;

        // Set the input field to read-only
        list_item.querySelector(".InputAndPara").readOnly = true;

        // Remove the outline styles
        list_item.querySelector(".InputAndPara").style.outlineStyle = "none";
        list_item.querySelector(".InputAndPara").style.outlineColor = "none";

        // Remove focus from the input field
        list_item.querySelector(".InputAndPara").blur();

        // Set edit mode to false
        edit = false;
    } else {
      console.log()
        // Change the button text to "Save"
        event.target.parentNode.querySelector(".edit_btn").innerHTML = "Save";

        // Get the parent list item
        let list_item = event.target.parentNode.parentNode;

        // Set the input field to editable
        list_item.querySelector(".InputAndPara").readOnly = false;

        // Add outline styles
        list_item.querySelector(".InputAndPara").style.outlineStyle = "dotted";
        list_item.querySelector(".InputAndPara").style.outlineColor = "black";

        // Set focus to the input field
        list_item.querySelector(".InputAndPara").focus();

        // Set edit mode to true
        edit = true;
    }
};








// Function to handle the Delete button
let handleDelete = async (todosid) => {
  try {
    let confirmDelete = confirm("Are you sure ?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "Todos", todosid));
      console.log("Todo deleted:", todosid);
    //  var list_item = todoDisplay.querySelector(".list_item")


      // Remove the corresponding todo from the DOM
      // const todoItem = todoDisplay.querySelector(`.list_item[data-doc-id="${todosid}"]`);
      // if (todoItem) {
      //   todoItem.remove();
      // } 
    }
  } catch (e) {
    console.error(e);
  }
;



//     // Confirm if the user wants to delete the todo
//     let confirmDelete = confirm("Are you sure?");
//     if (confirmDelete) {
//         // Get the parent list item
//         const listItem = e.target.parentNode;
// console.log(listItem)
//         // Check if listItem is found
//         // if (listItem) {
//         //     // Remove the listItem from the DOM
//         //     listItem.innerHTML = ""; // Clear the content for text
//         //     listItem.classList = ""; // Clear the class for UI
//         //     // Alternatively, use listItem.remove() to remove the entire listItem
//         // }
//     }











};



// // Event listener for the Delete All button
// deleteAll.addEventListener("click", (e) => {
//     e.preventDefault();



// console.log("ali")











//     // // Check if there are no todos to delete
//     // if (todoDisplay.innerHTML.trim() === "") {
//     //     alert("No todos to delete");
//     // } else {
//     //     // Confirm if the user wants to delete all todos
//     //     let confirmed = confirm("Are you sure you want to delete all todos?");
//     //     if (confirmed) {
//     //         // Clear the content of the todoDisplay area
//     //         todoDisplay.innerHTML = "";
//     //     }
//     // }
// });


let handleDeleteAll = async (e) => {
  e.preventDefault()
  try {
    let confirmDeleteAll = confirm("Are you sure you want to delete all todos?");
    if (confirmDeleteAll) {
      // Delete all documents from the "Todos" collection
      const todosCollection = collection(db, "Todos");//Todos
      // console.log("todosCollection",todosCollection) 
      const snapshot = await getDocs(todosCollection);
      console.log("snapshot",snapshot) //snapshot (jaha sara data hota)
      snapshot.forEach(async (doc) => {
        // console.log("doc",doc)
        
        // console.log("doc.ref",doc.ref) //todo ids

        await deleteDoc(doc.ref);
      });

      // Clear the display area in the DOM
      todoDisplay.innerHTML = "";
      console.log("All todos deleted successfully");
    }
  } catch (e) {
    console.error("Error deleting all todos:", e);
  }
};

// Event listener for the Delete All button
deleteAll.addEventListener("click", handleDeleteAll);





















//
window.handleDelete = handleDelete;
window.handleEdit = handleEdit;

