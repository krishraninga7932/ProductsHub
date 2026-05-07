import { Pencil } from "lucide-react"
import axios from "axios";
import { useLoaderData, Form, Link } from "react-router";


export async function loader() {
  try {
    const res = await axios.get("http://localhost:9000/products")
    console.log(res.data.data)
    return res.data.data || []

  } catch (err) {
    console.log("Error fetching products:", err);
    return [];
  }

}

export async function action({ request }: any) {
  const formData = await request.formData()
  const id = formData.get("id")

  try {
    await axios.delete(`http://localhost:9000/products/delete/${id}`)
  } catch (err) {
    console.log("Delete error:", err);
  }

  return null


}




export default function Products() {
  const products = useLoaderData<any[]>() || [];

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Products
        </h1>
        <Link
          to="/add-product"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">
            No products found
          </h2>
          <p className="text-gray-500 mt-2">
            Start by adding your first product
          </p>

          <Link
            to="/add-product"
            className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Product
          </Link>
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="relative bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* INFO */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {p.name}
              </h3>

              <p className="text-blue-600 font-bold text-lg">
                ₹{p.price}
              </p>
            </div>


            {/* Edit */}
            <Link to={`/edit-product/${p.id}`} className="absolute top-3 right-3 text-gray-400 hover:text-blue-600"><Pencil size={18} /></Link>

            {/* Actions */}
            <div className="flex justify-between items-center mt-6">
              <button className="text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
                View
              </button>
              <Form method="post">
                <input type="hidden" name="id" value={p.id} />
                <button className="text-sm text-red-500 hover:text-red-600 cursor-pointer">
                  Delete
                </button>
              </Form>
            </div>
          </div>
        ))}
      </div>



    </div>
  )


}