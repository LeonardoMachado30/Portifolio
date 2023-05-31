import React, { useEffect, useRef, useState } from "react";

// função que verifica se dois elementos se colidem
function checkCollision(el1, el2) {
  // obtém os limites dos elementos
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  // verifica se há interseção entre os limites
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

interface ICoords {
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
}

export default function Draggable() {
  // estado para armazenar a posição do elemento arrastável
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // referências para acessar os elementos no DOM
  const draggableRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(null);
  const isClicked = useRef<boolean>(false);
  const coords = useRef<ICoords>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  // função que é chamada quando o elemento é arrastado
  function handleDrag(e) {
    if (targetRef) {
      // atualiza a posição do elemento com base no movimento do mouse
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));

      // verifica se o elemento arrastável colidiu com o elemento alvo
      if (checkCollision(draggableRef.current, targetRef.current)) {
        // muda a cor do elemento alvo para vermelho
        targetRef.current.style.backgroundColor = "red";
      } else {
        // muda a cor do elemento alvo para verde
        targetRef.current.style.backgroundColor = "green";
      }
    }
  }

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
    let rect1 = elemento1.getBoundingClientRect();
    let rect2 = elemento2.getBoundingClientRect();

    // Verificar se há sobreposição nas direções horizontal e vertical
    const horizontal = rect1.right >= rect2.left && rect2.right >= rect1.left;
    const vertical = rect1.bottom >= rect2.top && rect2.bottom >= rect1.top;

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
      let fator = 50;
      const scaleY = 1.1;

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

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    isClicked.current = true;
    coords.current.startX = e.clientX;
    coords.current.startY = e.clientY;
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    isClicked.current = false;
    coords.current.lastX = draggableRef?.current.offsetLeft;
    coords.current.lastY = draggableRef?.current.offsetTop;
  };

  useEffect(() => {
    // if (boxRef && circulo2) {
    //   const elemento1 = boxRef.current;
    //   const elemento2 = circulo2.current;

    // elemento1.style.setProperty("--translate-x", "0px");
    // elemento1.style.setProperty("--translate-y", "0px");
    // elemento1.style.setProperty("--scale-y", "1");
    // elemento2.style.setProperty("--translate-x", "0px");
    // elemento2.style.setProperty("--translate-y", "0px");
    // elemento2.style.setProperty("--scale-y", "1");

    // Criar uma função que verifica a colisão a cada intervalo de tempo
    const handleColision = () => {
      // const isColision = colisaoERepulsao(elemento1, elemento2);
      // console.log(isColision ? "Colidiu" : "Não colidiu");

      // if (isColision) {
        // isClicked.current = false;
      // }
    };

    const timeOut = 300;
    const id = setInterval(handleColision, timeOut);
    return () => clearInterval(id);
    // }
  }, []);

  return (
    <div
      ref={draggableRef}
      onMouseDown={() => onMouseDown}
      onMouseUp={() => onMouseUp}
      // onMouseMove={}
      draggable={true}
      onDrag={handleDrag}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
    >
      Draggable
    </div>
  );
}
