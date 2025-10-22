import { LogIn, User } from "lucide-react"
import { Button } from "./ui/button"

export default function LogBouton({onClick}: any){
	return (
		<Button
  		variant="default"
  		className="bg-blue-500 hove r:bg-blue-600 text-white"
  		onClick={onClick}>
  	<User className="w-4 h-4" />
		</Button>)
}