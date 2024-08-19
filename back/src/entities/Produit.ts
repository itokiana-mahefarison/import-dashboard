import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { EntryStock } from './EntryStock'
import { PrixProduit } from './PrixProduit'

@Entity()
export class Produit extends BaseEntity {

    @PrimaryColumn()
    id?: string

    @Column({nullable: true})
    label?: string

    @Column({nullable: true})
    class?: string

    @OneToMany(() => EntryStock, (entry) => entry.produit, {lazy: true})
    entryStock?: Array<EntryStock>

    @OneToMany(() => PrixProduit, (prix) => prix.produit, {lazy: true})
    prix?: Array<PrixProduit>
}