
import { Router } from "express"
import { ConfirmMeasureController, GetMeasureByCustomerCodeController, UploadImageForMeasureController } from "../controller/measure"

class UploadRouter {
    private router: Router

    constructor() {
        this.router = Router()
        this.router.post('/upload', new UploadImageForMeasureController().uploadImageForMeasure)
        this.router.patch('/confirm', new ConfirmMeasureController().confirmMeasure)
        this.router.get("/:customer_code/:measure_type?", new GetMeasureByCustomerCodeController().getMeasureByCustomerCode)
    }

    getRouter(): Router {
        return this.router
    }
}

export {
    UploadRouter
}