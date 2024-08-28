import { ErrorEntity, TAG_INTERNAL_SERVER_ERROR } from "../entity/error"
import { MeasureEntity } from "../entity/measure"
import { UploadImageForMeasureUseCaseCommonInterface } from "./common/measure"
import { UploadImageForMeasureUseCaseRepositoryInterface } from "./repository/measure"
import { UploadImageForMeasureUseCaseRequest, UploadImageForMeasureUseCaseResponse } from "./ucio/measure"
import { UploadImageForMeasureUseCaseValidateInterface } from "./validate/measure"
import * as fs from 'fs'

class UploadImageForMeasureUseCase {
    public validate: UploadImageForMeasureUseCaseValidateInterface
    public common: UploadImageForMeasureUseCaseCommonInterface
    public repository: UploadImageForMeasureUseCaseRepositoryInterface

    constructor(validate: UploadImageForMeasureUseCaseValidateInterface, common: UploadImageForMeasureUseCaseCommonInterface, repository: UploadImageForMeasureUseCaseRepositoryInterface) {
        this.validate = validate
        this.common = common
        this.repository = repository
    }

    async uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest): Promise<UploadImageForMeasureUseCaseResponse | ErrorEntity> {
        try {
            const messageError = await this.validate.uploadImageForMeasure(req)

            if (!messageError) {
                let image = this.convertBase64ToFile(req.image)
                const imageID = this.common.generateUUID()
                const mimeType = this.extractMimeType(req.image)
                const upload = await this.repository.uploadImageForMeasure(image, imageID, mimeType!)

                let prompt = 'pegar da imagem a sequencia de numeros que aparece no medidor, e retornar em texto o valor numerico'
                const value = await this.repository.extractMesureFromImage(upload.mimeType, upload.fileUri, prompt)
                let measureValue = Number(value)
                const temporaryUrl = this.repository.createTemporaryLinkForImage(req.image)

                const measureID = this.common.generateUUID()

                const measure = new MeasureEntity(measureID, req.measure_datetime, req.measure_type, true, temporaryUrl, measureValue)
                await this.repository.createMesure(measure)
                return new UploadImageForMeasureUseCaseResponse(temporaryUrl, measureValue, measureID,)
            } else {
                return messageError
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new UploadImageForMeasureUseCaseResponse(null, null, null)
        }
    }

    private convertBase64ToFile(base64String: string): string {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')
        const filename = `upload_${Date.now()}.jpg`

        fs.writeFileSync(filename, buffer)
        return filename
    }

    private extractMimeType(base64String: string): string | null {
        const match = base64String.match(/^data:(image\/\w+);base64,/)
        return match ? match[1] : null
    }
}

export {
    UploadImageForMeasureUseCase
}