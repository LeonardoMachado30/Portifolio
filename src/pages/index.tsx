import React, { useEffect } from "react";
import { useRef, useState } from "react";

import Head from "next/head";

import { LanguageContext, AnimationContext } from "@/utils/Context";

import {
  AboutMe,
  Skills,
  Repositories,
  Welcome,
  OptionsFixed,
} from "@/components/export";

// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, EffectCreative, Mousewheel } from "swiper";

interface UserContextValue {
  language: string;
  setLanguage: (language: string) => void;
}

interface IPage {
  activeIndex?: number;
}

export default function Home(): JSX.Element {
  const [page, setPage] = useState<IPage>({ activeIndex: 0 });
  const swiperRef = useRef<SwiperRef>(null);
  const aboutMeRef = useRef<any>(null);
  const welcomeRef = useRef<any>(null);
  const skillsRef = useRef<any>(null);
  const repositoriesRef = useRef<any>(null);
  const classDefault =
    "relative !flex flex-col !justify-start lg:!justify-center text-white spacing_content bg-tranparent h-screen";
  const [language, setLanguage] = useState<string>("pt");
  const [animation, setAnimation] = useState<boolean>(true);

  useEffect(() => {
    if (welcomeRef && page?.activeIndex === 0) {
      welcomeRef?.current?.handleStart();
    }
  }, []);

  useEffect(() => {
    animation
      ? document.querySelector("body").classList.add("!overflow-hidden")
      : document.querySelector("body").classList.remove("!overflow-hidden");
  }, [animation]);

  return (
    <>
      <Head>
        <title>Portfólio de Flávio Leonardo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AnimationContext.Provider value={{ animation, setAnimation }}>
          {animation ? (
            <Swiper
              effect={"creative"}
              direction={"vertical"}
              // navigation={true}
              slidesPerView={1}
              spaceBetween={100}
              mousewheel={true}
              speed={2000}
              pagination={{
                clickable: true,
              }}
              creativeEffect={{
                prev: {
                  translate: [0, "-100%", 0],
                },
                next: {
                  translate: [0, "100%", 0],
                },
              }}
              modules={[EffectCreative, Mousewheel, Pagination, Navigation]}
              className="bg-animation !h-screen"
              ref={swiperRef}
              onSlideNextTransitionStart={(e) => {
                if (welcomeRef && e?.activeIndex === 0) {
                  welcomeRef?.current?.handleStart();
                } else if (aboutMeRef && e?.activeIndex === 1) {
                  aboutMeRef?.current?.handleStart();
                } else if (skillsRef && e?.activeIndex === 2) {
                  skillsRef?.current?.handleStart();
                } else if (repositoriesRef && e?.activeIndex === 3) {
                  repositoriesRef?.current?.handleStart();
                }
              }}
              onSlidePrevTransitionStart={(e) => {
                if (welcomeRef && e?.activeIndex === 0) {
                  welcomeRef?.current?.handleEnd();
                } else if (aboutMeRef && e?.activeIndex === 1) {
                  aboutMeRef?.current?.handleEnd();
                } else if (skillsRef && e?.activeIndex === 2) {
                  skillsRef?.current?.handleEnd();
                } else if (repositoriesRef && e?.activeIndex === 3) {
                  repositoriesRef?.current?.handleEnd();
                }
              }}
            >
              <SwiperSlide className={`${classDefault} welcome !justify-start`}>
                <Welcome ref={welcomeRef} />
              </SwiperSlide>

              <SwiperSlide className={`${classDefault} aboutMe`}>
                <AboutMe ref={aboutMeRef} />
              </SwiperSlide>

              <SwiperSlide className={`${classDefault} skills`}>
                <Skills ref={skillsRef} />
              </SwiperSlide>

              <SwiperSlide className={`${classDefault} repositories`}>
                <Repositories ref={repositoriesRef} />
              </SwiperSlide>
            </Swiper>
          ) : (
            <div className="bg-animation">
              <div className={`${classDefault} welcome !justify-start`}>
                <Welcome ref={welcomeRef} />
              </div>
              <div className={`${classDefault} aboutMe !h-auto `}>
                <AboutMe ref={aboutMeRef} />
              </div>
              <div className={`${classDefault}  skills `}>
                <Skills ref={skillsRef} />
              </div>
              <div className={`${classDefault} repositories `}>
                <Repositories ref={repositoriesRef} />
              </div>
            </div>
          )}

          <OptionsFixed />
        </AnimationContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}
