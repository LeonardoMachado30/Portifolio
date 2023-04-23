import React, { useRef, useState } from "react";

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

export default function Draggable() {
  // estado para armazenar a posição do elemento arrastável
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // referências para acessar os elementos no DOM
  const draggableRef = useRef(null);
  const targetRef = useRef(null);

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

  return (
    <div className="App">
      <h1>Draggable Demo</h1>
      <div
        ref={draggableRef}
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
      <div
        ref={targetRef}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "green",
          position: "absolute",
          left: "300px",
          top: "100px",
        }}
      >
        Target
      </div>
    </div>
  );
}
