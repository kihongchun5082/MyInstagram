import { FcLike } from "react-icons/fc";

type Props = {
  className?: string
}
export default function HeartIcon({className}: Props) {
  return (
    <div>
        <FcLike className={className || 'w-7 h-7'}/> 
    </div>
  );
}

