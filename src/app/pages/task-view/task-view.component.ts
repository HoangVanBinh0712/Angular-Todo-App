import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Task } from "src/app/models/task.model";
import { List } from "src/app/models/list.model";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.scss"],
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  accountId :string;

  selectedListId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.accountId = this.authService.getUserId();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskService.getLists(this.accountId).subscribe((response: any) => {
        this.lists = response.lists;
      });
      if (params.listId) {
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((response: any) => {
          this.tasks = response.tasks;
        });
      } else {
        this.tasks = undefined;
      }
    });
    
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.isCompleted = !task.isCompleted;
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
    });
  }

  onDeleteTaskClick(id: string) {
    this.taskService
      .deleteTask(this.selectedListId, id)
      .subscribe((res: any) => {
        this.tasks = this.tasks.filter((val) => val._id !== id);
        console.log(res);
      });
  }
}
