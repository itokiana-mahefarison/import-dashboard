import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { EntryStock } from './EntryStock'

@Entity()
export class Produit extends BaseEntity {

    @PrimaryColumn()
    id?: string

    @Column({nullable: true})
    label?: string

    @Column({nullable: true})
    class?: string

    @OneToMany(() => EntryStock, (entry) => entry.produit, {eager: true})
    entryStock?: Array<EntryStock>
}