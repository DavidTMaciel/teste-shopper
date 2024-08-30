import { Request, Response } from "express"
import { ConfirmMeasureUseCaseRequest, ConfirmMeasureUseCaseResponse, GetMeasureByCustomerCodeUseCaseRequest, UploadImageForMeasureUseCaseRequest } from "../../domain/usecase/ucio/measure"
import { ConfirmMeasureUseCaseRepository, GetMeasureByCustomerCodeUseCaseRepository, UploadImageForMeasureUseCaseRepository } from "../../infrastructure/provider/repository/measure"
import { ConfirmMeasureUseCaseValidate, GetMeasureByCustomerCodeUseCaseValidate, UploadImageForMeasureUseCaseValidate } from "../../infrastructure/provider/validate/measure"
import { UploadImageForMeasureUseCaseCommon } from "../../infrastructure/provider/common/measure"
import { ConfirmMeasureUseCase, GetMeasureByCustomerCodeUseCase, UploadImageForMeasureUseCase } from "../../domain/usecase/measure"
import { InternalServerErrorReponse, SuccessReponse } from "../response/response"
import { ErrorEntity } from "../../domain/entity/error"
import { ERROR_CODE_400, ERROR_CODE_400_TYPE, ERROR_CODE_404, ERROR_CODE_404_NOT_FOUND, ERROR_CODE_409, ERROR_CODE_409_REPORT } from "../../domain/usecase/constant/measure"

class UploadImageForMeasureController {
    async uploadImageForMeasure(req: Request, res: Response): Promise<void> {
        const { image, customer_code, measure_datetime, measure_type } = req.body

        const ucReq = new UploadImageForMeasureUseCaseRequest(image, customer_code, measure_datetime, measure_type)

        const repository = new UploadImageForMeasureUseCaseRepository()
        const validate = new UploadImageForMeasureUseCaseValidate()
        const common = new UploadImageForMeasureUseCaseCommon()
        const usecase = new UploadImageForMeasureUseCase(validate, common, repository)

        const ucRes = await usecase.uploadImageForMeasure(ucReq)

        if (ucRes instanceof ErrorEntity) {
            if (ucRes.error_code == ERROR_CODE_400) {
                new InternalServerErrorReponse().parametersError(res, ucRes)
            }
            if (ucRes.error_code == ERROR_CODE_404) {
                new InternalServerErrorReponse().notFoundError(res, ucRes)
            }
            if (ucRes.error_code == ERROR_CODE_409_REPORT) {
                new InternalServerErrorReponse().duplicateValuesError(res, ucRes)
            }
        } else {
            new SuccessReponse().success(res, ucRes)
        }

    }
}

class ConfirmMeasureController {
    async confirmMeasure(req: Request, res: Response): Promise<void> {
        const { measure_uuid, confirmed_value } = req.body

        const ucReq = new ConfirmMeasureUseCaseRequest(measure_uuid, confirmed_value)

        const validate = new ConfirmMeasureUseCaseValidate()
        const repository = new ConfirmMeasureUseCaseRepository()
        const usecase = new ConfirmMeasureUseCase(validate, repository)

        const ucRes = await usecase.confirmMeasure(ucReq)

        if (ucRes instanceof ErrorEntity) {
            if (ucRes.error_code == ERROR_CODE_400) {
                new InternalServerErrorReponse().parametersError(res, ucRes)
            }
            if (ucRes.error_code == ERROR_CODE_404) {
                new InternalServerErrorReponse().notFoundError(res, ucRes)
            }
            if (ucRes.error_code == ERROR_CODE_409) {
                new InternalServerErrorReponse().duplicateValuesError(res, ucRes)
            }
        } else {
            new SuccessReponse().success(res, ucRes)
        }
    }
}

class GetMeasureByCustomerCodeController {
    async getMeasureByCustomerCode(req: Request, res: Response): Promise<void> {

        const customer_code = req.params.customer_code
        let measure_type = req.query.measure_type || null

        const ucReq = new GetMeasureByCustomerCodeUseCaseRequest(customer_code, measure_type)

        const validate = new GetMeasureByCustomerCodeUseCaseValidate()
        const repository = new GetMeasureByCustomerCodeUseCaseRepository()
        const usecase = new GetMeasureByCustomerCodeUseCase(validate, repository)

        const ucRes = await usecase.getMeasureByCustomerCode(ucReq)


        if (ucRes instanceof ErrorEntity) {
            if (ucRes.error_code == ERROR_CODE_400_TYPE) {
                new InternalServerErrorReponse().parametersError(res, ucRes)
            }
            if (ucRes.error_code == ERROR_CODE_404_NOT_FOUND) {
                new InternalServerErrorReponse().notFoundError(res, ucRes)
            }
            if (ucRes.error_code == ERROR_CODE_409) {
                new InternalServerErrorReponse().duplicateValuesError(res, ucRes)
            }
        } else {
            new SuccessReponse().success(res, ucRes)
        }
    }
}

export {
    UploadImageForMeasureController,
    ConfirmMeasureController,
    GetMeasureByCustomerCodeController
}