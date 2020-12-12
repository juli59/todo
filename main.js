(function () {
   
    let todos = [];
    //Parts of Date
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');//ezek itt vannak, mert az elején kell megjeleníteni az adatokat
    const todoAddBtn = document.querySelector('.todo__btn'); //a gombot keresem
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
    //localstorageHandler object
    const localDB = {
        //localDB.setItem('todos', todos);  //milyen néven és mit akarok elmenteni
        setItem(key, value) { //elmenti az adatot a localstorageba
            value = JSON.stringify(value);
            localStorage.setItem(key, value); //ezzel frissitjuk és beállítjuk az adatot
        },
        //localDB.getItem('todos')); //ezzel vissza van alakítva tömbbé a consolon, lehet vele dolgozni, be tudom járni cilussal
        getItem(key) {  //kiolvasni az adatot
            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }
            return JSON.parse(value); //ujra értelmezi, megint lesz belőle tömb vagy objektum
        },
        //localDB.removeItem('todos'); //ezzel töröltem 
        removeItem(key) {
            localStorage.removeItem(key);
        }
       
    };
   
    //Initialize application
    const init = () => { //ez fogja ellenőrizni, hogy van-e valami a lokal storage-ban, vannak-e mentett teendők, ha igen, akkor betölti őket a local storage-ból
               
        showDate();
        setListeners(); //ide beállítom az eseményeket
        loadExistingTodos();
    };
    //Load existing todos
    const loadExistingTodos = () => {
        const savedTodos = localDB.getItem('todos');
        if(savedTodos) {
            todos = savedTodos;
        }
    
    
    if (todos && Array.isArray(todos)) {
        todos.forEach( todo => showTodo(todo) );
    }
};
    // Show date
    const showDate = () => {
        const currentDate = new Date();
        const day = [
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
        ].map( num => num < 10 ? `0${num}` : num ); //a map végigmegy a tömb elemein, ezek számok, és utána a számokat megnézi


        bodyDay.textContent = dayNames[currentDate.getDay()]; //a nap neve
        bodyDate.textContent = day.join('-');

    };
    //Set event Listener
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
    };

    //save and add todo to the database
    const addNewTodo = () => {  //az inputból veszi a szöveget
        const value = todoInput.value;
        if (value === '') {
            alert('Please type a todo.');
            return;
        }
        //input szövegét beletesszük egy objektumba, tartalmat és egy boolean értéket, hogy kész van-e a todo vagy nem
        const todo = {
            text: value,
            done: false
        };
        todos.push(todo); //létrehoztam a todo-t és beteszem a todos tömbbe
        localDB.setItem('todos', todos); //elmentem a localstorageba az első az adat neve, a második a tartalma a set item json stringgé alakítja és letároljha a localstorageba
        showTodo(todo);
        todoInput.value = '';
    };
    
    //show todo in the list
    const showTodo = todo => {  //létrehoz egy divet
        const todoItem = document.createElement('div');//létrehoztunk egy változó divet
        todoItem.classList.add('todo-item'); //ezzel osztályt adtam a divnek
        todoListPending.insertBefore(todoItem, todoListPending.firstChild);
        //todoListPending.appendChild(todoItem);
        //a checkbox-szal készre jelölöm, a spannal veszem a szöveget
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
