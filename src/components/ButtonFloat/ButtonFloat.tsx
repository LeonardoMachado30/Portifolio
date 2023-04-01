import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
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
  className?: string;
  classNameModal?: string;
}

const Box = styled.div``;
const Modal = styled.div`
  // z-index: -1;
  box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  -webkit-box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  -moz-box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  max-width: 300px;
  // min-width: 150px;

  @media screen and (max-width: 380px) {
    max-width: 220px;
  }

  @media screen and (max-width: 280px) {
    max-width: 200px;
  }
  // transition: all 1s ease-in-out;
`;

function ButtonFloat({ prop, children, className }: IProp): JSX.Element {
  const { src, alt, bottom } = prop;
  const _alt = alt ? alt : "alt generico";
  const [openModal, setOpenModal] = useState<boolean>(false);
  const BoxRef = useRef<HTMLDivElement>(null);
  const ModalRef = useRef<HTMLDivElement>(null);
  const space = [0, 20, 80, 120, 160];
  const Bottom = bottom && `${space[bottom]}px`;
  const opacityHandle = openModal ? "opacity-100" : "opacity-60";

  return (
    <>
      <div
        className={`fixed right-6 z-20 ml-10 w-full`}
        style={{ bottom: Bottom }}
        ref={BoxRef}
      >
        <Box className="absolute right-0 bottom-0 w-12 rounded-full bg-white p-2 text-center shadow">
          <Image
            className={`cursor-pointer ${opacityHandle}`}
            src={src}
            alt={_alt}
            width={30}
            height={30}
            onClick={() => {
              setOpenModal(!openModal);
            }}
          />
        </Box>
      </div>

      {openModal && (
        <Modal
          ref={ModalRef}
          className={`fixed right-5 bottom-5 z-10 ml-auto mr-auto w-full rounded bg-white p-2 ${className}`}
          style={{
            borderRightWidth: "20px",
            borderTopRightRadius: "4px",
            borderBottomWidth: "20px",
            borderBottomLeftRadius: "4px",
          }}
        >
          {children && children}
        </Modal>
      )}
    </>
  );
}

export default ButtonFloat;
