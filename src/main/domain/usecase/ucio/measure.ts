class UploadImageForMeasureUseCaseRequest {
    public image: string
    public customer_code: string
    public measure_datetime: Date
    public measure_type: string

    constructor(image: string, customer_code: string, measure_datetime: Date, measure_type: string) {
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

export {
    UploadImageForMeasureUseCaseRequest,
    UploadImageForMeasureUseCaseResponse
}