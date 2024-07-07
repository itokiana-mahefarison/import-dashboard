import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produit } from "./Produit";
import { Site } from "./Site";

@Entity()
export class EntryStock extends BaseEntity{
    @PrimaryGeneratedColumn({type: 'int'})
    id?: number

    @Column({nullable: false, type: "varchar"})
    entryDate?: string

    @OneToOne(() => Produit, {eager: true})
    @JoinColumn()
    produit?: Produit

    @Column({nullable: true, default: 0, type: "int"})
    poidsBrutKg?: number

    @Column({nullable: true, default: 0, type: "int"})
    tareKg?: number

    @Column({nullable: true, default: 0, type: "int"})
    poidsNetKg?: number

    @Column({nullable: true, type: "varchar"})
    observation?: string

    @Column({nullable: true, type: "varchar"})
    comments?: string

    @ManyToOne(() => Site, (site) => site.entriesStock, {eager: true})
    site?: Site
}