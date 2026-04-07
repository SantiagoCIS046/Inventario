import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

const Alert = ({ type = "info", message, className = "" }) => {
  const styles = {
    success: {
      container: "bg-[#d1e7dd] border-[#badbcc] text-[#0f5132]",
      icon: <CheckCircle2 size={18} />,
    },
    danger: {
      container: "bg-[#f8d7da] border-[#f5c2c7] text-[#842029]",
      icon: <AlertCircle size={18} />,
    },
    warning: {
      container: "bg-[#fff3cd] border-[#ffecb5] text-[#664d03]",
      icon: <AlertTriangle size={18} />,
    },
    info: {
      container: "bg-[#cff4fc] border-[#b6effb] text-[#055160]",
      icon: <Info size={18} />,
    },
  };

  const currentStyle = styles[type] || styles.info;

  if (!message) return null;

  return (
    <div 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm animate-in fade-in slide-in-from-top-1 duration-300 ${currentStyle.container} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {currentStyle.icon}
      </div>
      <div className="flex-1 font-medium">
        {message}
      </div>
    </div>
  );
};

export default Alert;
