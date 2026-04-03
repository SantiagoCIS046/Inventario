function Table({ headers, data, renderRow }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  {renderRow(item, idx)}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-10 text-center text-gray-400 italic">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
