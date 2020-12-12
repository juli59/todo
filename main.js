(function () {
   
    let todos = [];
    
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');
    const todoAddBtn = document.querySelector('.todo__btn'); 
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');
    const todoNumber = document.querySelector('.todo__number');
    const footerBtnClear = document.querySelector('.footer__btn--clear');
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    
    const localDB = {
        
        setItem(key, value) { 
            value = JSON.stringify(value);
            localStorage.setItem(key, value); 
        },
       
        getItem(key) {  
            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }
            return JSON.parse(value); 
        },
        
        removeItem(key) {
            localStorage.removeItem(key);
        }
       
    };
   
    
    const init = () => {
               
        showDate();
        setListeners(); 
        loadExistingTodos();
    };
    
    const loadExistingTodos = () => {
        const savedTodos = localDB.getItem('todos');
        if(savedTodos) {
            todos = savedTodos;
        }
    
    
    if (todos && Array.isArray(todos)) {
        todos.forEach( todo => showTodo(todo) );
    }
};
    
    const showDate = () => {
        const currentDate = new Date();
        const day = [
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
        ].map( num => num < 10 ? `0${num}` : num ); 


        bodyDay.textContent = dayNames[currentDate.getDay()]; 
        bodyDate.textContent = day.join('-');

    };
    
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
    };

    
    const addNewTodo = () => {  
        const value = todoInput.value;
        if (value === '') {
            alert('Please type a todo.');
            return;
        }
        
        const todo = {
            text: value,
            done: false
        };
        todos.push(todo); 
        localDB.setItem('todos', todos); 
        showTodo(todo);
        todoInput.value = '';
    };
    
    
    const showTodo = todo => {  
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item'); 
        todoListPending.insertBefore(todoItem, todoListPending.firstChild);
        
        todoItem.innerHTML = `   
            <input type="checkbox"> 
            <span>${todo.text}</span> 
            <button class="delete-button">
                <i class="fa fa-trash"></i>
            </button>
        `
        todoNumber.textContent = todos.length; 
       
    };
    footerBtnClear.addEventListener('click', localDB.removeItem());
   
         
    
       
    init();
     
})();
