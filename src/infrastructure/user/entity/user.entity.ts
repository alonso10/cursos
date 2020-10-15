import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    birthDate: Date;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 16);
    }

}
