/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createSearchParams } from "../shared/utils/createSearchParams";
import { useRouter } from "next/navigation";
import useQueryParams from "../shared/hooks/useQueryParams";
import { isValidBEP20Address as isValidETH20Address } from "../shared/validators/input";
import { toast } from "react-toastify";
import Image from "next/image";
import { useEffect, useState } from "react";
import mixer_times from "../shared/constants/mixer_times";
import copy from "./assets/copy.svg";
import loading from "./assets/loading.svg";
import { useMixerDetails } from "../shared/contexts";
import { notify_mixer, register_mixer_request } from "../services";
import QRCode from "react-qr-code";
import { STATUS } from "../shared/constants/status_codes";

export default function AwaitMixer() {
  const { queryParams, setQueryParams } = useQueryParams<{
    receiver_address: string;
    delay: string;
  }>();
  const { delay, receiver_address } = useMixerDetails().MixerDetails;
  const [receiver_address_from_route, delay_from_route] = [
    queryParams.get("receiver_address"),
    queryParams.get("delay"),
  ];

  const router = useRouter();
  const [toSend, setToSend] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [mixerDetailObj, setMixerDetailObj] = useState({
    receiver_address: "",
    delay: -1,
  });

  useEffect(() => {
    console.log(receiver_address);
    console.log({
      receiver_address_from_route,
      delay_from_route,
    });
    // Check if both values from context and route are not present or not valid
    const isReceiverValid = isValidETH20Address(receiver_address);
    const isReceiverFromRouteValid =
      receiver_address_from_route &&
      isValidETH20Address(receiver_address_from_route);

    if (!isReceiverValid && !isReceiverFromRouteValid) {
      toast("Invalid ETH20 Address");
      router.push("/");
    } else if (!isReceiverValid && isReceiverFromRouteValid) {
      toast("Confirm Mixer Details");
      const path = `confirm_mixer${createSearchParams({
        receiver_address: receiver_address_from_route,
        delay: delay_from_route || "-1",
      })}`;
      router.push(path);
    } else {
      const receiver_address_to_use = receiver_address;
      const delay_id_to_use = delay;

      setQueryParams({
        receiver_address: receiver_address_to_use,
        delay: delay_id_to_use.toString(),
      });
      setMixerDetailObj({
        receiver_address: receiver_address_to_use,
        delay: delay_id_to_use,
      });

      setIsLoading(true);
      register_mixer_request(
        receiver_address_to_use,
        delay_id_to_use.toString()
      )
        .then((res) => {
          setToSend(res.data?.data?.deposit_wallet);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something went wrong. Please try again");
          setIsLoading(false);
        });
    }
  }, []);

  const sendNotifyMixerRequest = async () => {
    if (!isLoading) {
      try {
        const res = await notify_mixer(mixerDetailObj.receiver_address);
        if (res.status === STATUS.OK) {
          setIsLoading(false);
          toast.success(
            "Deposit and mixer details have been received, please wait for the ETH arrival in " +
              mixerDetailObj.receiver_address
          );
          router.push("/");
        } else if (res.status === STATUS.BAD_REQUEST) {
          toast.error(res.data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen h-full bg-[#E6E6E6] overflow-x-hidden overflow-auto">
      <h1 className="text-xl py-10 bg-[#E6E6E6] text-center">
        crypto-blender.com
      </h1>
      <div className="bg-[#E6E6E6] p-3 w-screen overflow-y-auto flex justify-center content-center">
        <div className="max-w-3xl w-full p-1 bg-[#E6E6E6] ">
          <h1 className="text-3xl mb-10 text-center">send payment</h1>

          <div className="mb-2 gap-y-2 flex justify-between items-center flex-wrap">
            <div className="grow">
              <label className="text-light-grey text-lg mb-1">To</label>
              <p className="text-xs sm:text-base font-epilogue font-light text-black">
                {isLoading ? (
                  <span>
                    Loading...{" "}
                    <Image
                      className="w-5 animate-spin inline"
                      src={loading}
                      alt=""
                    />
                  </span>
                ) : (
                  <span>
                    {toSend}
                    <Image
                      onClick={async () => {
                        navigator.clipboard.writeText(toSend);
                        toast(`Copied '${toSend}' to clipboard`);
                      }}
                      className="inline ml-1 w-5 cursor-pointer"
                      src={copy}
                      alt=""
                    />
                  </span>
                )}
              </p>
            </div>
            {toSend && (
              <QRCode
                size={196}
                className="mx-auto grow-0 p-3 bg-white rounded-md"
                value={toSend}></QRCode>
            )}
          </div>

          <div className="mb-2">
            <label className="text-light-grey text-lg mb-1">Amount</label>
            <p className="text-2xl ">FROM 0.25 TO 450 ETH / WETH</p>
          </div>

          <div className="my-5 flex gap-y-4 flex-wrap xs:flex-nowrap justify-between items-center gap-2">
            <div className="grow flex justify-center">
              <button
                className="flex px-4 py-4 justify-center items-center gap-2 text-2xl bg-[#F4C172] border border-grey"
                onClick={() => router.push("/await_mixer")}>
                <span>Awaiting Payment</span>
                {!isLoading && (
                  <Image className="w-6 animate-spin" src={loading} alt="" />
                )}
              </button>
            </div>

            <button
              disabled={isLoading}
              className="text-center text-xl mx-auto grow-0 gap-2 px-7 py-2 border border-grey relative cursor-pointer bg-light-grey text-black rounded-xl disabled:cursor-not-allowed"
              onClick={() => {
                if (!isLoading) sendNotifyMixerRequest();
                else toast.error("Deposit address has not been assigned yet");
              }}>
              <span>
                Click<br></br> if <br></br> transaction <br></br> is confirmed{" "}
                <br></br>
                in your wallet
              </span>
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="my-2">
              <label className="text-light-grey text-sm md:text-lg mb-1">
                AFTER THE PAYMENT IS CONFIRMED, YOU WILL RECEIVE MIXED ETH /
                WETH IN
              </label>
              <p className="text-center text-xs font-epilogue font-light text-black">
                {mixerDetailObj.receiver_address}
              </p>
            </div>

            <div className="my-2">
              <label className="text-light-grey text-sm md:text-lg mb-1">
                Estimated Arrival
              </label>
              <p className="text-center text-xs uppercase font-semibold font-epilogue text-black">
                {mixerDetailObj.delay === -1
                  ? "No Delay"
                  : mixer_times.find(
                      (val) => val.id === mixerDetailObj.delay.toString()
                    )?.value}
              </p>
            </div>

            <label className="text-light-grey text-sm md:text-lg mb-1">
              THE FEE FOR THIS TRANSACTION WILL BE 1% PLUS NETWORK FEE
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
