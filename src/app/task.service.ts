import { Injectable } from "@angular/core";
import { WebRequestService } from "./web-request.service";
import { Task } from "./models/task.model";
import { Observable } from "rxjs";
import { List } from "./models/list.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}

  getLists(){
    return this.webReqService.get(`lists/get_all`);
  }

  createList(title: string, accountId: string) {
    // We want to send a web request to create a list
    return this.webReqService.post("lists/create", { listName: title,  accountId : accountId});
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  updateListMinh(id: string, title: string) {
    return this.webReqService.put(`lists/update`, {id: id, listName: title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`list/${listId}/tasks/${taskId}`, {
      title,
    });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`list/${listId}/tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  getTasks(listId: string) {
    return this.webReqService.get(`tasks/get_all/${listId}`);
  }

  createTask(title: string, listId: string) {
    // We want to send a web request to create a task
    return this.webReqService.post(`list/${listId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webReqService.patch(`list/${task.list}/tasks/${task._id}`, {
      completed: !task.isCompleted,
    });
  }
}
