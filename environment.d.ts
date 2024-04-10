declare namespace NodeJS {
    export interface ProcessEnv {
        readonly DB_HOST: string;
        readonly JWT_SECRET_KEY: string;
    }
}
