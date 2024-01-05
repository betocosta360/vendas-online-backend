import { CategoryEntity } from 'src/category/entities/category.entity';
import {
    ManyToOne,
    JoinColumn,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'category_id', nullable: false })
    categoryId: number;

    @Column({ name: 'price', nullable: false })
    price: number;

    @Column({ name: 'image', nullable: false })
    image: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.products)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category?: CategoryEntity;
}
