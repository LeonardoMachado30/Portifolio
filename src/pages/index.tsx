"use client";
import React, { useRef, useState } from "react";
import Head from "next/head";

import AboutMe from "@components/AboutMe";
import Skills from "@components/Skills";
import Welcome from "@components/Welcome";
import OptionsFixed from "@components/OptionsFixed";
import Repositories from "@components/Repositories";
import AnimationComponent from "@/components/AnimationComponent";
import fetchRepos from "@/components/Repositories/fetch";
import { GetStaticProps } from "next";
import { AnimationContext, LanguageContext } from "@/utils/Context";
import { SwiperRef } from "swiper/react";

export default function Home({ data }): JSX.Element {
  const [animation, setAnimation] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("pt");
  const [positionSwaper, setPositionSwaper] = useState<number>(0);
  const swiperRef = useRef<SwiperRef>(null);

  const classActiveMenu = "text-sky-500 transition-all duration-1000";

  return (
    <>
      <Head>
        <title>Portifólio de Flávio Leonardo</title>
      </Head>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AnimationContext.Provider value={{ animation, setAnimation }}>
          <header className="fixed top-0 z-10 w-full">
            <nav className="bg-gray-800/50 backdrop-blur-md">
              <ul className="text-md mx-auto flex max-w-5xl items-center justify-around p-4 font-bold text-white">
                <li>
                  <button
                    className={positionSwaper === 0 ? classActiveMenu : ""}
                    onClick={() => swiperRef.current?.swiper.slideTo(0)}
                  >
                    Apresentação
                  </button>
                </li>
                <li>
                  <button
                    className={positionSwaper === 1 ? classActiveMenu : ""}
                    onClick={() => swiperRef.current?.swiper.slideTo(1)}
                  >
                    Sobre mim
                  </button>
                </li>
                <li>
                  <button
                    className={positionSwaper === 2 ? classActiveMenu : ""}
                    onClick={() => swiperRef.current?.swiper.slideTo(2)}
                  >
                    Habilidades
                  </button>
                </li>
                <li>
                  <button
                    className={positionSwaper === 3 ? classActiveMenu : ""}
                    onClick={() => swiperRef.current?.swiper.slideTo(3)}
                  >
                    Projetos
                  </button>
                </li>
              </ul>
            </nav>
          </header>
          <AnimationComponent
            swiperRef={swiperRef}
            onSlideChange={(index) => {
              setPositionSwaper(index);
              console.log("Slide atual:", index);
              // aqui você pode setar num state, enviar pra analytics, etc.
            }}
          >
            <Welcome />
            <AboutMe />
            <Skills />
            <Repositories data={data} />
          </AnimationComponent>

          <OptionsFixed />
        </AnimationContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await fetchRepos(); // your fetch function here
  return {
    props: {
      data,
    },
    // revalidate: 6 * 60 * 60 * 1000,
  };
};
