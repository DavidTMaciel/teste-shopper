import { ErrorEntity } from "../../entity/error"
import { ConfirmMeasureUseCaseRequest, GetMeasureByCustomerCodeUseCaseRequest, UploadImageForMeasureUseCaseRequest } from "../ucio/measure"

interface UploadImageForMeasureUseCaseValidateInterface {
    uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest): Promise<ErrorEntity | null>
}

interface ConfirmMeasureUseCaseValidateInterface{
    confirmMeasure(req:ConfirmMeasureUseCaseRequest): Promise<ErrorEntity | null>
}

interface GetMeasureByCustomerCodeUseCaseValidateInterface{
    getMeasureByCustomerCode(req:GetMeasureByCustomerCodeUseCaseRequest): Promise<ErrorEntity | null>
}

export{
    UploadImageForMeasureUseCaseValidateInterface,
    ConfirmMeasureUseCaseValidateInterface,
    GetMeasureByCustomerCodeUseCaseValidateInterface
}