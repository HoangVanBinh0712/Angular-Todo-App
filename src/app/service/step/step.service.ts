import { Injectable } from '@angular/core'
import { WebRequestService } from '../request/web-request.service'

@Injectable({
    providedIn: 'root',
})
export class StepService {
    constructor(private webReqService: WebRequestService) {}

    getSteps(taskId: string) {
        return this.webReqService.get(`steps/${taskId}`)
    }

    createStep(taskId: string, stepName: string) {
        return this.webReqService.post(`steps`, { taskId: taskId, stepName: stepName })
    }
    deleteStep(id: string) {
        return this.webReqService.delete(`steps/${id}`)
    }
    updateStep(stepId: string, stepName: string, priority: Number) {
        return this.webReqService.put(`steps`, { stepId: stepId, stepName: stepName, priority: priority })
    }

    changeStatusStep(stepId: string) {
        return this.webReqService.put(`steps/change-status/${stepId}`, {})
    }
}
