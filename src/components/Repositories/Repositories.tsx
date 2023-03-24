import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { icon_github, icon_redirect } from "@/assets/svg/index";
import moment from "moment";
import axios from "axios";
import { RepositoriesModel } from "@/models/Repositories";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination, Mousewheel } from "swiper";

export default function Repositories({ page }: any): JSX.Element {
  const [repositories, setRepositories] =
    useState<Array<RepositoriesModel> | null>();
  const swiperRef = useRef<any>();
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
    console.log(reposObject);
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
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (page === 3) {
      swiperRef?.current?.classList?.add("bounce-in-top");
    }
  }, [page]);

  return (
    <>
      {repositories ? (
        <Swiper
          effect={"cube"}
          direction={"vertical"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCube, Pagination, Mousewheel]}
          className="mySwiper flex max-h-96 max-w-sm items-center justify-center "
          style={{ background: "transparent" }}
          ref={swiperRef}
        >
          {repositories?.map((element, index) => {
            const created_at = moment(element?.created_at);
            const lastUpdate = formatDate(element);

            return (
              <SwiperSlide
                className="  bg-white bg-transparent"
                style={{ padding: 0 }}
                key={index}
              >
                <div
                  // href={`${element?.url}`}
                  className="relative flex h-full flex-col justify-between bg-white p-7 text-gray-600 shadow-md hover:shadow-lg"
                  style={{ minWidth: "300px" }}
                  // target="_blank"
                  title={element?.name}
                >
                  {element?.homepage && (
                    <a
                      href={element.homepage}
                      target="_blank"
                      title={"Ir para o site"}
                      type="button"
                      className="absolute right-20 bottom-8 flex w-10 justify-center rounded p-2 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    >
                      <Image src={icon_redirect} alt="Ir para site" />
                    </a>
                  )}

                  <a
                    href={element.url}
                    target="_blank"
                    title={"Ir para o repositorio"}
                    type="button"
                    className="absolute right-6 bottom-8 flex w-10 justify-center rounded p-2 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    <Image src={icon_github} alt="Github" />
                  </a>

                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-black">
                      {element?.name
                        .replace(/[-]/g, " ")
                        .replace(/_/g, " ")
                        .toLocaleUpperCase()}
                    </h2>
                    <p className="mb-9 text-black">
                      Tecnologia: {element?.language ?? "Não listada"}
                    </p>

                    <p>
                      {element?.description !== null
                        ? element?.description
                        : "(Descrição em desenvolvimento)"}
                    </p>
                  </div>
                  <div className="w-full text-sm">
                    <p>Ultima atualização: {lastUpdate}</p>

                    <p>Criado: {created_at.format("DD/MM/YYYY")}</p>
                  </div>
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
