import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Produit } from "./Produit";
import { Site } from "./Site";

@Entity()
export class EntryStock extends BaseEntity{
    @PrimaryColumn()
    id?: string

    @Column({nullable: false})
    entryDate?: string

    @ManyToOne(() => Produit, (produit) => produit.entryStock)
    @JoinColumn()
    produit?: Produit | null

    @Column({nullable: true, default: 0})
    poidsBrutKg?: number

    @Column({nullable: true, default: 0})
    tareKg?: number

    @Column({nullable: true, default: 0})
    poidsNetKg?: number

    @Column({nullable: true})
    observation?: string

    @Column({nullable: true})
    comments?: string

    @ManyToOne(() => Site, (site) => site.entriesStock)
    @JoinColumn()
    site?: Site | null
}