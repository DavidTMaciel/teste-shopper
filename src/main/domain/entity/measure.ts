class MeasureEntity{
   public measure_uuid: string
   public measure_datetime: Date
   public measure_type: string
   public has_confirmed:boolean
   public image_url: string
   public measure_value:number

    constructor(measure_uuid: string,measure_datetime: Date,measure_type: string,has_confirmed:boolean,image_url: string,measure_value:number){
        this.measure_uuid=measure_uuid
        this.measure_datetime=measure_datetime
        this.measure_type=measure_type
        this.has_confirmed=has_confirmed
        this.image_url=image_url
        this.measure_value=measure_value
    }
}

class UploadFileResponse{
    public mimeType: string
    public fileUri: string

    constructor(mimeType: string,fileUri: string){
        this.mimeType=mimeType
        this.fileUri=fileUri     
    }
}

export{
    MeasureEntity,
    UploadFileResponse
}