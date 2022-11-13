import { Injectable } from '@angular/core'
import { WebRequestService } from '../request/web-request.service'
import { Task } from '../../models/task.model'

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private webReqService: WebRequestService) {}

    getLists() {
        return this.webReqService.get('lists/get_all')
    }

    createList(title: string) {
        // We want to send a web request to create a list
        return this.webReqService.post('lists/create', { listName: title })
    }

    updateList(id: string, title: string) {
        // We want to send a web request to update a list
        return this.webReqService.put(`lists/update`, { id: id, listName: title })
    }

    updateTask(task: Task) {
        // We want to send a web request to update a list
        return this.webReqService.put(`tasks/update`, {
            id: task._id,
            taskName: task.taskName,
            note: task.note,
            isCompleted: task.isCompleted,
            isImportant: task.isImportant,
            isToday: task.isToday,
            deadline: task.deadline,
            remindAt: task.remindAt,
            file: task.file,
        })
    }

    deleteTask(taskId: string) {
        return this.webReqService.delete(`tasks/${taskId}`)
    }

    updateTaskNote(taskId: string, note: string) {
        return this.webReqService.put('tasks/update-note', { taskId: taskId, note: note })
    }
    deleteList(id: string) {
        return this.webReqService.delete(`lists/${id}`)
    }

    getTasks(listId: string) {
        return this.webReqService.get(`tasks/get_all/${listId}`)
    }
    getTask(taskId: string) {
        return this.webReqService.get(`tasks/${taskId}`)
    }
    createTask(taskName: string, taskNote: string, deadline: Date, listId: string) {
        // We want to send a web request to create a task
        return this.webReqService.post(`tasks/create`, { taskName: taskName, taskNote: taskNote, deadline: deadline, listId: listId })
    }

    complete(task: Task) {
        return this.webReqService.put(`lists/${task.list}/tasks/${task._id}`, {
            completed: !task.isCompleted,
        })
    }
    updateFile(file: Object) {
        // We want to send a web request to update a list
        return this.webReqService.put(`tasks/update`, { file })
    }
}
