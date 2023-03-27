import React from "react";
import { useEffect, useRef, useState } from "react";

import Head from "next/head";
import {
  AboutMe,
  Skills,
  Repositories,
  Welcome,
  ContactMe,
  Setting,
} from "@/components/export";
import Image from "next/image";
import { LanguageContext } from "@/utils/Contexct";
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

export default function Home(): JSX.Element {
  const [page, setPage] = useState<number>(0);
  const [language, setLanguage] = useState<string>("pt");
  const swiperRef = useRef<SwiperRef>(null);
  const classDefault =
    "relative !flex flex-col items-center text-white spacing_content bg-animation";

  useEffect(() => { }, [language]);
  return (
    <>
      <Head>
        <title>Portfólio de Flávio Leonardo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Swiper
          effect={"creative"}
          direction={"vertical"}
          // navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          speed={500}
          pagination={{
            clickable: true,
          }}
          creativeEffect={{
            prev: {
              translate: [0, "100%", 0],
            },
            next: {
              translate: [0, "100%", 0],
            },
          }}
          modules={[EffectCreative, Mousewheel, Pagination]}
          className="bg-animation h-full "
          ref={swiperRef}
          onActiveIndexChange={(e) => {
            setPage(e?.activeIndex);
          }}
        >
          <SwiperSlide className={`${classDefault} welcome !justify-start`}>
            <Welcome page={page} />
          </SwiperSlide>

          <SwiperSlide className={`${classDefault} aboutMe`}>
            <AboutMe page={page} />
          </SwiperSlide>

          <SwiperSlide className={`${classDefault} skills`}>
            <Skills page={page} />
          </SwiperSlide>

          <SwiperSlide className={`${classDefault} repositories`}>
            <Repositories page={page} />
          </SwiperSlide>

          <ContactMe />

          <Setting />
        </Swiper>
      </LanguageContext.Provider>
    </>
  );
}
