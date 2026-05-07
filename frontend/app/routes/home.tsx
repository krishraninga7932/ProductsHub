import { Link } from "react-router";

export default function Home() {
  return (
    <div className="space-y-20">

      {/* 🔥 HERO SECTION */}
      <section className="text-center pt-16">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Manage Your Products
          <span className="text-blue-600"> Effortlessly</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
          A simple and powerful system to add, track, and manage your products with ease.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            View Products
          </Link>

          <Link
            to="/add-product"
            className="border border-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Add Product
          </Link>
        </div>
      </section>

      {/* 🔥 FEATURES SECTION */}
      <section className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800">
            📦 Easy Product Management
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Add, edit, and organize your products quickly without complexity.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800">
            ⚡ Fast & Responsive
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Built with modern tools for lightning-fast performance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800">
            🔒 Secure & Reliable
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Your data is safe with a stable backend and database system.
          </p>
        </div>

      </section>

      {/* 🔥 FOOTER CTA */}
      <section className="text-center bg-blue-600 text-white py-12 rounded-xl">
        <h2 className="text-2xl font-bold">
          Ready to get started?
        </h2>
        <p className="mt-2 text-blue-100">
          Add your first product and start managing today.
        </p>

        <Link
          to="/add-product"
          className="inline-block mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Add Product →
        </Link>
      </section>

    </div>
  );
}