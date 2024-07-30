import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Uploaded {
    @PrimaryGeneratedColumn()
    id: number
    @Column('text')
    uri: string
}