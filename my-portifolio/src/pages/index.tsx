import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Header,
  Content,
  AboutMe,
  Skills,
  Repositories,
  BlindsEffect,
} from "@/components/export";

// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Parallax, Navigation } from "swiper";
import React from "react";

interface Scroll {
  focus?: boolean;
  up?: boolean;
  down?: boolean;
  page: number;
  current?: number;
}

export default function Home(): JSX.Element {
  const [page, setPage] = useState<number | undefined>(0);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const swipeNext = document.querySelector(".swiper-button-next");
    const swipePrev = document.querySelector(".swiper-button-prev");
    swipeNext?.addEventListener("click", () => {
      setPage(swiperRef?.current?.swiper?.activeIndex);
    });

    swipePrev?.addEventListener("click", () => {
      setPage(swiperRef?.current?.swiper?.activeIndex);
    });

    () => {};
  }, [page]);

  return (
    <>
      <Head>
        <title>Portifolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="overflow-hidden">
        <Swiper
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Parallax, Pagination, Navigation]}
          className="mySwiper h-full overflow-hidden"
          ref={swiperRef}
        >
          <div
            slot="container-start"
            className="parallax-bg"
            data-swiper-parallax="-23%"
          ></div>
          <SwiperSlide style={{ paddingTop: "0" }} className="p-1 sm:p-12">
            <Content
              className={`bg-welcome `}
              title={`BEM VINDO AO MEU PORTIFOLIO`}
            >
              <BlindsEffect />
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content className={`bg-content-1 aboutMe`} title={`Sobre mim`}>
              <AboutMe page={page} />
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content
              className={`bg-content-2 skills jello-horizontal gap-16`}
              title={`Habilidades`}
            >
              <Skills />
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content className={`bg-content-4 repositories`} title={`Projetos`}>
              <Repositories />
            </Content>
          </SwiperSlide>
        </Swiper>
      </main>
    </>
  );
}
