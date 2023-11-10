import { AddressEntity } from 'src/address/entities/address.entity';
import { StateEntity } from 'src/state/entities/state.entity';
import {ManyToOne,JoinColumn, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'

@Entity({name: 'city'})
export class CityEntity{
    @PrimaryGeneratedColumn('rowid')
    id:number;

    @Column({name: 'state_id', nullable: false})
    stateId: number;

    @Column({name: 'name', nullable: false})
    name: string;


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(()=> AddressEntity, (address) => address.city)
    address?: AddressEntity[];

    @ManyToOne(() => StateEntity, (state) => state.cities) // Update 'addresses' to 'endereços'
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    state?: StateEntity;
}