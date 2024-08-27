import { MeasureEntity, UploadFileResponse } from "../../entity/measure"

interface UploadImageForMeasureUseCaseRepositoryInterface {
    uploadImageForMeasure(image: any, imageID:string,mimeType: string): Promise<UploadFileResponse>
    getMesureFromImage(mimeType: string, fileUri: string, prompt: string): Promise<number | null>
    createMesure(measure:MeasureEntity):Promise<MeasureEntity>
    createTemporaryLinkForImage(imageID:string):string
}

export{
    UploadImageForMeasureUseCaseRepositoryInterface
}