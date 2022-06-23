import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    [x: string]: any;
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
}