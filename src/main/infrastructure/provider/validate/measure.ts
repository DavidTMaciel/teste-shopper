import { ErrorEntity } from "../../../domain/entity/error"
import { ERROR_CODE_400, ERROR_CODE_400_TYPE, ERROR_CODE_409_REPORT } from "../../../domain/usecase/constant/measure"
import { ConfirmMeasureUseCaseRequest, GetMeasureByCustomerCodeUseCaseRequest, UploadImageForMeasureUseCaseRequest } from "../../../domain/usecase/ucio/measure"
import { ConfirmMeasureUseCaseValidateInterface, GetMeasureByCustomerCodeUseCaseValidateInterface, UploadImageForMeasureUseCaseValidateInterface } from "../../../domain/usecase/validate/measure"
import { getMeasureByID, getMeasureByMonth } from "../../internal/database/postgresql/measure"
import { checkIfWaterOrGas, checkNumberEmpty, checkStringEmpty, hasMoreThanTenDigits, isBase64String, isValidDateFormat } from "./validate"

class UploadImageForMeasureUseCaseValidate implements UploadImageForMeasureUseCaseValidateInterface {
    async uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest): Promise<ErrorEntity | null> {
        if (checkStringEmpty(req.customer_code)) return new ErrorEntity(ERROR_CODE_400, "O codigo deve ser informado")

        if (checkIfWaterOrGas(req.measure_type)) return new ErrorEntity(ERROR_CODE_400, "O tipo da medição, obrigatoriamente deve ser WATER ou GAS")

        if (isBase64String(req.image)) return new ErrorEntity(ERROR_CODE_400, "A imagem deve ser informada, e estar no formato base64")

        if (isValidDateFormat(req.measure_datetime)) return new ErrorEntity(ERROR_CODE_400, "A data da medição deve ser informada, em formatado datetime, ex: 2024-08-21 08:00:00")

        if (req.measure_type && !checkIfWaterOrGas(req.measure_type)) {
           if (await this.compareMonthYearAndType(req.measure_datetime, req.measure_type, req.customer_code)) return new ErrorEntity(ERROR_CODE_409_REPORT, "Leitura do mês já realizada")
         }
        return null
    }

    private async compareMonthYearAndType(inputDate: string, inputType: string, code: string): Promise<boolean> {
        const mesures = await getMeasureByMonth(code, inputType.toUpperCase())
        
        if (!mesures || mesures.length === 0) {
            return false
        }
    
        const [inputYear, inputMonth] = inputDate.split(" ")[0].split("-")
        
        for (const mesure of mesures) {
            if (!mesure.measure_datetime) {
                continue
            }
            const [measureYear, measureMonth] = mesure.measure_datetime.split(" ")[0].split("-")
    
            if (inputMonth === measureMonth && inputYear === measureYear && inputType.toUpperCase() === mesure.measure_type) {
                return true
            }
        }
        return false
    }
    
}

class ConfirmMeasureUseCaseValidate implements ConfirmMeasureUseCaseValidateInterface {
    async confirmMeasure(req: ConfirmMeasureUseCaseRequest): Promise<ErrorEntity | null> {
        if (checkStringEmpty(req.measure_uuid)) return new ErrorEntity(ERROR_CODE_400, "Campo invalido, deve ser preenchido uma medição")

        if (checkNumberEmpty(req.confirmed_value)) return new ErrorEntity(ERROR_CODE_400, "Valor invalido, deve ser preenchido e ser do tipo inteiro")

        if(hasMoreThanTenDigits(req.confirmed_value)) return new ErrorEntity(ERROR_CODE_400, "Valor invalido, deve ser preenchido e ser do tipo inteiro")

        return null
    }

}

class GetMeasureByCustomerCodeUseCaseValidate implements GetMeasureByCustomerCodeUseCaseValidateInterface {
    async getMeasureByCustomerCode(req: GetMeasureByCustomerCodeUseCaseRequest): Promise<ErrorEntity | null> {
        if (req.measure_type ? checkIfWaterOrGas(req.measure_type) : false) return new ErrorEntity(ERROR_CODE_400_TYPE, "Tipo de medição não permitida")

        return null
    }

}

export {
    UploadImageForMeasureUseCaseValidate,
    ConfirmMeasureUseCaseValidate,
    GetMeasureByCustomerCodeUseCaseValidate
}