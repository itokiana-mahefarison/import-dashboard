import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { EntryStock } from "./EntryStock";

@Entity()
export class Site extends BaseEntity{
    @PrimaryColumn()
    id?: string

    @Column({nullable: false})
    name?: string

    @OneToMany(() => EntryStock, (entry) => entry.site, {lazy: true})
    entriesStock?: Array<EntryStock>
}