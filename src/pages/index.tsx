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

export default function Home({ data }): JSX.Element {
  const [animation, setAnimation] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("pt");

  return (
    <>
      <Head>
        <title>Portifólio de Flávio Leonardo</title>
      </Head>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AnimationContext.Provider value={{ animation, setAnimation }}>
          <AnimationComponent>
            <Welcome />
            <AboutMe />
            <Skills  />
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
    revalidate: 6 * 60 * 60 * 1000,
  };
};
