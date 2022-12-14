import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TaskViewComponent } from './pages/task-view/task-view.component'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NewListComponent } from './pages/new-list/new-list.component'
import { NewTaskComponent } from './pages/new-task/new-task.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { WebReqInterceptor } from './service/request/web-req.interceptor'
import { SignupPageComponent } from './pages/signup-page/signup-page.component'
import { EditListComponent } from './pages/edit-list/edit-list.component'
import { EditTaskComponent } from './pages/edit-task/edit-task.component'
import { MenuModule } from 'primeng/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
    declarations: [
        AppComponent,
        TaskViewComponent,
        NewListComponent,
        NewTaskComponent,
        LoginPageComponent,
        SignupPageComponent,
        EditListComponent,
        EditTaskComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MenuModule,
        BrowserAnimationsModule,
        ConfirmDialogModule,
        ToastModule,
        DragDropModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }, ConfirmationService, MessageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
