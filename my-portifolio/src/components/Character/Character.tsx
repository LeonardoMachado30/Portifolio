import React, { useRef, useEffect } from "react";
import { TimelineLite, TweenLite, TimelineMax } from "gsap";
import person from "@/assets/svg/person.svg";
import Image from "next/image";

interface CharacterProps {
  imageUrl: string;
}

const Character: React.FC<CharacterProps> = ({ imageUrl }) => {
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (characterRef.current) {
      const tl = new TimelineMax();

      tl.from(characterRef.current, {
        x: "100vw",
        duration: 5,
      }).to(characterRef.current, {
        x: "-100vw",
        duration: 5,
        delay: 1,
        onComplete: () => {
          gsap.to(characterRef.current, {
            // rotate: -90,
            x: "-=100",
            y: "+=100",
            duration: 5,
          });
        },
      });
    }
  }, []);

  return (
    <div
      ref={characterRef}
      style={{
        position: "absolute",
        top: "50%",
        right: "0",
        transform: "translateY(-50%)",
      }}
    >
      <Image src={person} alt="Character" />
    </div>
  );
};

export default Character;
