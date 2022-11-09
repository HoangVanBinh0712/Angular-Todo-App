import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  accountId: string;

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) { 
    this.accountId = authService.getUserId();
  }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title, this.accountId).subscribe((list: List) => {
      console.log(list);
      // Now we navigate to /lists/task._id
      this.router.navigate([ '/lists', list._id ]); 
    });
  }

}
