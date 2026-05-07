import pool from "../db.js";

export const getProducts = async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products ORDER BY id DESC")
        console.log("fetched products:", products.rows)

        res.status(200).json({
            success: true,
            data: products.rows,
        })
    } catch (err) {
        console.log("Error in getAllProducts function", err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    const singleProduct = await pool.query("SELECT * FROM products WHERE id=$1", [id])

    res.status(200).json({
        success: true,
        data: singleProduct.rows[0]
    })
}

export const addProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newProduct = await pool.query("INSERT INTO products(name,price) VALUES($1,$2) RETURNING *", [name, price])
        console.log("new product added:", newProduct.rows[0])
        res.status(201).json({
            success: true,
            data: newProduct.rows[0]
        })
    } catch (err) {
        console.log("Error in createProduct function", err)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await pool.query("DELETE FROM products WHERE id=$1 RETURNING *", [id])


        // checking remaining rows
        const countResult = await pool.query("SELECT COUNT(*) FROM products")

        const count = parseInt(countResult.rows[0].count)

        if (count === 0) {
            await pool.query("ALTER SEQUENCE products_id_seq RESTART WITH 1")
        }


        res.json({
            success: true,
            message: "Product Deleted Successfully",
            data: deleted.rows[0]
        })
    } catch (err) {
        console.log("Error in deleteProduct function", err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const updated = await pool.query("UPDATE products SET name=$1 , price=$2 WHERE id=$3 RETURNING *", [name, price, id])

        if (updated.rows.length == 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updated.rows[0]
        })
    } catch (err) {
        console.log("Error in update product", err)

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }


}