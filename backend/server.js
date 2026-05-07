import express from "express"
import cors from "cors"
import pool from "./db.js"
import productRoutes from "./routes/productRoutes.js"

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoutes)

async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL
            )    
        `)
        console.log("✅ Table created / already exists");
    } catch (err) {
        console.log("Error initDB", err)
    }
}

initDB().then(() => {
    app.listen(9000, () => {
        console.log("Server started on port 9000 ");
    });
});