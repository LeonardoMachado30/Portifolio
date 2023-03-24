import Image from "next/image";
import profile from "@/assets/profile.jpg";

export default function Hexagonal(): JSX.Element {
  return (
    <div className="flex">
      <div className="button">
        <div className="hex">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Image src={profile} alt="profile" />
    </div>
  );
}
