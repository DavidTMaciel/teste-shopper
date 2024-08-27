import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
class MeasureModel {
    @PrimaryColumn({ type: 'varchar'})
    public measure_uuid: string

    @Column({ type: 'timestamp', nullable: true, update: false})
    public measure_datetime: Date

    @Column({ type: 'varchar'})
    public measure_type: string

    @Column({ type: 'varchar' })
    public has_confirmed: string

    @Column({ type: 'varchar' })
    public image_url: string

    @Column({ type: 'varchar' })
    public measure_value: string

    constructor(measure_uuid: string, measure_datetime: Date, measure_type: string, has_confirmed: string, image_url: string, measure_value: string) {
        this.measure_uuid = measure_uuid
        this.measure_datetime = measure_datetime
        this.measure_type = measure_type
        this.has_confirmed = has_confirmed
        this.image_url = image_url
        this.measure_value = measure_value
    }
}

export {
    MeasureModel
}