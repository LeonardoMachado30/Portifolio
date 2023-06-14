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

export default function Home({ data }): JSX.Element {
  const aboutMeRef = useRef<any>(null);
  const welcomeRef = useRef<any>(null);
  const skillsRef = useRef<any>(null);
  const repositoriesRef = useRef<any>(null);

  return (
    <>
      <Head>
        <title>Portifólio de Flávio Leonardo</title>
      </Head>

      <AnimationComponent>
        <Welcome ref={welcomeRef} />
        <AboutMe ref={aboutMeRef} />
        <Skills ref={skillsRef} />
        <Repositories data={data} />
      </AnimationComponent>

      <OptionsFixed />
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
