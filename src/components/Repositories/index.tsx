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

function Repositories({data}) {
    const titleRef = useRef<any>(null);
    const swiperRef = useRef<any>(null);
    const localizer = useRessource("Repositories");
    const [tab, setTab] = useState<number>(0);
    const [tabName, setTabName] = useState<string>("DVX");

    return (
        <>
            {data ? (
                <div className="!bg-white px-4 py-2 rounded-lg h-full w-full m-16 max-w-7xl">
                    <div className="flex align-center relative mb-3">
                        <ul className="flex gap-2 p-2">
                            <li className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></li>
                            <li className="w-3 h-3 rounded-full bg-blue-500 cursor-pointer"></li>
                            <li className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></li>
                        </ul>

                        <h1 className="absolute left-1/2 top-0 transform -translate-x-1/2 text-black text-center text-base
                        border-[1px] border-gray-500 bg-gray-100 w-full max-w-2xl rounded-full">
                            {tabName.replace(/[_-]/g, " ")}
                        </h1>
                    </div>

                    <div className="overflow-x-auto max-w-full">
                        <ul className="flex w-max">
                            {data?.map((element, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setTab(index);
                                        setTabName(element.name);
                                        return swiperRef.current?.swiper?.slideTo(index);
                                    }}
                                    className={`flex text-gray-600 border-gray-300 border-[1px] px-3 py-1 rounded-tl-md 
        rounded-tr-md cursor-pointer hover:bg-blue-100 transition-all duration-600 text-sm
        ${tab === index ? "bg-blue-200 !text-gray-800" : ""}`}
                                >
                                    <p className="truncate overflow-hidden whitespace-nowrap max-w-[4rem] sm:max-w-[3rem] md:max-w-[5rem] lg:max-w-[6rem]">
                                        {element.name.replace(/[_-]/g, " ")}
                                    </p>
                                    <p className="text-sm ml-2">x</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Swiper
                        grabCursor={true}
                        modules={[Pagination, Navigation]}
                        className="!w-full"
                        style={{height: "calc(100% - 40px)"}}
                        ref={swiperRef}
                    >
                        {data?.map((element, index) =>
                            <SwiperSlide
                                className="card-height !bg-transparent !p-0"
                                key={index}
                            >
                                {/*<div className="text-end text-black ">*/}
                                {/*    {created_at.format("YYYY")}*/}
                                {/*</div>*/}
                                {/*<h2 className="text-center text-black">{name}</h2>*/}
                                <iframe
                                    src={element.homepage}
                                    title={element.name}
                                    className=" w-full rounded-sm"
                                    style={{height: "calc(100% - 30px)"}}
                                    loading={"lazy"}
                                ></iframe>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            ) : (
                <div>Error</div>
            )}
        </>
    );
}

export default Repositories;
