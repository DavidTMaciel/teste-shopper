import { MeasureEntity } from "../../../../domain/entity/measure"
import { AppDataSource } from "./datasorce"
import { toCreateMeasureEntity,toCreateMeasureModel } from "./transformer/measure"

async function createMeasure(measure: MeasureEntity):Promise<MeasureEntity>{
    const measureModel = toCreateMeasureModel(measure)
    const repository = await AppDataSource.manager.save(measureModel)
    return toCreateMeasureEntity(repository)
}

export{
    createMeasure
}