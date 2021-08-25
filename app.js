/*
	@Develop by Abdillah AG
	@Agu, 25 2021
*/

const todoContainer =  document.getElementById('todos');
const todoCount =  document.getElementById('todo-count');
const todoCountFinish =  document.getElementById('todo-count-finish');
const dropdownButtonAdd =  document.getElementById('dropdownButtonAdd');
const body =  document.getElementsByTagName("BODY")[0];;
let todos = [];

// Update and Show All todos
function showTodoList(_todos) {
	const countAll = todos.length;
	const countCompleted = todos.filter(row => row.completed === true).length;

	const todoList = _todos.map(row => {
		return (`
			<div class="col-md-4 todo pr-0 mb-3">
				<div class="item-todo-list ${row.completed ? 'bg-light': row.bg}">
					<textarea id="todo-text--${row.id}" onkeyup="keyupTodo(${row.id})" placeholder="New todo created!" ${row.completed || row.isSave ? 'disabled' : 'focus'}>${row.text}</textarea>
					<div class="todo-action">
						<small class="mb-0">Created ${row.created_at}</small>
						<div class="d-flex">
							<button class="btn-circle-sm border-0 bg-dark fw-700" type="button" onclick="deleteTodo(${row.id})" ${!row.completed ? 'hidden' : ''}>
						  		<svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						  		<path d="M2 2L16 16" stroke="#ffffff" stroke-width="2"/>
						  		<path d="M2 16L16 2" stroke="#ffffff" stroke-width="2"/>
						  		</svg>
							</button>
				  		  	<button class="btn-circle-sm border-0 bg-dark fw-700 dropdown-toggle" type="button" id="dropdownListOption--${row.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" ${row.completed ? 'hidden' : ''} >
				  		    	<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		  		  		    	<circle cx="3" cy="9" r="1.5" fill="#ffffff"/>
		  		  		    	<circle cx="9" cy="9" r="1.5" fill="#ffffff"/>
		  		  		    	<circle cx="15" cy="9" r="1.5" fill="#ffffff"/>
		  		  		    	</svg>
				  		  	</button>
				  		  	<div class="dropdown-menu p-3" aria-labelledby="dropdownListOption--${row.id}">
					  		    <a href="JavaScript:void(0)" class="dropdown-item" onclick="saveTodo(${row.id})">Save</a>
					  		    <a href="JavaScript:void(0)" class="dropdown-item" onclick="editTodo(${row.id})">Edit</a>
					  		    <a href="JavaScript:void(0)" class="dropdown-item" onclick="completeTodo(${row.id})">Completed</a>
					  		    <a href="JavaScript:void(0)" class="dropdown-item" onclick="deleteTodo(${row.id})">Delete</a>
				  		  	</div>
						</div>
					</div>
				</div>
			</div>
		`)
	}).join('')
	todoCount.innerHTML = countAll;
	todoCountFinish.innerHTML = countCompleted;
	todoContainer.innerHTML = todoList;
}

// Created new todo item
function createTodo(bg) {
	const initialTodo = {
		id: todos.length + 1,
		text: '',
		created_at: new Date().toJSON().slice(0,10),
		bg: bg,
		completed: false,
		isSave: false
	}

	todos.push(initialTodo)
	showTodoList(todos)

	const todoText =  document.getElementById(`todo-text--${initialTodo.id}`);
	todoText.focus()
	dropdownButtonAdd.setAttribute('disabled', '');
}

// Save todo item
function saveTodo(id) {
	const todoText =  document.getElementById(`todo-text--${id}`);
	todos.map(row => {
		if (row.id === id) {
			row.text = todoText.value
			row.isSave = true
		}
	})
	showTodoList(todos)
}

// Active edit todo item
function editTodo(id) {
	const todoText =  document.getElementById(`todo-text--${id}`);
	todos.map(row => row.id === id ? row.isSave = false : row)
	showTodoList(todos)
	todoText.focus();
}

function keyupTodo(id) {
	const todoText =  document.getElementById(`todo-text--${id}`);
	const todoButtonOption =  document.getElementById(`dropdownListOption--${id}`);
	if (todoText.value.length > 2 ) { 
		dropdownButtonAdd.removeAttribute('disabled', '');
	}
}

// Make completed todo item
function completeTodo(id) {
	todos.map(row => {
		row.id === id ? row.completed = true : row
	})
	showTodoList(todos)
}

// Delete todo item
function deleteTodo(id) {
	todos = todos.filter(row => row.id !== id)
	showTodoList(todos)
}

// Delete all todo item
function deleteAllTodo() {
	todos = []
	showTodoList(todos)
}

function randomTodo() {
	const newRandomTodo = todos.sort(() => Math.random() - 0.5);
	showTodoList(newRandomTodo)
}

// Show Items Todo
showTodoList(todos)


// Behavior
document.body.onscroll = function() {
	const buttonScrollTop = document.getElementById('btn-scroll-top');
	const scrollTop = $(this).scrollTop();
	scrollTop > 800 
	 	? buttonScrollTop.style.display = 'block'
	 	: buttonScrollTop.style.display = 'none'
}

let btnScrollRight = document.getElementById('btn-scroll-right');
let btnScrollLeft = document.getElementById('btn-scroll-left');
let scrollHorizontal = document.getElementById('scroll-horizontal');
let scrollLength = 0;



btnScrollRight.addEventListener('click', function(){
	scrollLength = scrollHorizontal.offsetWidth <= 990 ? scrollHorizontal.offsetWidth : 440;
	scrollHorizontal.scrollLeft += scrollLength
	btnScrollLeft.removeAttribute('disabled', '')
})

btnScrollLeft.addEventListener('click', function(){
	scrollLength = scrollHorizontal.offsetWidth <= 990 ? scrollHorizontal.offsetWidth : 440;
	scrollHorizontal.scrollLeft -= scrollLength;
	btnScrollRight.removeAttribute('disabled', '')
}) 

window.addEventListener('load', function(){
	if (scrollHorizontal.scrollLeft += scrollLength === 0) {
		btnScrollLeft.setAttribute('disabled', '')
	}
	if (scrollHorizontal.scrollLeft += scrollLength === 990) {
		btnScrollRight.setAttribute('disabled', '')
	}
})