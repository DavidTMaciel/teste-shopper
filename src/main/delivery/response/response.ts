import { Response } from "express"

class SuccessReponse{
    success(res: Response, body: any): any{
        return res.status(200).json(body)
    }
}

class InternalServerErrorReponse{
    parametersError(res: Response, body:any):any{
        return res.status(400).json(body)
    }
    notFoundError(res: Response, body:any):any{
        return res.status(404).json(body)
    }
    duplicateValuesError(res: Response, body:any):any{
        return res.status(409).json(body)
    }
}

export{
    SuccessReponse,
    InternalServerErrorReponse
}