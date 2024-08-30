import { GetMeasureEntity, MeasureEntity } from "../../../../domain/entity/measure"
import { AppDataSource } from "./datasorce"
import { MeasureModel } from "./model/measure"
import { toCreateMeasureEntity, toCreateMeasureModel, toGetMeasureEntity } from "./transformer/measure"

async function createMeasure(measure: MeasureEntity): Promise<MeasureEntity> {
    const measureModel = toCreateMeasureModel(measure)
    const repository = await AppDataSource.manager.save(measureModel)
    return toCreateMeasureEntity(repository)
}

async function getMeasureByMonth(code: string, type: string, date: string): Promise<MeasureEntity | null> {
    const repository = AppDataSource.getRepository(MeasureModel)
    const measure = await repository.findOne({ where: { customer_code: code, measure_type: type, measure_datetime:date } })
    return measure ?  toCreateMeasureEntity(measure) : null
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


async function getMeasureByCustomerCode(id:string, type?: string): Promise<GetMeasureEntity[] | null> {
    const repository = AppDataSource.getRepository(MeasureModel)
    const model = await repository.find({where:{measure_uuid: id, measure_type: type}})
    const result = model.map((e) => toGetMeasureEntity(e))
    return result
}

export {
    createMeasure,
    getMeasureByMonth,
    getMeasureByID,
    updateMeasureValue,
    getMeasureByCustomerCode
}