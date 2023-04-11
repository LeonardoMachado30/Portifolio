import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { icon_github, icon_redirect } from "@/assets/svg/index";
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

export type { RepositoriesModel };

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
  //? ICONS
  icon_github,
  icon_redirect,
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
