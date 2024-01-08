import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { Column,OneToMany, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'cart' })
export class CartEntity{
@PrimaryGeneratedColumn('rowid')
id: number;

@Column({name:'user_id', nullable: false})
userId: number;

@CreateDateColumn({name: 'created_at'})
createdAt: Date;

@UpdateDateColumn({name: 'update_at'})
updateAt: Date

@UpdateDateColumn({ name: 'updated_at' })
updatedAt: Date;

@OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
cartProduct?: CartProductEntity[];

}