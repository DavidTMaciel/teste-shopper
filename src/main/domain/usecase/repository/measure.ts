import { GetMeasureEntity, MeasureEntity, UploadFileResponse } from "../../entity/measure"

interface UploadImageForMeasureUseCaseRepositoryInterface {
    uploadImageForMeasure(image: any, imageID: string, mimeType: string): Promise<UploadFileResponse>
    extractMesureFromImage(mimeType: string, fileUri: string, prompt: string): Promise<string>
    createMesure(measure: MeasureEntity): Promise<MeasureEntity>
    createTemporaryLinkForImage(fileUri: string): Promise<string>
}

interface ConfirmMeasureUseCaseRepositoryInterface {
    getMeasureByID(id: string): Promise<MeasureEntity | null>
    updateMeasureValue(measure: MeasureEntity): Promise<void>
}

interface GetMeasureByCustomerCodeUseCaseRepositoryInterface {
    getMeasureByCustomerCode(id: string, type?: string): Promise<GetMeasureEntity[] | null>
}

export {
    UploadImageForMeasureUseCaseRepositoryInterface,
    ConfirmMeasureUseCaseRepositoryInterface,
    GetMeasureByCustomerCodeUseCaseRepositoryInterface
}