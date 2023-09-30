import confirmation from "./feature_svgs/1_confirmation.svg";
import kyc from "./feature_svgs/no_kyc.svg";
import multi_chain from "./feature_svgs/multi_chains.svg";
import rate from "./feature_svgs/1_per_fixed.svg";
import mix_eth_weth from "./feature_svgs/mix_eth_weth.svg";
export function Features() {
  return (
    <div className="max-w-lg mx-auto px-2 pt-5 pb-20">
      <div className="flex justify-center my-10">
        <img src={multi_chain} />
      </div>
      <div className="flex justify-center gap-3 md:justify-between flex-wrap my-10">
        <img className="my-10 md:my-0" src={kyc} />
        <img className="my-10 md:my-0" src={confirmation} />
      </div>
      <div className="flex justify-center gap-3 md:justify-between flex-wrap mt-10">
        <img className="my-10 md:my-0" src={rate} />
        <img className="my-10 md:my-0" src={mix_eth_weth} />
      </div>
    </div>
  );
}
