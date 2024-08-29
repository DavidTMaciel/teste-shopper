import { MeasureEntity } from "../../../../domain/entity/measure"
import { AppDataSource } from "./datasorce"
import { MeasureModel } from "./model/measure"
import { toCreateMeasureEntity, toCreateMeasureModel } from "./transformer/measure"

async function createMeasure(measure: MeasureEntity): Promise<MeasureEntity> {
    const measureModel = toCreateMeasureModel(measure)
    const repository = await AppDataSource.manager.save(measureModel)
    return toCreateMeasureEntity(repository)
}

async function getMeasureByMonth(code: string): Promise<MeasureEntity[] | null> {
    const repository = AppDataSource.getRepository(MeasureModel)
    const measure = await repository.find({ where: { customer_code: code } })
    return measure ? measure.map((e) => toCreateMeasureEntity(e)) : null
}

async function getMeasureByID(ID: string): Promise<MeasureModel | null> {
    const repository = AppDataSource.getRepository(MeasureModel)
    const measure = await repository.findOne({ where: { measure_uuid: ID } })
    return measure ? toCreateMeasureEntity(measure) : null
}

async function updateMeasureValue(measure: MeasureEntity): Promise<void>{
    const repository = AppDataSource.getRepository(MeasureModel)
    const model = toCreateMeasureModel(measure)
    await repository.save(model)
}

export {
    createMeasure,
    getMeasureByMonth,
    getMeasureByID,
    updateMeasureValue
}