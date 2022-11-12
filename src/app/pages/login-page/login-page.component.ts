import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/service/auth/auth.service'
import { HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router'
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}
    isLoginFailed = false
    errorMessage = ''
    ngOnInit() {
        if (this.authService.getUserId()) {
            this.router.navigate(['/lists'])
        }
    }

    onLoginButtonClicked(email: string, password: string) {
        this.authService.login(email, password).subscribe(
            (res: HttpResponse<any>) => {
                if (res.status === 200) {
                    // we have logged in successfully
                    console.log(res)
                    this.router.navigate(['/lists'])
                }
            },
            (err) => {
                this.errorMessage = err.error
                this.isLoginFailed = true
            }
        )
    }
}
