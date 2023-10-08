"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import eth_bg from "./ethereum_bg.svg";
import { Modal } from "../receiver_address_input_modal";
import { useState } from "react";
export function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const openModal = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  const isHomePage = pathname === "/";

  const getLinkClass = (linkPath: string) => {
    const baseClass = "uppercase text-base";
    let isActive = false;

    if (linkPath === "/") {
      isActive = isHomePage;
    } else {
      isActive = pathname.startsWith(linkPath);
    }

    const commonClasses = isActive
      ? isHomePage
        ? " text-white"
        : " text-grey"
      : isHomePage
      ? " text-light-grey hover:text-white"
      : " text-slate-600 hover:text-grey";

    return `${baseClass} ${commonClasses}`;
  };

  const navSectionClass = `py-10 max-w-5xl px-2 mx-auto${
    isHomePage ? " h-[750px]" : ""
  }`;

  const backgroundStyle = {
    backgroundImage: isHomePage ? `url(${eth_bg.src})` : "",
  };

  return (
    <>
      <section className={navSectionClass}>
        <div
          className={`flex justify-between bg-contain bg-clip-content px-2 bg-no-repeat bg-center h-full`}
          style={backgroundStyle}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <Link href={"/"} className={getLinkClass("/")}>
                Home
              </Link>
              <Link href={"/blog"} className={getLinkClass("/blog")}>
                Blog
              </Link>
            </div>
            <div
              onClick={openModal}
              className={`z-10 cursor-pointer bg-light-grey text-white text-lg py-1.5 px-2.5 border-[3px] border-black flex gap-1 ${
                pathname !== "/" ? " text-grey" : ""
              }`}>
              <span>
                <Image src={eth_bg} width={15} height={15} alt="" />
              </span>
              <span className={!isHomePage ? "text-grey" : ""}>
                Mix Ethereum
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-center items">
              <span className="uppercase text-xl leading-[1]">
                crypto-blender.com
              </span>
              <span className="uppercase text-base leading-[1] font-light">
                anonymize your ethereum
              </span>
            </div>

            <div className="text-3xl flex flex-col justify-center items-center">
              <span className="uppercase leading-[1]">ethereum</span>
              <span className="uppercase leading-[1]">mixer</span>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={showModal} onClose={onClose} />
    </>
  );
}
