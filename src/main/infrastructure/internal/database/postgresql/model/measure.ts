import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
class MeasureModel {
    @PrimaryColumn({ type: 'varchar'})
    public measure_uuid: string

    @Column({ type: 'varchar'})
    public measure_datetime: string

    @Column({ type: 'varchar'})
    public measure_type: string

    @Column({ type: 'varchar' })
    public has_confirmed: boolean

    @Column({ type: 'varchar' })
    public image_url: string

    @Column({ type: 'integer' })
    public measure_value: number

    @Column({ type: 'varchar'})
    public customer_code: string

    constructor(measure_uuid: string, measure_datetime: string, measure_type: string, has_confirmed: boolean, image_url: string, measure_value: number,customer_code: string) {
        this.measure_uuid = measure_uuid
        this.measure_datetime = measure_datetime
        this.measure_type = measure_type
        this.has_confirmed = has_confirmed
        this.image_url = image_url
        this.measure_value = measure_value
        this.customer_code=customer_code
    }
}

export {
    MeasureModel
}