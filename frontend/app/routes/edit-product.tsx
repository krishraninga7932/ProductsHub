import axios from 'axios'
import {
    Form,
    redirect,
    useLoaderData,
    useActionData,
    useParams,
} from "react-router";
import { useEffect } from "react";



// load single product
export async function loader({ params }: any) {
    try {
        const res = await axios.get(`http://localhost:9000/products/${params.id}`)
        return res.data.data
    } catch (err) {
        console.log("Error fetching product:", err)
        return null
    }
}


// update action
export async function action({ request, params }: any) {
    const formData = await request.formData()


    try {
        await axios.put(`http://localhost:9000/products/update/${params.id}`,
            {
                name: formData.get("name"),
                price: formData.get("price")
            }
        );

        return redirect("/products")

    } catch (err: any) {
        return {
            error: err.response?.data?.message || "Update failed",
        };
    }

}


export default function EditProduct() {
    const product = useLoaderData<any>();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            alert(actionData.error)
        }
    }, [actionData])

    if (!product) {
        return <p className="text-center mt-10">Product not found</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border">
                {/* TITLE */}
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                    Edit Product
                </h2>
                <p className="text-gray-600 text-center mt-2">
                    Update your product details
                </p>

                <Form method='post' className='mt-6 flex flex-col gap-4'>
                    <div>
                        <label className="text-sm text-gray-600">Product Name</label>
                        <input type="text" name='name' defaultValue={product.name}
                            className="w-full mt-1 border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Product Price</label>
                        <input type="number" name='price' defaultValue={product.price}
                            className="w-full mt-1 border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="mt-4 cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Update Product
                    </button>

                </Form>
            </div>
        </div>
    )
}