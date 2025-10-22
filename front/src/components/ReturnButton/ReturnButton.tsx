import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ReturnButton({ path, className}: { path: string, className: string}) {
	const navigate = useNavigate();
  return (
    <Button
			className={className}
      variant="destructive"
      size="icon"
      onClick={() => navigate(path)}
    >
		<X className="w-4 h-4" />
    </Button>
  );
}
