import { Link } from "react-router-dom";
import eth_bg from "./ethereum_bg.svg";
import { Modal } from "../../../../components/reciever_address_input_modal";
import { useState } from "react";
export function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <section className="py-10 h-[750px] max-w-5xl px-2 mx-auto">
        <div
          style={{ backgroundImage: `url(${eth_bg})` }}
          className="flex justify-between bg-contain bg-clip-content px-2 bg-no-repeat bg-center h-full">
          <div className="flex flex-col gap-1">
            <div>
              <Link to={"/"} className="uppercase text-base">
                Home
              </Link>
            </div>
            <div
              onClick={openModal}
              className="z-10 cursor-pointer bg-light-grey text-white text-lg py-1.5 px-2.5 border-[3px] border-black flex gap-1">
              <span>
                <img src={eth_bg} width={15} height={15} alt="" />
              </span>
              <span>Mix Ethereum</span>
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
