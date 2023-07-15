import { FcLikePlaceholder } from "react-icons/fc";
type Props = {
  className?: string
}
export default function LikePlaceholderIcon({className}: Props) {
  return (
    <div>
      <FcLikePlaceholder className={className || 'w-7 h-7'}/>
    </div>
  );
}

