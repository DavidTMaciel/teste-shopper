import { UploadImageForMeasureUseCaseCommonInterface } from "../../../domain/usecase/common/measure";
import { v4 as uuidv4 } from 'uuid'

class UploadImageForMeasureUseCaseCommon implements UploadImageForMeasureUseCaseCommonInterface{
    generateUUID(): string {
        return uuidv4()
     }
     newDate(): Date {
      return new Date()
     }
}

export{
    UploadImageForMeasureUseCaseCommon
}