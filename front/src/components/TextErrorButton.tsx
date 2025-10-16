export function TextErrorButton({ onClick, p, error}: { onClick: () => void; p: string, error: any}) {
  return (
		<>{error}
    <button onClick={onClick} className="font-bold">
      <span className="font-bold">Vous avez un compte ? Connecter vous !</span>
    </button></>
  );
}
