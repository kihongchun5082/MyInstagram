import { FaRegBookmark } from "react-icons/fa";

type Props = {
  className?: string
}
export default function BookMarkIcon({className}: Props) {
  return (
    <div>
        <FaRegBookmark className={className || 'w-6 h-6'} />
    </div>
  );
}

