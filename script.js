const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

//Initialize App
function init() {
  //Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', loadList);
}

//Load List from Local Storage
function loadList() {
  const storedItems = getItemsFromLocalStorage();
  storedItems.forEach((item) => {
    addItemToDOM(item);
  });
  ResetUI();
}

function getItemsFromLocalStorage() {
  let storedItems;
  if (localStorage.getItem('items') !== null) {
    storedItems = JSON.parse(localStorage.getItem('items'));
  } else {
    storedItems = [];
  }

  return storedItems;
}

//Functions Related to Add
function onAddItemSubmit(e) {
  e.preventDefault();
  const text = itemInput.value;

<<<<<<< HEAD
  //Validate Input
  if (text === '') {
    alert('Please type in a item to add');
=======
  // trim the input value to remove whitespace - disallowing duplicate items due to white space in the process
  const newItem = itemInput.value.trim();

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
>>>>>>> 53b3713456823022ce864c80793206c2cc75096a
    return;
  }

  //Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode'); //.class

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
<<<<<<< HEAD
  } else if (checkIfItemExists(text)) {
    alert('That item already exists!');
    return;
=======
  } else {
    if (checkIfItemExists(newItem)) {
      alert(`The item "${newItem}" already exists!`);
      return;
    }
>>>>>>> 53b3713456823022ce864c80793206c2cc75096a
  }
  addItemToDOM(text);
  addItemToLocalStorage(text);
  ResetUI();
  itemInput.value = '';
}

function addItemToDOM(item) {
  const newListItem = createListItem(item);

  itemList.appendChild(newListItem);
}

function addItemToLocalStorage(item) {
  const storedItems = getItemsFromLocalStorage();

  storedItems.push(item);
  localStorage.setItem('items', JSON.stringify(storedItems));
}

function createListItem(text) {
  const newListItem = document.createElement('li');
  newListItem.appendChild(document.createTextNode(text));

  const button = createButton('remove-item btn-link text-red');
  newListItem.appendChild(button);

  return newListItem;
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

//Functions related to clear items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem('items');

  ResetUI();
}

//Functions Related to Remove
function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    removeItemFromStorage(item.textContent);
    ResetUI();
  }
}

function removeItemFromStorage(text) {
  let itemsFromStorage = getItemsFromLocalStorage();
  //Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== text);
  //Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//OnClick
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.closest('li')) {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

<<<<<<< HEAD
//Filter Methods
=======
function removeItem(item) {
  if (
    confirm(`Are you sure you want to remove the item "${item.textContent}"?`)
  ) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from localStorage
  localStorage.removeItem('items');

  checkUI();
}

>>>>>>> 53b3713456823022ce864c80793206c2cc75096a
function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromLocalStorage();
  return itemsFromStorage.includes(item);
}

//Filter and Clear Btn toggle
function ResetUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

//Method Calls
init();
ResetUI();
