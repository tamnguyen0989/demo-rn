import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column('string')
    firstName: string

    @Column('string')
    lastName: string

    @Column('int')
    age: number

}
