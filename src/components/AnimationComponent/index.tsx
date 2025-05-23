import { useContext, useEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCreative, Mousewheel } from "swiper";
import { AnimationContext } from "@utils/Context";
// import required modules
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface IProps {
  children: React.ReactNode | [] | any;
  isAnimation?: boolean;
  onSlideChange?: (index: number) => void;
  swiperRef?: React.RefObject<SwiperRef>;
}

export default function AnimationComponent({
  children,
  onSlideChange,
  swiperRef,
}: IProps): JSX.Element {
  const { animation } = useContext(AnimationContext);
  const prev = {
    translate: [0, "-100%", 0],
  };
  const next = {
    translate: [0, "100%", 0],
  };

  useEffect(() => {
    animation
      ? document.querySelector("body").classList.add("!overflow-hidden")
      : document.querySelector("body").classList.remove("!overflow-hidden");
  }, [animation]);

  //TODO: ESSE CÓDIGO CRIA ANIMAÇÔES DE TRANSAÇÂO DE SESSÂO
  //?? REFATORAR PARA ANIMAÇÂO EM CSS PURO
  // const onSlidePrevTransitionStart = (e) => {
  //   if (welcomeRef && e?.activeIndex === 0) {
  //     welcomeRef?.current?.handleEnd();
  //   } else if (aboutMeRef && e?.activeIndex === 1) {
  //     aboutMeRef?.current?.handleEnd();
  //   } else if (skillsRef && e?.activeIndex === 2) {
  //     skillsRef?.current?.handleEnd();
  //   } else if (repositoriesRef && e?.activeIndex === 3) {
  //     repositoriesRef?.current?.handleEnd();
  //   }
  // };

  // const onSlideNextTransitionStart = (e) => {
  //   if (welcomeRef && e?.activeIndex === 0) {
  //     welcomeRef?.current?.handleStart();
  //   } else if (aboutMeRef && e?.activeIndex === 1) {
  //     aboutMeRef?.current?.handleStart();
  //   } else if (skillsRef && e?.activeIndex === 2) {
  //     skillsRef?.current?.handleStart();
  //   } else if (repositoriesRef && e?.activeIndex === 3) {
  //     repositoriesRef?.current?.handleStart();
  //   }
  // };

  // useEffect(() => {
  //   if (welcomeRef && page?.activeIndex === 0) {
  //     welcomeRef?.current?.handleStart();
  //   }
  // }, []);

  return animation ? (
    <Swiper
      effect={"creative"}
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={100}
      mousewheel={true}
      speed={600}
      pagination={{
        clickable: true,
      }}
      creativeEffect={{ prev, next }}
      modules={[EffectCreative, Mousewheel, Pagination]}
      className="bg-animation !h-screen"
      ref={swiperRef}
      onSlideChange={(swiper) => {
        if (typeof onSlideChange === "function") {
          onSlideChange(swiper.activeIndex);
        }
      }}
      //TODO: onSlideNextTransitionStart={(e) => onSlideNextTransitionStart(e)}
      //TODO: onSlidePrevTransitionStart={(e) => onSlidePrevTransitionStart(e)}
    >
      {children.map((item, index) => {
        return (
          <SwiperSlide
            key={index}
            className="bg-tranparent relative !flex h-screen flex-col justify-center !text-white"
          >
            {item}
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    <div className="bg-animation">
      {children.map((item) => {
        const { type } = item;
        return (
          <div
            key={type}
            className="bg-tranparent relative !flex h-screen flex-col  items-center !justify-center !text-center text-white"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
