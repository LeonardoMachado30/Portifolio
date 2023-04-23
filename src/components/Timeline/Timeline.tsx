import { image_none, certification_component } from "@/assets/svg/index";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import styled from "styled-components";

const Bubble = styled.image`
  -webkit-animation: slide-all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite
    both;
  animation: slide-all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both;

  @-webkit-keyframes slide-all {
    0% {
      -webkit-transform: translateX(-20px);
      transform: translateX(-20px) rotate(-4deg);
    }
    50% {
      -webkit-transform: translateX(20px);
      transform: translateX(20px) rotate(4deg);
    }
    100% {
      -webkit-transform: translateX(-20px);
      transform: translateX(-20px) rotate(-4deg);
    }
  }

  @keyframes slide-all {
    0% {
      -webkit-transform: translateX(-20px);
      transform: translateX(-20px) rotate(-4deg);
    }
    50% {
      -webkit-transform: translateX(20px);
      transform: translateX(20px) rotate(4deg);
    }
    100% {
      -webkit-transform: translateX(-20px);
      transform: translateX(-20px) rotate(-4deg);
    }
  }
`;

const Timeline = (): JSX.Element => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const circulo1 = useRef(null);
  const circulo2 = useRef(null);
  const [colision, setColision] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const animation = (ref, tl) => {
    console.log(ref.getBoundingClientRect());
    const x = ref.getBoundingClientRect().x;
    const y = ref.getBoundingClientRect().y;

    tl.from(ref, {
      x: 30,
      y: 0,
      rotation: "-10_cw",
      transformOrigin: "left top",
    })
      .from(ref, {
        x: 0,
      })
      .to(ref, {
        x: 30,
        y: 0,
        rotation: "10_cw",
        duration: 3,
        transformOrigin: "top right",
        repeat: -1, // repeat indefinitely
        yoyo: true, // reverse the animation on each repeat
        ease: "power1.inOut",
      });
    return tl;
  };

  const animationBubble = () => {
    if (bubbleRef) {
      const lenght = Array.from(bubbleRef?.current.children);
      let tl = gsap.timeline();

      for (const item of lenght) {
        // console.log(item);
        tl = animation(item, tl);
      }
    }
  };

  // Função que verifica se há colisão entre dois elementos
  // function colisao(elemento1, elemento2) {
  //   // Obter as coordenadas e dimensões dos elementos após a transformação
  //   var rect1 = elemento1.getBoundingClientRect();
  //   var rect2 = elemento2.getBoundingClientRect();

  //   // Verificar se há sobreposição nas direções horizontal e vertical
  //   var horizontal = rect1.right >= rect2.left && rect2.right >= rect1.left;
  //   var vertical = rect1.bottom >= rect2.top && rect2.bottom >= rect1.top;

  //   // Retornar verdadeiro se houver sobreposição nas duas direções
  //   return horizontal && vertical;
  // }

  // Função que verifica se há colisão entre dois elementos e os repele
  function colisaoERepulsao(elemento1, elemento2) {
    // Obter as coordenadas e dimensões dos elementos após a transformação
    var rect1 = elemento1.getBoundingClientRect();
    var rect2 = elemento2.getBoundingClientRect();

    // Verificar se há sobreposição nas direções horizontal e vertical
    let horizontal = rect1.right >= rect2.left && rect2.right >= rect1.left;
    let vertical = rect1.bottom >= rect2.top && rect2.bottom >= rect1.top;

    // Se houver sobreposição nas duas direções, significa que houve colisão
    if (horizontal && vertical) {
      // Obter os estilos computados dos elementos
      let style1 = getComputedStyle(elemento1);
      let style2 = getComputedStyle(elemento2);

      // Obter os valores atuais das propriedades de transformação dos elementos
      let translateX1 = parseFloat(
        style1.getPropertyValue("transform").split(",")[4]
      );
      let translateY1 = parseFloat(
        style1.getPropertyValue("transform").split(",")[5]
      );
      let translateX2 = parseFloat(
        style2.getPropertyValue("transform").split(",")[4]
      );
      let translateY2 = parseFloat(
        style2.getPropertyValue("transform").split(",")[5]
      );

      // Definir um fator de repulsão arbitrário
      var fator = 50;

      // Alterar os valores das propriedades de transformação dos elementos de acordo com a direção da colisão
      if (rect1.right >= rect2.left && rect1.left <= rect2.left) {
        // Colisão pela direita do elemento 1
        translateX1 -= fator;
        translateX2 += fator;
      }
      if (rect1.left <= rect2.right && rect1.right >= rect2.right) {
        // Colisão pela esquerda do elemento 1
        translateX1 += fator;
        translateX2 -= fator;
      }
      if (rect1.bottom >= rect2.top && rect1.top <= rect2.top) {
        // Colisão por baixo do elemento 1
        translateY1 -= fator;
        translateY2 += fator;
      }
      if (rect1.top <= rect2.bottom && rect1.bottom >= rect2.bottom) {
        // Colisão por cima do elemento 1
        translateY1 += fator;
        translateY2 -= fator;
      }

      const scaleY = 1.1;

      elemento1.style.setProperty("--translate-x", `${translateX1}px`);
      elemento1.style.setProperty("--translate-y", `${translateY1}px`);
      elemento1.style.setProperty("--scale-y", `${scaleY}`);
      elemento2.style.setProperty("--translate-x", `${translateX2}px`);
      elemento2.style.setProperty("--translate-y", `${translateY2}px`);
      elemento2.style.setProperty("--scale-y", `${scaleY}`);

      elemento1.style.setProperty(
        "transform",
        `translate(${translateX1}px ${translateY1}px) scaleY(${scaleY})`
      );
      elemento2.style.setProperty(
        "transform",
        `translate(${translateX2}px ${translateY2}px) scaleY(${scaleY})`
      );
    }

    return horizontal && vertical;
  }

  // Usar um hook de efeito para monitorar as mudanças nos elementos
  useEffect(() => {
    const elemento1 = boxRef.current;
    const elemento2 = circulo2.current;

    elemento1.style.setProperty("--translate-x", "0px");
    elemento1.style.setProperty("--translate-y", "0px");
    elemento1.style.setProperty("--scale-y", "1");
    elemento2.style.setProperty("--translate-x", "0px");
    elemento2.style.setProperty("--translate-y", "0px");
    elemento2.style.setProperty("--scale-y", "1");

    if (elemento1 && elemento2) {
      // Criar uma função que verifica a colisão a cada intervalo de tempo
      const handleColision = () => {
        const isColision = colisaoERepulsao(elemento1, elemento2);
        console.log(isColision ? "Colidiu" : "Não colidiu");

        if (isColision) {
          isClicked.current = false;
        }
      };

      const timeOut = 300;
      const id = setInterval(handleColision, timeOut);
      return () => clearInterval(id);
    }
  }, []);

  // useEffect(() => {
  //   let posX = 0,
  //     posY = 0,
  //     mouseX = 0,
  //     mouseY = 0;

  //   boxRef?.current.addEventListener("mousedown", mouseDown, false);
  //   window.addEventListener("mouseup", mouseUp, false);

  //   function mouseDown(e) {
  //     e.preventDefault();
  //     posX = e.clientX - boxRef?.current.offsetLeft;
  //     posX = e.clientX - boxRef?.current.offsetTop;

  //     window.addEventListener("mousemove", moveElement, false);
  //   }

  //   function mouseUp() {
  //     window.removeEventListener("mousemove", moveElement, false);
  //   }

  //   function moveElement(e) {
  //     console.log("move")
  //     mouseX = e.clientX - posX;
  //     mouseY = e.clientY - posY;
  //     boxRef.current.style.left = mouseX + "px";
  //     boxRef.current.style.top = mouseY + "px";
  //   }
  // }, []);

  // useEffect(() => {
  //   // animationBubble();
  //   if (image1Ref && image2Ref) colisao(image1Ref?.current, image2Ref?.current);
  // }, [colision]);

  // ? Event move element in the window
  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault();

      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, []);

  // ? Function disabled mouse event button right
  function disableContextMenu(e) {
    e.preventDefault(); // evita o comportamento padrão do navegador
    return false; // cancela o menu de contexto
  }

  return (
    <div
      className="container-drag flex gap-4"
      ref={containerRef}
      onContextMenu={disableContextMenu}
    >
      <div
        // ref={circulo1}
        ref={boxRef}
        className="box-drag"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "red",
          transform: "translateX(20px) scaleY(1)",
          transition: "transform 4s",
          animation:
            "slide-all 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both",
        }}
      >
        <Image
          src={certification_component}
          alt="asd"
          width={100}
          height={100}
          ref={circulo1}
        />
      </div>
      <div
        ref={circulo2}
        className="relative left-1/2 top-1/2"
        // style={{
        //   width: "100px",
        //   height: "100px",
        //   borderRadius: "50%",
        //   backgroundColor: "blue",
        //   transform: "translateX(-20px) scaleY(1)",
        //   transition: "transform 4s",
        //   animation:
        //     "slide-all-reverse 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both",
        // }}
      >
        <Image
          src={certification_component}
          alt="asdss"
          width={100}
          height={100}
          ref={circulo2}
        />
      </div>
    </div>
  );
};

export default Timeline;
