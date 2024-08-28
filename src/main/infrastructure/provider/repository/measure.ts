import { UploadFileResponse, MeasureEntity } from "../../../domain/entity/measure"
import { UploadImageForMeasureUseCaseRepositoryInterface } from "../../../domain/usecase/repository/measure"
import { createMeasure } from "../../internal/database/postgresql/measure"
import { geminiService } from "../../internal/gemini/gemini"

class UploadImageForMeasureUseCaseRepository implements UploadImageForMeasureUseCaseRepositoryInterface {
    async uploadImageForMeasure(image: any, imageID: string, mimeType: string): Promise<UploadFileResponse> {
        return await geminiService.uploadImage(image, imageID, mimeType)
    }
    async extractMesureFromImage(mimeType: string, fileUri: string, fileUrl: string): Promise<string> {
        return await geminiService.extractMesureFromImage(mimeType,fileUri,fileUrl)
    }
    async createMesure(measure: MeasureEntity): Promise<MeasureEntity> {
        return await createMeasure(measure)
    }
    async createTemporaryLinkForImage(imageID: string): string {
        
    }

}

export{
    UploadImageForMeasureUseCaseRepository
}