/**
 * Formatea un valor numérico a moneda Peso Colombiano (COP)
 * Ejemplo: 50000 -> $ 50.000
 * @param {number|string} value - El valor a formatear
 * @returns {string} - El valor formateado
 */
export const formatCurrency = (value) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '$ 0';

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatNumber = (value) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/\./g, '').replace(',', '.')) : value;
  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('es-CO').format(num);
};

/**
 * Recibe un string, quita cualquier formato previo y devuelve el número formateado con puntos
 * Útil para mascaras de input.
 */
export const formatInputNumber = (val) => {
  if (!val && val !== 0) return '';
  const clean = val.toString().replace(/\D/g, ''); // Solo dígitos
  if (clean === '') return '';
  return new Intl.NumberFormat('es-CO').format(parseInt(clean));
};

/**
 * Convierte un string formateado con puntos a un número puro para el estado/backend
 */
export const cleanFormattedNumber = (val) => {
  if (!val) return 0;
  return parseInt(val.toString().replace(/\D/g, '')) || 0;
};
