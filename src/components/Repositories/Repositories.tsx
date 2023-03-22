import { useEffect, useRef, useState } from "react";
import moment from "moment";
import axios from "axios";
import Image from "next/image";
import { RepositoriesModel } from "@/models/Repositories";
import { info } from "@/assets/svg/index";
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
    const dateLastUpdate = moment(date.updated_at);
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
        const dateLastUpdate = moment(objeto.updated_at);
        return dateCurrent.diff(dateLastUpdate, "days");
      })
      .sort((a: any, b: any) => {
        return a - b;
      })
      .map((data: any) => {
        return date.find((obj: any) => {
          const dateLastUpdate = moment(obj.updated_at);
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
      };
    });

    const reposNewObjectOrder = orderByDate(reposNewObjectSelect);
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
            const created_at = moment(element.created_at);
            const lastUpdate = formatDate(element);

            return (
              <SwiperSlide
                className="  bg-white bg-transparent"
                style={{ padding: 0 }}
                key={index}
              >
                <a
                  href={`${element.url}`}
                  className="flex h-full flex-col justify-between bg-white p-7 text-gray-600 shadow-md hover:shadow-lg"
                  style={{ minWidth: "300px" }}
                  target="_blank"
                  title={element.name}
                >
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-black">
                      {element.name
                        .replace(/[-]/g, " ")
                        .replace(/_/g, " ")
                        .toLocaleUpperCase()}
                    </h2>
                    <p className="mb-9 text-black">
                      Tecnologia: {element.language ?? "Não listada"}
                    </p>

                    <p>
                      {element.description !== null
                        ? element.description
                        : "(Descrição em desenvolvimento)"}
                    </p>
                  </div>
                  <div className="text-sm">
                    <div className="flex gap-2">
                      fork: {element.fork ? "SIM" : "NÂO"}{" "}
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="info h-5 w-5 hover:fill-cyan-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <p className="tootip absolute rounded bg-zinc-600 p-1 text-xs text-white ">
                          “fork” é simplesmente o mesmo projeto no seu
                          namespace, permitindo que você faça alterações
                          publicamente em um projeto como uma forma mais aberta
                          de contribuir
                        </p>
                      </div>
                    </div>
                    <p>Ultima atualização: {lastUpdate}</p>

                    <p>Criado: {created_at.format("DD/MM/YYYY")}</p>
                  </div>
                </a>
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
