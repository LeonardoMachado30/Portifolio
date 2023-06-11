import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { front, back, icons } from "@/assets/svg/index";
import fetchRepos from "./fetch";
import moment from "moment";
import gsap from "gsap";
import { RepositoriesModel } from "@/models/Repositories";
import { formatDate } from "./handle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, EffectCards, Navigation, EffectCreative } from "swiper";
import { buttonAnimation } from "@/utils/animations/buttonAnimation";
import { animationSlider } from "@utils/animations/animationSlider";
import ressource from "@utils/ressource";
import useRessource from "@utils/ressource";

export type { RepositoriesModel };

export {
  animationSlider,
  ressource,
  useRessource,
};

export {
  //? REACT
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  Image,
};

export {
  //? SWIPER
  Swiper,
  SwiperSlide,
  Pagination,
  EffectCards,
  Navigation,
  EffectCreative,
};

export {
  //? OTHERS
  moment,
  formatDate,
  fetchRepos,
};

export {
  //? ANIMATIONS
  gsap,
  buttonAnimation,
};

export {
  //? ICONS
  front,
  back,
  icons,
};
