
import { Router } from "express"
import { ConfirmMeasureController, UploadImageForMeasureController } from "../controller/measure"

class UploadRouter {
    private router: Router

    constructor() {
        this.router = Router()
        this.router.post('/upload', new UploadImageForMeasureController().uploadImageForMeasure)
        this.router.patch('/confirm', new ConfirmMeasureController().confirmMeasure)
    }

    getRouter(): Router {
        return this.router
    }
}

export {
    UploadRouter
}