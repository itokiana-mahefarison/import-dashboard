import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Produit } from "./Produit";
import { Site } from "./Site";
import { PrixProduit } from "./PrixProduit";

@Entity()
export class EntryStock extends BaseEntity{
    @PrimaryColumn()
    id?: string

    @Column({nullable: false})
    entryDate?: string

    @ManyToOne(() => Produit, (produit) => produit.entryStock, {eager: true})
    @JoinColumn()
    produit?: Produit | null

    @Column({nullable: true, default: 0, type: "float"})
    poidsBrutKg?: number

    @Column({nullable: true, default: 0, type: "float"})
    tareKg?: number

    @Column({nullable: true, default: 0, type: "float"})
    poidsNetKg?: number

    @Column({nullable: true})
    observation?: string

    @Column({nullable: true})
    comments?: string

    @ManyToOne(() => Site, (site) => site.entriesStock, {eager: true})
    @JoinColumn()
    site?: Site | null

    @OneToOne(() => PrixProduit, {eager: true})
    @JoinColumn()
    prix?: PrixProduit | null
}