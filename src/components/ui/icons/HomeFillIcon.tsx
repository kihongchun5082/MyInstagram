import { SiHomebrew } from "react-icons/si";

type Props = {
  className?: string
}
export default function HomeFillIconPage({className}: Props) {
  return (
    <div>
      <SiHomebrew className={className || 'w-7 h-7'}/>
    </div>
  );
}

