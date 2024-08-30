import { GetMeasureEntity, MeasureEntity } from "../../../../../domain/entity/measure"
import { MeasureModel } from "../model/measure"

function toCreateMeasureEntity(m: MeasureModel): MeasureEntity{
    return new MeasureEntity(m.measure_uuid,m.measure_datetime,m.measure_type,m.has_confirmed,m.image_url,m.measure_value,m.customer_code)
}

function toCreateMeasureModel(e: MeasureEntity): MeasureEntity{
    return new MeasureModel(e.measure_uuid,e.measure_datetime,e.measure_type,e.has_confirmed,e.image_url,e.measure_value, e.customer_code)
}

function toGetMeasureEntity(m: MeasureModel): GetMeasureEntity{
    return new GetMeasureEntity(m.measure_uuid,m.measure_datetime,m.measure_type,m.has_confirmed,m.image_url)
}

export{
    toCreateMeasureEntity,
    toCreateMeasureModel,
    toGetMeasureEntity
}