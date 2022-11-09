import { Component, OnInit } from '@angular/core'
import { TaskService } from 'src/app/task.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Task } from 'src/app/models/task.model'
import { List } from 'src/app/models/list.model'
import { Step } from 'src/app/models/step.model'
import { MessageService, ConfirmationService } from 'primeng/api'
import { timer } from 'rxjs'

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
    lists: List[]
    tasks: Task[]
    steps: Step[]

    addStep: string = ''

    selectedListId: string
    selectedTask: Task = null

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params.listId) {
                this.selectedListId = params.listId
                this.taskService.getTasks(params.listId).subscribe((response: any) => {
                    this.tasks = response.tasks
                })
            } else {
                this.tasks = undefined
            }
            this.selectedTask = null
        })

        this.taskService.getLists().subscribe((response: any) => {
            this.lists = response.lists
        })

        this.steps = [
            {
                stepName: 'Step 1',
                isCompleted: true,
            },
            {
                stepName: 'Step 2',
                isCompleted: false,
            },
            {
                stepName: 'Step 3',
                isCompleted: false,
            },
        ]
    }

    onTaskClick(task: Task) {
        // we want to set the task to completed
        // this.taskService.complete(task).subscribe(() => {
        //     // the task has been set to completed successfully
        //     console.log('Completed successully!')
        //     task.isCompleted = !task.isCompleted
        // })
        this.taskService.getSteps(task._id).subscribe((res: any) => {
            this.steps = res.lstStep
        })
        this.selectedTask = task
    }

    onDeleteListClick() {
        this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
            this.router.navigate(['/lists'])
            console.log(res)
        })
    }

    onDeleteTaskClick(id: string) {
        this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
            this.tasks = this.tasks.filter((val) => val._id !== id)
            console.log(res)
        })
    }

    onAddstepClick() {
        if (this.addStep.length !== 0) {
            this.taskService.createStep(this.selectedTask._id, this.addStep, 1).subscribe((res: any) => {
                if (res.message) {
                    console.log('here')
                    this.steps.push(res.step)
                    this.addStep = ''
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success:' ,
                        detail: 'Add step successfully !',
                    })
                }
            })
        }
    }
    onDeleteStepClick(id: string) {
        const step = this.steps.filter((x) => x._id === id)[0]
        this.confirmationService.confirm({
            message: `Do you want to delete ${step.stepName} ?`,
            header: 'Delete step',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.taskService.deleteStep(id).subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Step is deleted successfully!',
                        })
                        this.taskService.getSteps(this.selectedTask._id).subscribe((res: any) => {
                            this.steps = res.lstStep
                        })
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error: ' + error.message,
                            detail: 'Step is not deleted !',
                        })
                    }
                )
            },
            reject: () => {
                return
            },
        })
    }

    onUpdateStepClick(id: string) {
        const step = this.steps.filter((x) => x._id === id)[0]
        this.taskService.updateStep(step._id, step.stepName, step.priority).subscribe((res: any) => {
            this.steps = this.steps.map((step) => {
                if (step._id != res.step._id) return step
                else return res.step
            })
            this.messageService.add({
                severity: 'success',
                summary: 'Success:',
                detail: 'Update step successfully !',
            })
        })
    }
}
