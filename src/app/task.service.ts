import { Injectable } from "@angular/core";
import { WebRequestService } from "./web-request.service";
import { Task } from "./models/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  
  readonly ROOT_URL;

  constructor(private webReqService: WebRequestService) {
    this.ROOT_URL = 'http://localhost:3000/api/v1';
  }

  getLists(){
    return this.webReqService.get("lists/get_all");
  }

  createList(title: string) {
    // We want to send a web request to create a list
    return this.webReqService.post("lists/create", { listName: title });
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, {
      title,
    });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  getTasks(listId: string) {
    return this.webReqService.get(`tasks/get_all/${listId}`);
  }

  createTask(title: string, listId: string) {
    // We want to send a web request to create a task
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webReqService.patch(`lists/${task.list}/tasks/${task._id}`, {
      completed: !task.isCompleted,
    });
  }

  // updateFile( file: Object) {
  //   // We want to send a web request to update a list
  //   return this.webReqService.put(`task/update`,{file});
  // }

}
