
type Props = {
  text: string
  onClick: () => void
}
export default function ColorButton({text, onClick}: Props) {
  return (
    <div className=" rounded-md bg-gradient-to-br from-fuchsia-800 via-rose-500 to-amber-600 p-1 ">
      <button
        className=" bg-white rounded-sm p-0.5 hover:opacity-90 transition-opacity"
        onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

