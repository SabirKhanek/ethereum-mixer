import { useNavigate, useSearchParams } from "react-router-dom";
import { isValidBEP20Address as isValidETH20Address } from "../../shared/validators/input";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import mixer_times from "../../shared/constants/mixer_times";
import { useMixerDetails } from "../../shared/contexts";

export function ConfirmMixer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { MixerDetails, setMixerDetails } = useMixerDetails();
  const { delay, reciever_address } = MixerDetails;
  const [reciever_address_from_route, delay_from_route] = [
    searchParams.get("reciever_address"),
    searchParams.get("delay"),
  ];
  const navigate = useNavigate();

  const [mixerDetailObj, setMixerDetailObj] = useState({
    reciever_address: "",
    delay: -1,
  });

  useEffect(() => {
    const isReceiverValid = isValidETH20Address(reciever_address);
    const isReceiverFromRouteValid =
      reciever_address_from_route &&
      isValidETH20Address(reciever_address_from_route);

    if (!isReceiverValid && !isReceiverFromRouteValid) {
      toast("Invalid ETH20 Address");
      navigate({ pathname: "/" });
    } else {
      const reciever_address_to_use = isReceiverValid
        ? reciever_address
        : (reciever_address_from_route as string);
      const delay_id_to_use = delay
        ? delay
        : Number.parseInt(delay_from_route ? delay_from_route : "-1");

      searchParams.set("reciever_address", reciever_address_to_use);
      searchParams.set("delay", delay_id_to_use.toString());
      setSearchParams(searchParams);

      setMixerDetailObj({
        reciever_address: reciever_address_to_use,
        delay: delay_id_to_use,
      });

      setMixerDetails({
        reciever_address: reciever_address_to_use,
        delay: delay_id_to_use,
      });
    }
  }, []);

  return (
    <>
      <div className="bg-[#E6E6E6] w-screen h-screen flex justify-center items-center min-h-screen overflow-auto">
        <div className="max-w-md p-4 grow">
          <h1 className="text-3xl mb-10 text-center">crypto-blender.xyz</h1>
          <h2 className="text-2xl mb-2">Confirm details of transaction</h2>
          <div className="mb-2">
            <label className="text-light-grey text-lg mb-1">Send</label>
            <p className="text-2xl ">FROM 0.25 TO 25 ETH / WETH</p>
          </div>
          <div className="mb-2">
            <label className="text-light-grey text-lg mb-1">
              RECIEVE MIXED ETH / WETH IN
            </label>
            <p className="text-xs sm:text-base font-epilogue font-light text-black">
              {mixerDetailObj.reciever_address}
            </p>
          </div>
          <div className="">
            <label className="text-light-grey text-lg mb-1">
              estimated arrival
            </label>
            <p className="text-base font-epilogue font-light text-black uppercase">
              {delay && delay !== -1
                ? mixer_times.find((val) => val.id === delay.toString())?.value
                : "No Delay"}
            </p>
          </div>

          <div className="my-5 flex flex-wrap xs:flex-nowrap gap-2">
            <button
              className="basis-1/2 shrink-0 grow py-3 flex justify-center items-center gap-2 text-xl bg-[#F4C172] border border-grey"
              onClick={() => navigate({ pathname: "/await_mixer" })}>
              <span>Confirm & Continue</span>
              <svg
                className="hover:translate-x-2 transition-all duration-75"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="23" height="23" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1">
                    <use
                      xlinkHref="#image0_141_113"
                      transform="scale(0.0078125)"
                    />
                  </pattern>
                  <image
                    id="image0_141_113"
                    width="128"
                    height="128"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </button>

            <div
              className=" basis-1/2 flex flex-shrink-0 grow justify-center items-center text-xl gap-2 bg-white py-3 border border-grey relative cursor-pointer"
              onClick={() => navigate("/")}>
              <span>back</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
