


var todoList = {
  todos: [],
  // displayTodo: function (){
  //   if(this.todos.length === 0){
  //     console.log("There is not todos");
  //   }
  //   else{
  //     for(var i = 0; i < this.todos.length; i++){
  //       if(this.todos[i].completed === false){
  //         console.log("[]", this.todos[i].todoText)
  //       } else{
  //         console.log("[X]", this.todos[i].todoText)
  //       }
  //     }
  //   }
  // },
  addTodo: function(todo){
    this.todos.push({
      todoText: todo,
      completed: false
    })
    
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
   
  },
  updateTodo: function( position, todoText){
    this.todos[position].todoText = todoText;
    
  },
  toggleCompleted: function(position){
    var toggle = this.todos[position];
    toggle.completed = !toggle.completed;
   
  },
  toggleAll: function(){
    var todosTotal = this.todos.length;
    var completedtotal = 0;

    // for (var i = 0; i < this.todos.length; i++) {
    //   if(this.todos[i].completed === true){
    //     completedtotal++;
    //   }
    // }

    this.todos.forEach(function(todo){
      if(todo.completed === true)
        completedtotal++;
    });

    // if(todosTotal === completedtotal){
    //   this.todos.forEach(function(todo){
    //     todo.completed = false;
    //   })
    // }
    // else{
    //   this.todos.forEach(function(todo){
    //     todo.completed = true;
    //   })
    // }
    this.todos.forEach(function(todo){
      if(todosTotal === completedtotal){
        todo.completed = false;
      }
      else{
        todo.completed = true;
      }

    });

  }
}



var handlers = {
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodo();
 },
  addTodo: function(){
    var addTodoText = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoText.value);
    addTodoText.value = "";
    view.displayTodo();
  },
  changeTodo: function(){
    var changePosition = document.getElementById("changePosition");
    var changeText = document.getElementById("changeText");
    todoList.updateTodo(changePosition.valueAsNumber,changeText.value);
    changeText.value = "";
    changePosition.value = "";
    view.displayTodo();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodo();
  },
  toggleTodo: function(){
    var togglePosition = document.getElementById("toggleTodo");
    todoList.toggleCompleted(togglePosition.valueAsNumber)
    togglePosition.value = "";
    view.displayTodo();
  }

}

var view = {
  displayTodo: function(){
    var todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";
  //   for (var i = 0; i < todoList.todos.length; i++) {
  //     var todoLi = document.createElement("li");
  //     var todo = todoList.todos[i];

  //     var todoCompleted = "";

  //     if(todo.completed === true){
  //       todoCompleted = "(X)" + todo.todoText;
  //     }else{
  //       todoCompleted = "( )" + todo.todoText;
  //     }

  //     todoLi.id = i; // the reason why this works is because of the for loop
  //     todoLi.textContent = todoCompleted;
  //     todoLi.appendChild(this.createDeleteButton());
  //     todoUl.appendChild(todoLi);
  //   }
  // },

  // this refer to view object
  //forEach(callback, this)

  todoList.todos.forEach(function(todo, position){
    var todoLi = document.createElement("li");

    var todoCompleted = "";

    if(todo.completed === true){
      todoCompleted = "(X)" + todo.todoText;
    }else{
      todoCompleted = "( )" + todo.todoText;
    }

    todoLi.id = position; // the reason why this works is because of the for loop
    todoLi.textContent = todoCompleted;
    todoLi.appendChild(this.createDeleteButton());
    todoUl.appendChild(todoLi);
   }, this); // this is here because it use it to access the view oject, since we are using a forEach loop
  },

  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event){
    var elementClicked = event.target;

    if(elementClicked.className === "deleteButton"){
    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
   });
  }
};

view.setUpEventListeners();



