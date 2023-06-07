import Image from "next/image";
interface IProps {
  src: any;
  alt: string;
}

interface IProp {
  prop?: IProps;
  handleClick?: () => void;
  className?: string;
}

function Button({ prop, handleClick, className }: IProp): JSX.Element {
  return (
    <button
      className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-2 text-center opacity-70 hover:opacity-100 ${className}`}
      onClick={(e) => handleClick()}
    >
      <Image src={prop.src} alt={prop.alt} width={20} height={20} />
    </button>
  );
}

export default Button;
