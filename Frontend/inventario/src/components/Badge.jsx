function Badge({ status, label }) {
  const styles = {
    "in-stock": "bg-green-50 text-green-600 border-green-100",
    "low-stock": "bg-red-50 text-red-600 border-red-100",
  };

  const displayText = label || (status === "in-stock" ? "IN STOCK" : "LOW STOCK");

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "in-stock" ? "bg-green-500" : "bg-red-500"}`} />
      {displayText}
    </span>
  );
}

export default Badge;
