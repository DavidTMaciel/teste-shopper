import { ErrorEntity } from "../../entity/error"
import { ConfirmMeasureUseCaseRequest, UploadImageForMeasureUseCaseRequest } from "../ucio/measure"

interface UploadImageForMeasureUseCaseValidateInterface {
    uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest): Promise<ErrorEntity | null>
}

interface ConfirmMeasureUseCaseValidateInterface{
    confirmMeasure(req:ConfirmMeasureUseCaseRequest): Promise<ErrorEntity | null>
}

export{
    UploadImageForMeasureUseCaseValidateInterface,
    ConfirmMeasureUseCaseValidateInterface
}