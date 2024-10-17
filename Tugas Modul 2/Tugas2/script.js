// Selecting elements
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const feedback = document.getElementById('feedback');

let todoItems = [];

// Event listener to add new item
itemForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const itemName = itemInput.value.trim();
    if (itemName === "") {
        feedback.textContent = "Please enter a valid task.";
        feedback.classList.add("alert");
    } else {
        addItem(itemName);
        itemInput.value = "";
        feedback.textContent = "";
        feedback.classList.remove("alert");
    }
});

// Function to add new item
function addItem(itemName) {
    const newItem = {
        id: Date.now(),
        name: itemName,
        completed: false
    };
    todoItems.push(newItem);
    renderList();
}

// Function to render to-do list
function renderList() {
    itemList.innerHTML = ""; // Clear current list
    todoItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('item');
        li.innerHTML = `
            <div class="item-info">
                <h6 class="item-index">${index + 1}</h6>
                <p class="item-name ${item.completed ? 'completed' : ''}">${item.name}</p>
            </div>
            <div class="item-icons">
                <i class="far fa-check-circle complete-item" data-id="${item.id}"></i>
                <i class="far fa-edit edit-item" data-id="${item.id}"></i>
                <i class="far fa-times-circle delete-item" data-id="${item.id}"></i>
            </div>
        `;
        itemList.appendChild(li);
    });
}

// Event listener for list interactions
itemList.addEventListener('click', function(event) {
    if (event.target.classList.contains('complete-item')) {
        const id = event.target.getAttribute('data-id');
        markComplete(id);
    } else if (event.target.classList.contains('edit-item')) {
        const id = event.target.getAttribute('data-id');
        editItem(id);
    } else if (event.target.classList.contains('delete-item')) {
        const id = event.target.getAttribute('data-id');
        deleteItem(id);
    }
});

// Function to mark item as completed
function markComplete(id) {
    todoItems = todoItems.map(item => {
        if (item.id == id) {
            item.completed = !item.completed;
        }
        return item;
    });
    renderList();
}

// Function to edit item
function editItem(id) {
    const itemToEdit = todoItems.find(item => item.id == id);
    itemInput.value = itemToEdit.name;
    deleteItem(id); // Remove item while editing
}

// Function to delete item
function deleteItem(id) {
    todoItems = todoItems.filter(item => item.id != id);
    renderList();
}
