import Image from "next/image";
import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

interface IProps {
  src: any;
  alt: string;
  text?: string;
  bottom?: number;
}

interface IProp {
  prop: IProps;
  children?: ReactNode;
  handleOpenModal?: (prop: string, openModal: boolean) => void;
}
interface Child {
  ModalRef: any;
}
const ButtonFloat = forwardRef<Child, any>(
  ({ prop, children, handleOpenModal }: IProp, ref) => {
    {
      const [openModal, setOpenModal] = useState<boolean>(false);
      const { src, alt, bottom } = prop;
      const _alt = alt ? alt : "alt generico";
      // const [openModal, setOpenModal] = useState<boolean>(false);
      const ModalRef = useRef<HTMLDivElement>(null);
      // const space = [0, 40, 100, 160, 160];
      // const Bottom = bottom && `${space[bottom]}px`;
      // const opacityHandle = openModal ? "opacity-100" : "opacity-70";

      useImperativeHandle(ref, () => ({
        ModalRef: ModalRef,
      }));

      return (
        <>
          <div className={`fixed right-6 z-20 ml-10 w-full b-${bottom}`}>
            <button
              value={"true"}
              className={`absolute bottom-0 right-0 w-12 cursor-pointer rounded-full bg-white  p-2 text-center opacity-70 shadow hover:opacity-100`}
              onClick={(e) => {
                setOpenModal(!openModal);
                handleOpenModal(_alt, openModal);
              }}
            >
              <Image src={src} alt={_alt} width={30} height={30} />
            </button>
            {openModal && children}
          </div>
        </>
      );
    }
  }
);

export default ButtonFloat;
