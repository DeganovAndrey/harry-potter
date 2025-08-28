import React from "react";
import { Shell } from "lucide-react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <Shell className="spinner-icon" size={150} />
      <p>Загрузка данных о студентах Хогвартса...</p>
    </div>
  );
};
