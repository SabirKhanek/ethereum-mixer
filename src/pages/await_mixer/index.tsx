import {  createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { isValidBEP20Address as isValidETH20Address, isValidTransactionHash } from "../../shared/validators/input"
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import mixer_times from "../../shared/constants/mixer_times"
import copy from './assets/copy.svg'
import loading from './assets/loading.svg'
import { useMixerDetails } from "../../shared/contexts"
import { confirmTxn, getToSendAddress } from "../../services"
import QRCode from "react-qr-code"
import { TransactionHashInputModal } from "../../components/transaction_hash_input_modal"
import { STATUS } from "../../shared/constants/status_codes"

export function AwaitMixer() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {delay, reciever_address}= useMixerDetails().MixerDetails
    const [reciever_address_from_route, delay_from_route] = [searchParams.get('reciever_address'), searchParams.get('delay')]
    const navigate = useNavigate()
    const [toSend, setToSend] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [isAwaiting, setIsAwaiting] = useState(true)

    const [mixerDetailObj, setMixerDetailObj] = useState({
        reciever_address: '',
        delay: -1
    })

    useEffect(() => {
        console.log(reciever_address)
        // Check if both values from context and route are not present or not valid
        const isReceiverValid = isValidETH20Address(reciever_address);
        const isReceiverFromRouteValid = reciever_address_from_route &&isValidETH20Address(reciever_address_from_route);
        
        if (!isReceiverValid && !isReceiverFromRouteValid) {
          toast('Invalid ETH20 Address');
          navigate({ pathname: '/' });
        } else if(!isReceiverValid && isReceiverFromRouteValid) {
            toast('Confirm Mixer Details');
            navigate({ pathname: '/confirm_mixer' , search: createSearchParams({
                reciever_address: reciever_address_from_route,
                delay: delay_from_route||'-1'
            }).toString() })
        } else {
            const reciever_address_to_use = reciever_address
            const delay_id_to_use = delay
            
            searchParams.set('reciever_address', reciever_address_to_use)
            searchParams.set('delay', delay_id_to_use.toString())
            setSearchParams(searchParams)
            
            setMixerDetailObj({
                reciever_address: reciever_address_to_use,
                delay: delay_id_to_use
            })
            
            setIsLoading(true)
            getToSendAddress(reciever_address_to_use).then((res)=>{
                setToSend(res.address)
                setIsLoading(false)
            }).catch(err=> {
                console.error(err)
                toast.error('Something went wrong')
                setIsLoading(false)
            })
        }
    }, []);

    const handleModalClose : TransactionHashInputModal["onClose"] = (val)=>{
        setModalVisible(false)
        if(val&&isValidTransactionHash(val)) {
            confirmTxn({txnHash:val, reciever_address: mixerDetailObj.reciever_address}).then((res)=>{
                if(res.status===STATUS.OK) {
                    setIsAwaiting(false)
                    toast.success(res.message)
                    navigate('/')
                } else if(res.status===STATUS.HASH_FAILURE) {
                    toast.error('Transaction is not confirmed yet. Confirm if the hash is valid and try again after some time.')
                } else {
                    toast.error('Something went wrong')
                }
            }).catch(err=>{
                toast.error('Something went wrong.')
                console.error(err)
            })
        }
        
    }

    return (
        <>
            <div className="bg-[#E6E6E6] w-screen h-screen flex justify-center items-center content-center">
                <div className="max-w-3xl w-full p-1 bg-[#E6E6E6] ">
                    <h1 className="text-xl mb-10 text-center">crypto-blender.xyz</h1>
                    <h1 className="text-3xl mb-10 text-center">send payment</h1>

                    <div className="mb-2 flex justify-between items-center flex-wrap">
                        <div>
                            <label className="text-light-grey text-lg mb-1">To</label>
                            <p className="text-xs sm:text-base font-epilogue font-light text-black">
                                {isLoading?<span>Loading... <img className="w-5 animate-spin inline" src={loading} alt="" /></span>:
                                <span>
                                    {toSend}
                                    <img onClick={()=>{navigator.clipboard.writeText(mixerDetailObj.reciever_address);toast('Copied to clipboard')}} 
                                        className="inline ml-1 w-5 cursor-pointer" src={copy} alt="" />
                                </span>}
                            </p>
                        </div>
                        {toSend&&<QRCode size={196} className="mx-auto p-3 bg-white rounded-md" value={toSend}></QRCode>}
                    </div>

                    <div className="mb-2">
                        <label className="text-light-grey text-lg mb-1">Amount</label>
                        <p className="text-2xl ">FROM 0.25 TO 25 ETH / WETH</p>
                    </div>

                    <div className='my-5 flex gap-2'>
                        <button className='basis-1/2 flex px-2 py-4 justify-center items-center gap-2 text-xl bg-[#F4C172] border border-grey' onClick={()=>navigate({pathname:'/await_mixer'})}>
                            <span>Awaiting Payment</span>
                            {!isLoading && isAwaiting&&<img className="w-6 animate-spin" src={loading} alt="" />}
                        </button>

                        <div className='basis-1/2 flex justify-center items-center text-xl gap-2 py-4 px-2 border border-grey relative cursor-pointer bg-light-grey text-black' onClick={()=>setModalVisible(true)}>
                            <span>Click if transaction is confirmed in your wallet</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className="my-2">
                            <label className="text-light-grey text-sm md:text-lg mb-1">AFTER THE PAYMENT IS CONFIRMED, YOU WILL RECIEVE MIXED ETH / WETH IN</label>
                            <p className="text-center text-xs font-epilogue font-light text-black">{mixerDetailObj.reciever_address}</p>
                        </div>

                        <div className="my-2">
                            <label className="text-light-grey text-sm md:text-lg mb-1">Estimated Arrival</label>
                            <p className="text-center text-xs uppercase font-semibold font-epilogue text-black">{mixerDetailObj.delay===-1?'No Delay':mixer_times.find((val)=>val.id===mixerDetailObj.delay.toString())?.value}</p>
                        </div>

                        <label  className="text-light-grey text-sm md:text-lg mb-1">THE FEE FOR THIS TRANSACTION WILL BE 1% PLUS NETWORK FEE</label>
                    </div>
                </div>
            </div>
            <TransactionHashInputModal isOpen={modalVisible} onClose={handleModalClose}></TransactionHashInputModal>
        </>
        
    )
}