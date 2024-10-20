import useRessource from "@/utils/ressource";
export default function AboutMe() {
  const localizer = useRessource("AboutMe");

  return (
    <>
      <h2 className="mb-12 text-4xl font-semibold">{localizer?.title}</h2>
      <div className="scroll-custom z-50 mx-auto !mb-20 w-full max-w-4xl flex-col items-center justify-center overflow-auto bg-scroll text-center">
        <p
          className={`w-full px-4 text-justify text-xs  md:text-sm`}
          style={{ lineHeight: "20px" }}
        >
          {localizer?.p1}
          <br />
          <br />
          {localizer?.p2}
          <br />
          <br />
          {localizer?.p3}
        </p>
      </div>
    </>
  );
}
