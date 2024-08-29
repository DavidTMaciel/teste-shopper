class MeasureEntity {
    public measure_uuid: string
    public measure_datetime: string
    public measure_type: string
    public has_confirmed: boolean
    public image_url: string
    public measure_value: number
    public customer_code: string

    constructor(measure_uuid: string, measure_datetime: string, measure_type: string, has_confirmed: boolean, image_url: string, measure_value: number, customer_code: string) {
        this.measure_uuid = measure_uuid
        this.measure_datetime = measure_datetime
        this.measure_type = measure_type
        this.has_confirmed = has_confirmed
        this.image_url = image_url
        this.measure_value = measure_value
        this.customer_code = customer_code
    }
}

class UploadFileResponse {
    public mimeType: string
    public fileUri: string

    constructor(mimeType: string, fileUri: string) {
        this.mimeType = mimeType
        this.fileUri = fileUri
    }
}

export {
    MeasureEntity,
    UploadFileResponse
}