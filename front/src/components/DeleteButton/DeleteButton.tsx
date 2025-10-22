import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import "./DeleteButton.css"

export function DeleteButton({ onClick, className}: { onClick: () => void, className: string}) {
  return (
    <Button
			className="delete-button"
      variant="destructive"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
    >
		<X className="w-4 h-4" />
    </Button>
  );
}
