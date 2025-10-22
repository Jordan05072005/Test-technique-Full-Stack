import "./SettingButton.css"

export default function SettingButton({onClick, className}: any){
	return (
		<button className="second-button"
					onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}>⚙</button>
	)
}