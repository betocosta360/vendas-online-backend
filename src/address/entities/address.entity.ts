import { UserEntity } from 'src/user/entities/user.entity';
import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'

@Entity({name: 'address'})
export class AddressEntity{
    @PrimaryGeneratedColumn('rowid')
    id:number;

    @Column({name: 'user_id', nullable: false})
    userId: string;

    @Column({name: 'complement', nullable: true})
    complement: string;

    @Column({name: 'number'})
    numberAddress: string;

    @Column({name: 'cep', nullable: false})
    cep: string;

    @Column({name: 'city_id', nullable: false})
    cityId: string


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({name: 'user_id', referencedColumnName:'id'})
    user?: UserEntity
}