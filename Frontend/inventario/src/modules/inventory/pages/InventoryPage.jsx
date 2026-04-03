import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../services/inventoryService";
import InventoryHeader from "../components/InventoryHeader";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data || []);
  };

  const handleCreate = async (data) => {
    await createProduct(data);
    setShowForm(false);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="space-y-6">
      <InventoryHeader onAdd={() => setShowForm(true)} />
      <ProductTable products={products} onDelete={handleDelete} />

      {showForm && (
        <ProductForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default InventoryPage;
