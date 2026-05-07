import axios from "axios";
import { Form, redirect, useActionData } from "react-router";
import { useEffect } from "react";

export async function action({ request }: any) {
    const formData = await request.formData();

    try {
        await axios.post("http://localhost:9000/products", {
            name: formData.get("name"),
            price: formData.get("price"),
        });

        return redirect("/products");
    } catch (err: any) {
        return { error: err.response?.data?.message || "All fields are required" }
    }
}

export default function AddProduct() {
    const actionData = useActionData();

    useEffect(()=>{
        if(actionData?.error){
            alert(actionData.error)
        }
    },[actionData])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border">

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                    Add Product
                </h2>

                <p className="text-gray-600 text-center mt-2">
                    Fill the details to add a new product
                </p>

                {/* FORM */}
                <Form method="post" className="mt-6 flex flex-col gap-4">

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            className="w-full mt-1 border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-sm text-gray-600">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            className="w-full mt-1 border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="mt-4 cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Add Product
                    </button>
                </Form>


            </div>
        </div>
    );
}