import pkg from "pg"
import { Pool } from "pg"

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "TEST_STACK",
    password: "12345",
    port: 5432,
});

export default pool;