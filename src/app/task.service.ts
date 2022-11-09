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

  getLists(userId:string){
    return this.webReqService.get(`list/get_all/${userId}`);
  }

  createList(title: string, accountId: string) {
    // We want to send a web request to create a list
    return this.webReqService.post("list/create", { listName: title,  accountId : accountId});
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`list/${id}`, { title });
  }

  updateListMinh(id: string, title: string) {
    return this.webReqService.put(`list/update`, {id: id, listName: title });
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
    return this.webReqService.delete(`list/${id}`);
  }

  getTasks(listId: string) {
    return this.webReqService.get(`task/get_all/${listId}`);
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
