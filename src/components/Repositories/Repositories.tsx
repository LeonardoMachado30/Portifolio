import { animationSlider } from "@/utils/animations/animationSlider";
import {
  //? REACT
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  Image,

  //? OTHERS
  moment,
  formatDate,
  fetchRepos,
  RepositoriesModel,
  //? SWIPER
  Swiper,
  SwiperSlide,
  Pagination,
  EffectCards,
  Navigation,
  buttonAnimation,
  //? ICONS
  imgs,
} from "./index";
import useRessource from "@/utils/ressource";

import ressource from "@/utils/ressource";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

interface ChildHandle {
  handleStart: () => void;
  handleEnd: () => void;
}

const Repositories = forwardRef<ChildHandle, any>((props, ref) => {
  const titleRef = useRef<any>(null);
  const swiperRef = useRef<any>(null);
  const [repositories, setRepositories] = useState<
    RepositoriesModel[] | null
  >();
  const localizer = useRessource("Repositories");
  const icon_github = Object.values(imgs.icons.icon_github)[0];
  const icon_redirect = Object.values(imgs.icons.icon_redirect)[0];
  console.log(icon_redirect);
  useEffect(() => {
    async function handleFetch() {
      const res = await fetchRepos();
      if (res !== null) setRepositories(res);
    }
    handleFetch();
  }, []);

  const handleStart = () => {
    const TimelineName = animationSlider(
      titleRef?.current,
      null,
      {
        from: "100%",
        to: 0,
      },
      0.4
    );
    animationSlider(
      swiperRef?.current,
      TimelineName,
      {
        from: "100%",
        to: 0,
      },
      0
    );
  };

  const handleEnd = () => {
    const TimelineName = animationSlider(
      titleRef?.current,
      null,
      { from: 0, to: "-100%" },
      0.4
    );
    animationSlider(swiperRef?.current, TimelineName, {
      from: 0,
      to: "-100%",
    });
  };
  useImperativeHandle(ref, () => ({
    handleStart,
    handleEnd,
  }));

  return (
    <>
      <h2
        className="mb-4 w-full text-center text-5xl font-semibold lg:mb-12"
        ref={titleRef}
      >
        {localizer?.title}
      </h2>

      {repositories ? (
        <Swiper
          effect={"cards"}
          pagination={{
            clickable: true,
          }}
          grabCursor={true}
          navigation={true}
          modules={[EffectCards, Pagination, Navigation]}
          className="swiper !h-4/5 !w-full !max-w-3xl !px-20 !py-12 !pt-4 md:!h-auto md:!px-48 md:!py-8"
          ref={swiperRef}
        >
          {repositories?.map((element, index) => {
            const created_at = moment(element?.created_at);
            const lastUpdate = formatDate(element);
            const name = element?.name
              .replace(/[-]/g, " ")
              .replace(/_/g, " ")
              .toLocaleUpperCase();

            return (
              <SwiperSlide
                className=" card-height !flex flex-col !justify-between !text-black !shadow"
                key={index}
              >
                <h2 className="mb-2 w-full text-center font-bold">{name}</h2>
                <p className="mb-9 w-full text-center">
                  Tecnologia: {element?.language ?? "Não listada"}
                </p>

                <p className="w-full text-center">
                  {element?.description !== null
                    ? element?.description
                    : "(Descrição em desenvolvimento)"}
                </p>

                <div className="flex w-full items-center justify-center gap-4">
                  {element?.homepage && (
                    <a
                      href={element.homepage}
                      target="_blank"
                      title={"Ir para o site"}
                      type="button"
                      className="flex w-10 justify-center rounded p-2 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.4),0_4px_18px_0_rgba(59,113,202,0.4)]"
                      onMouseEnter={(e) => buttonAnimation(e.target, 1.1)}
                      onMouseLeave={(e) => buttonAnimation(e.target, 1)}
                    >
                      <Image
                        src={icon_redirect}
                        alt="Ir para site"
                        width={30}
                        height={30}
                      />
                    </a>
                  )}

                  <a
                    href={element.url}
                    target="_blank"
                    title={"Ir para o repositorio"}
                    type="button"
                    className="flex w-10 justify-center rounded p-2 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.4),0_4px_18px_0_rgba(59,113,202,0.4)]"
                    onMouseEnter={(e) => buttonAnimation(e.target, 1.1)}
                    onMouseLeave={(e) => buttonAnimation(e.target, 1)}
                  >
                    <Image
                      src={icon_github}
                      alt="ir para Github"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>

                <div className="w-full  text-gray-500">
                  {/* <p className="text-sm">
                    {localizer?.lastUpdated}: {lastUpdate}
                  </p> */}

                  <p className="text-sm">
                    {localizer?.create}: {created_at.format("DD/MM/YYYY")}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div>Erro</div>
      )}
    </>
  );
});

export default Repositories;
