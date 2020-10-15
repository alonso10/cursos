import { Nullable } from "../Nullable";
import User from "./user";

export default abstract class UserRepository {
    abstract async findByEmail(email: string): Promise<Nullable<User>>;
    abstract async save(user: User): Promise<void>;
}