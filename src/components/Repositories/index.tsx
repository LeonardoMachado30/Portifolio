import React from "react";
import {
  //? REACT
  useRef,
  useState,
  Image,
  //? OTHERS
  moment,
  RepositoriesModel,
  //? SWIPER
  Swiper,
  SwiperSlide,
  Pagination,
  EffectCards,
  Navigation,
  buttonAnimation,
  //? ICONS
  icons,
  useRessource,
  formatDate,
} from "./export";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

function Repositories({ data }) {
  const titleRef = useRef<any>(null);
  const swiperRef = useRef<any>(null);
  const localizer = useRessource("Repositories");
  const [repositories, setRepositories] = useState<
    RepositoriesModel[] | null
  >();
  console.log(data);
  return (
    <>
      {/* <h2
        className="mb-4 flex items-center text-center text-4xl font-semibold lg:mb-12"
        ref={titleRef}
      >
        {localizer?.title}
      </h2> */}

      {data ? (
        <Swiper
          pagination={{
            clickable: true,
          }}
          grabCursor={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="b-0 !h-[80vh] !w-full !max-w-[92vw]"
          ref={swiperRef}
        >
          {data?.map((element, index) => {
            const created_at = moment(element?.created_at);
            const lastUpdate = formatDate(element);
            const name = element?.name
              .replace(/[-]/g, " ")
              .replace(/_/g, " ")
              .toLocaleUpperCase();
            return (
              <SwiperSlide
                className="card-height !h-[100vh] !bg-transparent !p-10"
                key={index}
              >
                <div className="text-end text-white">
                  {created_at.format("YYYY")}
                </div>
                <h2 className="text-center text-white">{name}</h2>
                <iframe
                  src={element.homepage}
                  title={element.name}
                  className="h-full w-full bg-white"
                ></iframe>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div>Error</div>
      )}
    </>
  );
}

export default Repositories;
