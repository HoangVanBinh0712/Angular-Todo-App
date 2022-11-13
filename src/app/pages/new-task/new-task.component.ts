import { Component, OnInit } from '@angular/core'
import { TaskService } from 'src/app/service/task/task.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Task } from 'src/app/models/task.model'

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
    constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

    listId: string

    isUpdate: boolean = false
    task: Task = null
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.listId = params['listId']
            if (params['taskId']) {
                this.isUpdate = true
                this.taskService.getTask(params['taskId']).subscribe((res: any) => {
                    this.task = res.task
                })
            }
        })
    }

    createTask(taskName: string, note: string, deadline: Date) {
        if (taskName)
            this.taskService.createTask(taskName, note, deadline, this.listId).subscribe((newTask: Task) => {
                this.router.navigate(['../'], { relativeTo: this.route })
            })
    }

    updateTask(taskName: string, note: string, deadline: Date) {
        this.task.taskName = taskName
        this.task.note = note
        this.task.deadline = deadline

        if (taskName)
            this.taskService.updateTask(this.task).subscribe((newTask: Task) => {
                console.log(newTask)
                this.router.navigate(['/lists/' + this.listId], { relativeTo: this.route })
            })
    }
}
