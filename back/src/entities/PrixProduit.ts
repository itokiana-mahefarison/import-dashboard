import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produit } from "./Produit";

@Entity()
export class PrixProduit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({default: 0})
    prix?: number

    @CreateDateColumn()
    createdAt?: string

    @ManyToOne(() => Produit, (produit) => produit.prix, {eager: true})
    @JoinColumn()
    produit?: Produit
}