import React from "react";
import Layout from "../../components/layout/Layout";

export default function Tienda() {
  return (
    <Layout>
      
      {/* Sección adicional de productos destacados */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-black text-center mb-12">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Plantillas Deportivas", price: "$1,200", image: "https://placehold.co/400x300/007BFF/FFFFFF?text=Plantillas+Deportivas" },
              { name: "Rodillera Elástica", price: "$800", image: "https://placehold.co/400x300/00BCD4/FFFFFF?text=Rodillera+Elástica" },
              { name: "Faja Lumbar", price: "$950", image: "https://placehold.co/400x300/1E40AF/FFFFFF?text=Faja+Lumbar" },
              { name: "Calzado Ortopédico", price: "$2,500", image: "https://placehold.co/400x300/6366F1/FFFFFF?text=Calzado+Ortopédico" }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-blue-600 font-bold text-xl">{product.price}</p>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
} 