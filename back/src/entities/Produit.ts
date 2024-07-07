import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { EntryStock } from './EntryStock'

@Entity()
export class Produit extends BaseEntity {

    @PrimaryColumn({type: "string"})
    id?: string

    @Column({nullable: true, type: "varchar"})
    label?: string

    @Column({nullable: true, type: "varchar"})
    class?: string

    @OneToOne(() => EntryStock, (entry) => entry.produit, {eager: true})
    entryStock?: EntryStock
}