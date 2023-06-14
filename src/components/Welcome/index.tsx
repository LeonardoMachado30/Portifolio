import useRessource from "@/utils/ressource";
import Image from "next/image";
import profile from "@/assets/perfil_1.jpg";
export default function Welcome() {
  const localizer = useRessource("Welcome");

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Image
          src={profile ? profile : "profle"}
          alt={localizer?.altProfileImage}
          width={0}
          height={0}
          className="mb-20 mt-20 border-sky-600 text-center shadow-lg"
          style={{
            borderRadius: "100%",
            maxWidth: "320px",
            width: "100%",
            height: "340px",
          }}
        />
      </div>

      <div className="flex flex-col gap-2 px-6 text-center md:px-0">
        <p className="text-3xl font-bold uppercase md:text-5xl">
          {localizer?.welcome}
        </p>
      </div>
    </>
  );
}
