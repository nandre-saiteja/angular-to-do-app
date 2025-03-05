import { NgClass, NgFor, CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass, CommonModule], // Add CommonModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit { // Implement OnInit
  todoList: TodoItem[] = [];
  newTask: string = '';

  ngOnInit(): void {
    this.loadTodoList();
  }

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false
      };

      this.todoList.push(newTodoItem);
      this.saveTodoList(); // Save to session storage
      this.newTask = '';
    }
  }

  toggleCompleted(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed;
    this.saveTodoList(); // Save to session storage
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList(); // Save to session storage
    console.log(this.todoList);
  }

  private saveTodoList(): void {
    sessionStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  private loadTodoList(): void {
    const storedList = sessionStorage.getItem('todoList');
    if (storedList) {
      this.todoList = JSON.parse(storedList);
    }
  }
}