import { Component, OnInit } from '@angular/core'
import { TaskService } from 'src/app/service/task/task.service'
import { StepService } from 'src/app/service/step/step.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Task } from 'src/app/models/task.model'
import { List } from 'src/app/models/list.model'
import { Step } from 'src/app/models/step.model'
import { MessageService, ConfirmationService } from 'primeng/api'
import { CdkDragDrop } from '@angular/cdk/drag-drop'

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
    lists: List[] = []
    tasks: Task[] = []
    // Init variables for steps
    steps: Step[] = []
    addStep: string = ''

    selectedListId: string = ''
    selectedTask: Task = null

    constructor(
        private taskService: TaskService,
        private stepService: StepService,
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

    //Step function from here
    //Drop to change position - priority of step
    drop(event: CdkDragDrop<Step[]>) {
        //Swap priority
        const tpriority = this.steps[event.previousIndex].priority
        this.steps[event.previousIndex].priority = this.steps[event.currentIndex].priority
        this.steps[event.currentIndex].priority = tpriority

        //update priority
        this.stepService
            .updateStep(
                this.steps[event.previousIndex]._id,
                this.steps[event.previousIndex].stepName,
                this.steps[event.previousIndex].priority
            )
            .subscribe((res: any) => {})
        this.stepService
            .updateStep(
                this.steps[event.currentIndex]._id,
                this.steps[event.currentIndex].stepName,
                this.steps[event.currentIndex].priority
            )
            .subscribe((res: any) => {})
        //sort
        this.steps = this.steps.sort((a, b) => {
            return a.priority - b.priority
        })
    }
    onTaskClick(task: Task) {
        this.steps = []
        this.stepService.getSteps(task._id).subscribe((res: any) => {
            this.steps = res.lstStep
        })
        this.selectedTask = task
    }

    onAddstepClick() {
        if (this.addStep.length !== 0) {
            this.stepService.createStep(this.selectedTask._id, this.addStep).subscribe((res: any) => {
                if (res.message) {
                    this.steps.push(res.step)
                    this.addStep = ''
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success:',
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
                this.stepService.deleteStep(id).subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Step is deleted successfully!',
                        })
                        this.stepService.getSteps(this.selectedTask._id).subscribe((res: any) => {
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
        this.stepService.updateStep(step._id, step.stepName, step.priority).subscribe((res: any) => {
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

    changeStepStatusClick(id: string) {
        this.stepService.changeStatusStep(id).subscribe((res: any) => {
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
    // Step functions end here
}
