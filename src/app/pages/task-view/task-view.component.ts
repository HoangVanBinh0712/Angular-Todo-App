import { Component, OnInit } from '@angular/core'
import { TaskService } from 'src/app/task.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Task } from 'src/app/models/task.model'
import { List } from 'src/app/models/list.model'
import { Step } from 'src/app/models/step.model'
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
    lists: List[]
    tasks: Task[]
    steps: Step[]

    selectedListId: string
    selectedTask: Task
    fileName: String
    constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

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
        this.taskService.complete(task).subscribe(() => {
            // the task has been set to completed successfully
            console.log('Completed successully!')
            task.isCompleted = !task.isCompleted
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

    importFile(event, id: string) {
        const file: File = event.target.files[0];
        // id = "636bc6604c3be4fc9276c87e"
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("id","636bc6604c3be4fc9276c87e");
            // var taskName = "Upload file"
            // var id = "636bc6604c3be4fc9276c87e"
            // formData.append("taskName","Test upload file fffffff");
            console.log(formData.get("file"));
            // const upload$ = this.http.post("http://localhost:3000/api/v1/task/import", formData);
            // const update = this.http.put("http://localhost:3000/api/v1/task/update", { taskName, id });
            // upload$.subscribe((res) => {
            //     console.log(res);
            // },
            //     err => {
            //         console.log(err);
            //     });
            // update.subscribe((res) => {
            //     console.log(res);
            // },
            //     err => {
            //         console.log(err);
            //     });

        }
    }

}
