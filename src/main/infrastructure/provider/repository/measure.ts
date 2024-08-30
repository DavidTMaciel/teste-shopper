import { UploadFileResponse, MeasureEntity, GetMeasureEntity } from "../../../domain/entity/measure"
import { ConfirmMeasureUseCaseRepositoryInterface, GetMeasureByCustomerCodeUseCaseRepositoryInterface, UploadImageForMeasureUseCaseRepositoryInterface } from "../../../domain/usecase/repository/measure"
import { storageLocal } from "../../internal/cloud/cloud"
import { createMeasure, getMeasureByCustomerCode, getMeasureByID, updateMeasureValue } from "../../internal/database/postgresql/measure"
import { geminiService } from "../../internal/gemini/gemini"

class UploadImageForMeasureUseCaseRepository implements UploadImageForMeasureUseCaseRepositoryInterface {
    async uploadImageForMeasure(image: any, imageID: string, mimeType: string): Promise<UploadFileResponse> {
        return await geminiService.uploadImage(image, imageID, mimeType)
    }
    async extractMesureFromImage(mimeType: string, fileUri: string, fileUrl: string): Promise<string> {
        return await geminiService.extractMesureFromImage(mimeType, fileUri, fileUrl)
    }
    async createMesure(measure: MeasureEntity): Promise<MeasureEntity> {
        return await createMeasure(measure)
    }
    async createTemporaryLinkForImage(fileUri: string): Promise<string> {
        return await storageLocal.generateTemporaryLink(fileUri)
    }

}

class ConfirmMeasureUseCaseRepository implements ConfirmMeasureUseCaseRepositoryInterface {
    async getMeasureByID(id: string): Promise<MeasureEntity | null> {
        return await getMeasureByID(id)
    }
    async updateMeasureValue(measure: MeasureEntity): Promise<void> {
        return await updateMeasureValue(measure)
    }

}

class GetMeasureByCustomerCodeUseCaseRepository implements GetMeasureByCustomerCodeUseCaseRepositoryInterface{
    async getMeasureByCustomerCode(code: string, type?: string): Promise<GetMeasureEntity[] | null> {
        return await getMeasureByCustomerCode(code, type)
    }
}

export {
    UploadImageForMeasureUseCaseRepository,
    ConfirmMeasureUseCaseRepository,
    GetMeasureByCustomerCodeUseCaseRepository
}