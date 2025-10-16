import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import "./style.css"

export default function({onClick}: any){
	return (
		<Button
			variant="default"
			className="floating-btn bg-blue-500 hove r:bg-blue-600 text-white"
			style={{ width: "56px", height: "56px" }}
			onClick={onClick}>
		<PlusIcon className="w-4 h-4" />
		</Button>)
}