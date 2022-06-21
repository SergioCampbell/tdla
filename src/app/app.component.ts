import { Component } from '@angular/core';
import { Button } from 'bootstrap';
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Store';
  description = null ?? 'This is a mega description about this cool app';
  todos : Todo[] = [];
  newTodo : string;

  saveTodo(){
    if(this.newTodo){
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = true;
      this.todos.push(todo);
      this.newTodo = '';
    } else {
      alert('Please Enter Todo')
    }
  }

  done(id: number){
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  delete(id: number){
    this.todos = this.todos.filter((task, index) => index !== id)
  }
}
