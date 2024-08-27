import { ErrorEntity } from "../../entity/error"
import { UploadImageForMeasureUseCaseRequest } from "../ucio/measure"

interface UploadImageForMeasureUseCaseValidateInterface {
    uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest): Promise<ErrorEntity | null>
}

export{
    UploadImageForMeasureUseCaseValidateInterface
}