import { FaBookmark } from "react-icons/fa";

type Props = {
  className?: string 
}
export default function BookMarkFillIcon({className}: Props) {
  return (
    <div>
        <FaBookmark className={className || 'w-6 h-6'}/> 
    </div>
  );
}

