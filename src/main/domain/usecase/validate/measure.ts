import { UploadImageForMeasureUseCaseRequest } from "../ucio/measure"

interface UploadImageForMeasureUseCaseValidateInterface {
    uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest): Promise<string | null>
}

export{
    UploadImageForMeasureUseCaseValidateInterface
}