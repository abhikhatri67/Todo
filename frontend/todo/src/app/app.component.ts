import { TodoService } from "./app/todo.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  todo: any;
  isEdit = false;
  taskList = [];
  constructor(public todoSer: TodoService) {
    this.getTodosFunction();
  }

  getTodosFunction() {
    this.taskList = [];
    this.todoSer.getTodos().subscribe(data => {
      this.taskList = data.task;
    });
  }

  addTodo(value) {
    let obj = {
      newTask: value
    };
    this.todoSer.postTodos(obj).subscribe(res => {
      this.taskList = res;
      this.getTodosFunction();
    });
  }

  editTodo(todo) {
    this.isEdit = true;
    console.log("edit todo :", todo);
    this.todo = todo.taskList;
  }

  editTodoSave(todo) {
    console.log("editTodoSave function", todo);
    let obj = {
      task : todo.taskList
    }
    this.todoSer.updateTodo(obj).subscribe(res => {
      console.log(res);
    })
  }

  deleteTaskFunc(task) {
    let obj = {
      taskList: task
    }
    this.todoSer.deleteTodos(obj).subscribe(res => {
      this.getTodosFunction();
    })
  }

}
