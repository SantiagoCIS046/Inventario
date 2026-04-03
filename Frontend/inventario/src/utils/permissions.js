export const permissions = {
  admin: [
    "view_inventory",
    "create_product",
    "edit_product",
    "delete_product",
    "view_users",
    "manage_users",
    "view_sales",
    "create_sale",
    "view_reports",
    "export_reports",
  ],
  employee: [
    "view_inventory",
    "view_sales",
    "create_sale",
  ],
};

export const hasPermission = (user, permission) => {
  if (!user) return false;
  // Soportamos tanto 'rol' (backend actual) como 'role' (solicitado por usuario)
  const role = user.role || user.rol || "employee";
  return permissions[role.toLowerCase()]?.includes(permission);
};
