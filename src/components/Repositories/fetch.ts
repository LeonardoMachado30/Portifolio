import axios from "axios";
import { orderByDate } from "./handle";
import { RepositoriesModel } from "@/models/Repositories";

export default async function fetchRepos(): Promise<
  RepositoriesModel[] | null
> {
  const getStorage = localStorage.getItem("Repositories");
  let dateObj = getStorage && JSON.parse(getStorage);

  if (dateObj !== null) return dateObj;

  const uri = "https://api.github.com/users/LeonardoMachado30/repos";
  const resp = await axios.get(uri);

  if (resp.status !== 200) return null;

  dateObj = await resp.data;

  const date = handleMapList(dateObj);

  const filter = (obj: any) => !obj.fork && obj.language !== null;
  const dateFilter = date.filter(filter);

  const dateOrder = orderByDate(dateFilter);
  localStorage.setItem("Repositories", JSON.stringify(dateOrder));

  return dateOrder;
}

function handleMapList(obj: any) {
  return obj?.map((element: any) => {
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
}
