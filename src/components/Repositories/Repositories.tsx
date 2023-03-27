import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { icon_github, icon_redirect } from "@/assets/svg/index";
import moment from "moment";
import axios from "axios";
import gsap from "gsap";
import { RepositoriesModel } from "@/models/Repositories";
import { entryAnimation } from "@/utils/animations"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { Pagination, EffectCards, Navigation, EffectCreative } from "swiper";

export default function Repositories({ page }: any): JSX.Element {
  const [repositories, setRepositories] =
    useState<Array<RepositoriesModel> | null>();
  const swiperRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  function formatDate(date: any) {
    const dateCurrent = moment();
    const dateLastUpdate = moment(date?.updated_at);
    const year: number = dateCurrent.diff(dateLastUpdate, "years");
    const mouth: number = dateCurrent.diff(dateLastUpdate, "months") % 12;
    const day: number = dateCurrent.diff(dateLastUpdate, "days");
    const format: string = year > 1 || day > 1 ? `s` : "";
    const formatMouth: string = mouth > 1 ? `es` : "";
    let yearfull: string = "";

    if (year > 0) {
      yearfull = `${year} ano${format} `;
    }
    if (mouth > 0 && mouth < 12) {
      yearfull = yearfull + `${mouth} mes${formatMouth} `;
    }
    if (day > 0 && day < 32) {
      yearfull = yearfull + `${day} dia${format}`;
    }

    return yearfull;
  }

  function orderByDate(date: any) {
    const dateCurrent = moment();
    return date
      .map((objeto: any) => {
        const dateLastUpdate = moment(objeto?.updated_at);
        return dateCurrent.diff(dateLastUpdate, "days");
      })
      .sort((a: any, b: any) => {
        return a - b;
      })
      .map((data: any) => {
        return date.find((obj: any) => {
          const dateLastUpdate = moment(obj?.updated_at);
          return data === dateCurrent.diff(dateLastUpdate, "days");
        });
      });
  }

  async function fetchData() {
    const getStorage = localStorage.getItem("Repositories");
    let reposObject = getStorage && JSON.parse(getStorage);

    if (reposObject !== null) {
      setRepositories(reposObject);
      return;
    }

    const resp = await axios.get(
      `https://api.github.com/users/LeonardoMachado30/repos`
    );

    reposObject = await resp.data;

    if (resp.status !== 200) {
      setRepositories(null);
      return;
    }

    const reposNewObjectSelect = reposObject?.map((element: any) => {
      return {
        name: element.name,
        created_at: element.created_at,
        updated_at: element.updated_at,
        language: element.language,
        url: element.html_url,
        fork: element.fork,
        description: element.description,
        homepage: element.homepage,
      };
    });

    const reposNewObjectFilter = reposNewObjectSelect.filter(
      (obj: any) => !obj.fork && obj.language !== null
    );

    const reposNewObjectOrder = orderByDate(reposNewObjectFilter);
    localStorage.setItem("Repositories", JSON.stringify(reposNewObjectOrder));
    setRepositories(reposNewObjectOrder);
    return;
  }

  function buttonAnimation(element: any, scale: number) {

    const to = {
      scale: scale,
      duration: 0.2,
      ease: "ease-in-out"
    }

    gsap.to(element, to);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (page === 3 && titleRef) {
      entryAnimation(titleRef?.current)
      entryAnimation(swiperRef?.current)
    }
  }, [page]);

  return (
    <>
      <h2
        className="mb-12 w-full text-center text-5xl font-semibold"
        ref={titleRef}
      >
        Projetos
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
          className="swiper !max-w-3xl !w-full !px-16 md:!px-48 !py-8 !md:mt-0 !mt-4"
          ref={swiperRef}
        >
          {repositories?.map((element, index) => {
            const created_at = moment(element?.created_at);
            const lastUpdate = formatDate(element);
            const name = element?.name
              .replace(/[-]/g, " ")
              .replace(/_/g, " ")
              .toLocaleUpperCase()

            return (
              <SwiperSlide
                className=" !flex flex-col !justify-between !text-black !shadow"
                key={index}
              >
                {/* <div> */}
                <h2 className="mb-2 font-bold w-full text-center">
                  {name}
                </h2>
                <p className="mb-9 w-full text-center">
                  Tecnologia: {element?.language ?? "Não listada"}
                </p>

                <p className="w-full text-center">
                  {element?.description !== null
                    ? element?.description
                    : "(Descrição em desenvolvimento)"}
                </p>
                {/* </div> */}

                <div className="flex gap-4 justify-center items-center w-full">
                  {element?.homepage && (
                    <a
                      href={element.homepage}
                      target="_blank"
                      title={"Ir para o site"}
                      type="button"
                      className="flex w-10 justify-center rounded p-2 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.4),0_4px_18px_0_rgba(59,113,202,0.4)]"
                      onMouseEnter={(e) => buttonAnimation(e.target, 1.1)}
                      onMouseLeave={(e) => buttonAnimation(e.target, 1)}>
                      <Image src={icon_redirect} alt="Ir para site" />
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
                    <Image src={icon_github} alt="Github" />
                  </a>
                </div>

                <div className="w-full  text-gray-500">
                  <p className="text-sm">Ultima atualização: {lastUpdate}</p>

                  <p className="text-sm">Criado: {created_at.format("DD/MM/YYYY")}</p>
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
}
