export default function setErrorMessage(err: string, setteur : any){
	setteur(err);
  setTimeout(() => setteur(null), 3000);
}