import { ErrorEntity } from "../entity/error"
import { UploadImageForMeasureUseCaseCommonInterface } from "./common/measure"
import { UploadImageForMeasureUseCaseRepositoryInterface } from "./repository/measure"
import { UploadImageForMeasureUseCaseRequest, UploadImageForMeasureUseCaseResponse } from "./ucio/measure"
import { UploadImageForMeasureUseCaseValidateInterface } from "./validate/measure"
import * as fs from 'fs';

fs.readFileSync
class UploadImageForMeasureUseCase {
    public validate: UploadImageForMeasureUseCaseValidateInterface
    public common: UploadImageForMeasureUseCaseCommonInterface
    public repository: UploadImageForMeasureUseCaseRepositoryInterface

    constructor(validate: UploadImageForMeasureUseCaseValidateInterface,common: UploadImageForMeasureUseCaseCommonInterface,repository: UploadImageForMeasureUseCaseRepositoryInterface){
        this.validate=validate
        this.common=common
        this.repository=repository
    }
    
    async uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest):Promise<UploadImageForMeasureUseCaseResponse | ErrorEntity>{
        try{
            const messageError = await this.validate.uploadImageForMeasure(req)

            if(!messageError){
                let image = this.base64ToFile(req.image, "default")
                const imageID = this.common.generateUUID()
                const mimeType = this.extractMimeType(req.image)
                const upload = await this.repository.uploadImageForMeasure(image,imageID,mimeType)

                let prompt = 'pegar da imagem a sequencia de numeros que aparece no medidor, e retornar em texto o valor numerico'
                const value = await this.repository.getMesureFromImage(upload.mimeType,upload.fileUri,prompt)

                const temporaryUrl =  this.repository.createTemporaryLinkForImage(req.image)

            }else{

            }
        }catch(error:any){
            console.log(error)
        }
    }

    private base64ToFile(base64String: string, filename: string) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')
    
        fs.writeFile(filename, buffer, (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo:', err)
            } else {
                console.log('Arquivo salvo com sucesso!')
            }
        });
    }

    private extractMimeType(base64String: string): string | null {
        const match = base64String.match(/^data:(image\/\w+);base64,/)
        return match ? match[1]
    }
}