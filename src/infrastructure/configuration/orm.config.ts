import * as dotenv from "dotenv";
import { ConnectionOptions } from 'typeorm';
dotenv.config({ path: `env/${process.env.NODE_ENV}.env` });

const config: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: './src/infrastructure/migrations',
    }
};

export = config;
