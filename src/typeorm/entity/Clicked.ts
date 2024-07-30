import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Clicked {
    @PrimaryGeneratedColumn()
    id: number
    @Column('int')
    vehicle: number
    @Column('int')
    person: number
    @Column('int')
    photo: number
    @Column('int')
    scan: number
    @Column('int')
    signature: number
}