import { useEffect, useState } from "react";
import { Respositories } from "@/models/Respositories";
import moment from "moment";

export default function Repositories(): JSX.Element {
  const [repositories, setRepositories] = useState<Array<Respositories>>();
  const [error, setError] = useState<boolean>(false);

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
    const getStorage = localStorage.getItem("Respositories");
    let respositories = getStorage && JSON.parse(getStorage);

    if (!respositories) {
      const resp = await fetch("/api/Repositories");
      respositories = await resp.json();
      console.log(resp);
      if (resp.status === 200) {
        localStorage.setItem("Respositories", JSON.stringify(respositories));
      } else {
        setError(true);
      }
    }

    respositories = respositories?.map((element: any) => {
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

    const dataSort = orderByDate(respositories);
    setRepositories(dataSort);
    return;
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!error ? (
        <div className="card-list flex w-4/5 gap-4 overflow-x-auto overflow-y-hidden p-4">
          {repositories?.map((element, index) => {
            const created_at = moment(element.created_at);
            const lastUpdate = formatDate(element);

            return (
              <a
                key={index}
                href={`${element.url}`}
                className="flex w-72 flex-col justify-between bg-white p-7 text-gray-600 shadow-md hover:shadow-lg"
                style={{ minWidth: "300px" }}
                target="_blank"
                title={element.name}
              >
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-black">
                    {element.name}
                  </h2>
                  <p className="mb-9">Tecnologia: {element.language}</p>

                  <p>
                    {element.description !== null
                      ? element.description
                      : "(Descrição em desenvolvimento)"}
                  </p>
                </div>
                <div className="text-sm">
                  <p>Ultima atualização: {lastUpdate}</p>

                  <p>Criado: {created_at.format("DD/MM/YYYY")}</p>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div>Erro</div>
      )}
    </>
  );
}
