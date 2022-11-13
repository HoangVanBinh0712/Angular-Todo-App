import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignupButtonClicked(email: string, password: string) {
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/lists']);
    }, err => {
      console.log(err);
      if(err.error.error.message != null && err.error.error.message.startsWith("Account validation failed")){
        this.errorMessage = "Please type email";
      }
      if(err.error.error.keyValue != null){
        this.errorMessage = "This email already exists";
      }
      this.isSignUpFailed = true;
      console.log(this.errorMessage)
    } );
  }

}
