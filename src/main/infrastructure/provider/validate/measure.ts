import { ErrorEntity } from "../../../domain/entity/error"
import { ERROR_CODE_400, ERROR_CODE_409_REPORT } from "../../../domain/usecase/constant/measure"
import { ConfirmMeasureUseCaseRequest, GetMeasureByCustomerCodeUseCaseRequest, UploadImageForMeasureUseCaseRequest } from "../../../domain/usecase/ucio/measure"
import { ConfirmMeasureUseCaseValidateInterface, GetMeasureByCustomerCodeUseCaseValidateInterface, UploadImageForMeasureUseCaseValidateInterface } from "../../../domain/usecase/validate/measure"
import { getMeasureByID, getMeasureByMonth } from "../../internal/database/postgresql/measure"
import { checkIfWaterOrGas, checkNumberEmpty, checkStringEmpty, isBase64String, isValidDateFormat } from "./validate"

class UploadImageForMeasureUseCaseValidate implements UploadImageForMeasureUseCaseValidateInterface {
    async uploadImageForMeasure(req: UploadImageForMeasureUseCaseRequest): Promise<ErrorEntity | null> {
        if (checkStringEmpty(req.customer_code)) return new ErrorEntity(ERROR_CODE_400, "O codigo deve ser informado")

        if (checkIfWaterOrGas(req.measure_type)) return new ErrorEntity(ERROR_CODE_400, "O tipo da medição, obrigatoriamente deve ser WATER ou GAS")

        if (isBase64String(req.image)) return new ErrorEntity(ERROR_CODE_400, "A imagem deve ser informada, e estar no formato base64")

        if (isValidDateFormat(req.measure_datetime)) return new ErrorEntity(ERROR_CODE_400, "A data da medição deve ser informada \n ex:28/08/2024")

        if (req.measure_type && !checkIfWaterOrGas(req.measure_type)) {
           if (await this.compareMonthYearAndType(req.measure_datetime, req.measure_type, req.customer_code)) return new ErrorEntity(ERROR_CODE_409_REPORT, "Leitura do mês já realizada")
         }
        return null
    }

    private async compareMonthYearAndType(inputDate: string, inputType: string, code: string): Promise<boolean> {
        const mesure = await getMeasureByMonth(code, inputType, inputDate)
        if (!mesure || !mesure.measure_datetime) {
            return false
        }
        const [inputDay, inputMonth, inputYear] = inputDate.split("/")
        const [measureDay, measureMonth, measureYear] = mesure.measure_datetime.split("/")
        return  inputMonth === measureMonth && inputYear === measureYear && inputType === mesure.measure_type      
    }


    /*private async checkMeasureMonthByType(date: string, type: string, code: string): Promise<boolean> {
        console
        const inputDate = this.parseDate(date)
        if (!inputDate) return false

        const measures = await getMeasureByMonth(code)
        if (!measures) return false

        const inputMonth = inputDate.getMonth()
        const inputYear = inputDate.getFullYear()

        return measures.some(measure => {
            const measureDate = this.parseDate(measure.measure_datetime)
            if (!measureDate) return false
            const measureMonth = measureDate.getMonth()
            const measureYear = measureDate.getFullYear()
            return measureMonth === inputMonth && measureYear === inputYear && measure.measure_type === type
        })
    }*/

    /* private parseDate(dateString: string): Date | null {
         const dateTimeRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
         const value = String(dateString)
         const match = value.match(dateTimeRegex)//resolver problema do math
         if (!match) return null
         const day = parseInt(match[1], 10)
         const month = parseInt(match[2], 10) - 1
         const year = parseInt(match[3], 10)
         return new Date(year, month, day)
     }*/
}

class ConfirmMeasureUseCaseValidate implements ConfirmMeasureUseCaseValidateInterface {
    async confirmMeasure(req: ConfirmMeasureUseCaseRequest): Promise<ErrorEntity | null> {
        if (checkStringEmpty(req.measure_uuid)) return new ErrorEntity(ERROR_CODE_400, "Campo invalido, deve ser preenchido uma medição")

        if (checkNumberEmpty(req.confirmed_value)) return new ErrorEntity(ERROR_CODE_400, "Valor invalido, deve ser preenchido e ser do tipo numerico")

        return null
    }

}

class GetMeasureByCustomerCodeUseCaseValidate implements GetMeasureByCustomerCodeUseCaseValidateInterface {
    async getMeasureByCustomerCode(req: GetMeasureByCustomerCodeUseCaseRequest): Promise<ErrorEntity | null> {
        if (req.measure_type ? checkIfWaterOrGas(req.measure_type) : false) return new ErrorEntity(ERROR_CODE_400, "O tipo da medição, obrigatoriamente deve ser WATER ou GAS")

        return null
    }

}

export {
    UploadImageForMeasureUseCaseValidate,
    ConfirmMeasureUseCaseValidate,
    GetMeasureByCustomerCodeUseCaseValidate
}