import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { EntryStock } from "./EntryStock";

@Entity()
export class Site extends BaseEntity{
    @PrimaryColumn({type: "string"})
    id?: string

    @Column({nullable: false, type: "varchar"})
    name?: string

    @OneToMany(() => EntryStock, (entry) => entry.site, {eager: true})
    entriesStock?: Array<EntryStock>
}