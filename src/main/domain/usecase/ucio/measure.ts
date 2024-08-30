import { GetMeasureEntity, MeasureEntity } from "../../entity/measure"

class UploadImageForMeasureUseCaseRequest {
    public image: string
    public customer_code: string
    public measure_datetime: string
    public measure_type: string

    constructor(image: string, customer_code: string, measure_datetime: string, measure_type: string) {
        this.image = image
        this.customer_code = customer_code
        this.measure_datetime = measure_datetime
        this.measure_type = measure_type
    }
}

class UploadImageForMeasureUseCaseResponse {
    public image_url: string | null
    public measure_value: number | null
    public measure_uuid: string | null

    constructor(image_url: string | null, measure_value: number | null, measure_uuid: string | null) {
        this.image_url = image_url
        this.measure_value = measure_value
        this.measure_uuid = measure_uuid
    }
}

class ConfirmMeasureUseCaseRequest {
    public measure_uuid: string
    public confirmed_value: number

    constructor(measure_uuid: string, confirmed_value: number) {
        this.measure_uuid = measure_uuid
        this.confirmed_value = confirmed_value
    }
}

class ConfirmMeasureUseCaseResponse {
    public success: boolean | null

    constructor(sucess: boolean | null) {
        this.success = sucess
    }
}

class GetMeasureByCustomerCodeUseCaseRequest {
    public customer_code: string
    public measure_type: any | null

    constructor(customer_code: string, measure_type: any | null) {
        this.customer_code = customer_code
        this.measure_type = measure_type
    }
}

class GetMeasureByCustomerCodeUseCaseResponse {
    public customer_code: string | null
    public measures: GetMeasureEntity[] | null

    constructor(customer_code: string | null, measures: GetMeasureEntity[]| null) {
        this.customer_code = customer_code
        this.measures = measures
    }
}

export {
    UploadImageForMeasureUseCaseRequest,
    UploadImageForMeasureUseCaseResponse,
    ConfirmMeasureUseCaseRequest,
    ConfirmMeasureUseCaseResponse,
    GetMeasureByCustomerCodeUseCaseRequest,
    GetMeasureByCustomerCodeUseCaseResponse
}