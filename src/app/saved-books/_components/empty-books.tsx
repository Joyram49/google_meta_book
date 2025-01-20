// components/EmptyState.tsx
import { User } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex items-center justify-center space-x-2 text-gray-500">
      <User className="text-4xl" />
      <p>No saved books found.</p>
    </div>
  );
};

export default EmptyState;
