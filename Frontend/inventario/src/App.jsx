import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import InventoryPage from "./modules/inventory/pages/InventoryPage";
import Invoices from "./modules/invoices/pages/Invoices";
import InvoiceDetail from "./modules/invoices/pages/InvoiceDetail";
import CreateInvoice from "./modules/invoices/pages/CreateInvoice";
import PredictiveDashboard from "./modules/reports/pages/PredictiveDashboard";
import SalesPage from "./modules/sales/pages/SalesPage";
import SalesHistoryPage from "./modules/sales/pages/SalesHistoryPage";
import ReportsPage from "./modules/reports/pages/ReportsPage";
import UsersPage from "./modules/users/pages/UsersPage";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/inventory" 
          element={
            <PrivateRoute>
              <MainLayout>
                <InventoryPage />
              </MainLayout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/sales" 
          element={
            <PrivateRoute>
              <MainLayout>
                <SalesPage />
              </MainLayout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/invoices" 
          element={
            <PrivateRoute>
              <MainLayout>
                <Invoices />
              </MainLayout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/invoices/create" 
          element={
            <PrivateRoute>
              <MainLayout>
                <CreateInvoice />
              </MainLayout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/invoices/:id" 
          element={
            <PrivateRoute>
              <MainLayout>
                <InvoiceDetail />
              </MainLayout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/predictive-sales" 
          element={
            <PrivateRoute>
              <MainLayout>
                <PredictiveDashboard />
              </MainLayout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/users" 
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <MainLayout>
                  <UsersPage />
                </MainLayout>
              </RoleRoute>
            </PrivateRoute>
          } 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
