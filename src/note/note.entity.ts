import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    date: string
}