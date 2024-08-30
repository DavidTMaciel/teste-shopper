import { ErrorEntity, TAG_INTERNAL_SERVER_ERROR } from "../entity/error"
import { MeasureEntity } from "../entity/measure"
import { UploadImageForMeasureUseCaseCommonInterface } from "./common/measure"
import { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_404_NOT_FOUND, ERROR_CODE_409, PROMPT } from "./constant/measure"
import { ConfirmMeasureUseCaseRepositoryInterface, GetMeasureByCustomerCodeUseCaseRepositoryInterface, UploadImageForMeasureUseCaseRepositoryInterface } from "./repository/measure"
import { ConfirmMeasureUseCaseRequest, ConfirmMeasureUseCaseResponse, GetMeasureByCustomerCodeUseCaseResponse, GetMeasureByCustomerCodeUseCaseRequest, UploadImageForMeasureUseCaseRequest, UploadImageForMeasureUseCaseResponse } from "./ucio/measure"
import { ConfirmMeasureUseCaseValidateInterface, GetMeasureByCustomerCodeUseCaseValidateInterface, UploadImageForMeasureUseCaseValidateInterface } from "./validate/measure"
import * as fs from 'fs'
import path from 'path'

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

            if (messageError) {
                console.log(messageError);
                return messageError;  // Retorna imediatamente se houver erro
            }
                let image = this.convertBase64ToFile(req.image)
                const imageID = this.common.generateUUID()
                const mimeType = this.extractMimeType(req.image)
      
                const upload = await this.repository.uploadImageForMeasure(image[1], imageID, mimeType!)

                const value = await this.repository.extractMesureFromImage(upload.mimeType, upload.fileUri, PROMPT)
                let measureValue = Number(value)
                const temporaryUrl = await this.repository.createTemporaryLinkForImage(image[0])

                const measureID = this.common.generateUUID()

                const measure = new MeasureEntity(measureID, req.measure_datetime, req.measure_type.toUpperCase(), true, temporaryUrl, measureValue, req.customer_code)
                console.log('use case', measure)
                await this.repository.createMesure(measure)
                return new UploadImageForMeasureUseCaseResponse(temporaryUrl, measureValue, measureID,)
            
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new UploadImageForMeasureUseCaseResponse(null, null, null)
        }
    }

    private convertBase64ToFile(base64String: string): string[] {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')
        const filename = `upload_${Date.now()}.jpg`

        const filePath = path.join(__dirname, '..', '..', '..', '..', 'public', filename)

        fs.mkdirSync(path.dirname(filePath), { recursive: true })

        fs.writeFileSync(filePath, buffer)
        return [filename, filePath]
    }

    private extractMimeType(base64String: string): string | null {
        const match = base64String.match(/^data:(image\/\w+);base64,/)
        return match ? match[1] : null
    }
}

class ConfirmMeasureUseCase {
    public validate: ConfirmMeasureUseCaseValidateInterface
    public repository: ConfirmMeasureUseCaseRepositoryInterface

    constructor(validate: ConfirmMeasureUseCaseValidateInterface, repository: ConfirmMeasureUseCaseRepositoryInterface) {
        this.validate = validate
        this.repository = repository
    }

    async confirmMeasure(req: ConfirmMeasureUseCaseRequest): Promise<ConfirmMeasureUseCaseResponse | ErrorEntity> {
        try {
            const messageError = await this.validate.confirmMeasure(req)

            if (!messageError) {
                const measure = await this.repository.getMeasureByID(req.measure_uuid)

                if (measure) {
                    if (measure.measure_value == req.confirmed_value) {
                        return new ErrorEntity(ERROR_CODE_409, "Leitura do mês já realizada")
                    } else {
                        measure.measure_value = req.confirmed_value
                        await this.repository.updateMeasureValue(measure)
                        return new ConfirmMeasureUseCaseResponse(true)
                    }
                } else {
                    return new ErrorEntity(ERROR_CODE_404, "Leitura não encontrada")
                }
            }
            return messageError
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new ConfirmMeasureUseCaseResponse(null)
        }
    }
}

class GetMeasureByCustomerCodeUseCase {
    public validate: GetMeasureByCustomerCodeUseCaseValidateInterface
    public repository: GetMeasureByCustomerCodeUseCaseRepositoryInterface

    constructor(validate: GetMeasureByCustomerCodeUseCaseValidateInterface, repository: GetMeasureByCustomerCodeUseCaseRepositoryInterface) {
        this.validate = validate
        this.repository = repository
    }

    async getMeasureByCustomerCode(req: GetMeasureByCustomerCodeUseCaseRequest): Promise<GetMeasureByCustomerCodeUseCaseResponse | ErrorEntity> {
        try {

            const messageError = await this.validate.getMeasureByCustomerCode(req)

            if(!messageError){
                let measure = null
                if(req.measure_type){
                     measure = await this.repository.getMeasureByCustomerCode(req.customer_code,req.measure_type)
                }else{
                    measure = await this.repository.getMeasureByCustomerCode(req.customer_code)
                }
                
                return measure ? new GetMeasureByCustomerCodeUseCaseResponse(req.customer_code, measure) : new ErrorEntity(ERROR_CODE_404_NOT_FOUND, "Nenhuma leitura encontrada")
            }
            return messageError
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new GetMeasureByCustomerCodeUseCaseResponse(null, null)
        }

    }
}

export {
    UploadImageForMeasureUseCase,
    ConfirmMeasureUseCase,
    GetMeasureByCustomerCodeUseCase
}