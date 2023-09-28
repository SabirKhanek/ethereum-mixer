import {createPortal} from 'react-dom'
import { useRef, useState } from "react";
import close from '../../assets/close-circle.svg'
import mixer_times from '../../shared/constants/mixer_times';
import { useNavigate, To, createSearchParams } from 'react-router-dom';
import { isValidBEP20Address } from '../../shared/validators/input';
import { useMixerDetails } from '../../shared/contexts';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}


  

  
export function Modal(props: ModalProps) {
    const {isOpen, onClose} = props
    if(!isOpen) return null
    const dialog = useRef<HTMLDialogElement>(null)
    const handleClose = () => {
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
        dialog.current?.close()
        onClose()
    }
    const mixerDetailsContext = useMixerDetails()

    const handleContinue = () => {
        if(isValidBEP20Address(reciever_address)) {
            const obj: To = {
                pathname: 'confirm_mixer',
                search: createSearchParams({
                    reciever_address: reciever_address,
                    delay: selectedOption.id
                }).toString()
            }
            mixerDetailsContext.setMixerDetails({reciever_address, delay: Number.parseInt(selectedOption.id)})
            navigate(obj, {})
        } else setError(true)
    }
    
    const options = mixer_times
    
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0])
    const [error , setError] = useState(false)
    const [reciever_address, setRecieverAddress] = useState('')
    document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    return createPortal(
        <>
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-50' onClick={handleClose}></div>
        
        <div style={{transform: 'translate(-50%, -50%)'}} className='fixed  w-[300px] xs:w-3/4 md:w-[566px] top-1/2 left-1/2 z-50 bg-light-grey'>
            <div className='my-2 mx-3 border border-black p-5 relative bg-[#E6E6E6]'>
                <button className='absolute top-2 right-2' onClick={handleClose}><img src={close}/></button>
                
                <div className='flex justify-center flex-col items-center'>
                    <span className='uppercase text-3xl leading-[1]'>crypto-blender.xyz</span>
                    <span className='uppercase text-[20px] leading-[1] font-light'>anonymize your ethereum</span>
                </div>

                <div className='my-2 flex text-[20px] justify-center items-center'>
                    <span>mix <span className='text-3xl'>ETH</span> Now</span>
                </div>

                <div className='font-epilogue'>
                    <label htmlFor="reciever_address" className='uppercase text-xs'>Enter wallet address to receive mixed eth</label>
                    <input value={reciever_address} onChange={(e)=>setRecieverAddress(e.target.value)} name='reciever_address' className='border border-gray-300 bg-white text-grey ring-slate-600 w-full text-sm py-1 px-2 mb-0' placeholder='Example: 0xD8DA6BF26964AF9D7EED9E03E53415D37AA96045' type="text" />
                    {error&&<div className='w-full bg-red-500 text-white text-center border border-black mt-0 text-sm'>A CORRECT ETHEREUM WALLET ADDRESS IS NEEDED - OK...</div>}
                </div>


                <div className='my-5 flex gap-2'>
                    <div className='basis-1/2 flex justify-center items-center text-xl gap-2 bg-white py-4 border border-grey relative' onClick={()=>setShowDropdown(!showDropdown)}>
                        <span>{selectedOption&&selectedOption.value}</span>
                        <svg className={'transition-all duration-150'+(showDropdown&&' rotate-180')} width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8L23.2583 0.5H0.74167L12 8Z" fill="black"/>
                        </svg>
                        {showDropdown&&
                        <div className='absolute top-full left-0 w-full bg-white border-grey overflow-y-auto'>
                            {options.map((option, index)=> {
                                return <div className={`py-1 text-sm px-4 hover:bg-[#8888F8] ${selectedOption.id===option.id?'bg-light-grey':''}`} onClick={()=>{setSelectedOption(option); setShowDropdown(false)}} key={index}>{option.value}</div>
                            })}
                        </div>}
                    </div>

                    <button className='basis-1/2 flex justify-center items-center gap-2 text-xl bg-[#F4C172] border border-grey' onClick={handleContinue}>
                        <span >Continue</span>
                        <svg className='hover:translate-x-2 transition-all duration-75' width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="23" height="23" fill="url(#pattern0)"/>
                            <defs>
                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_141_113" transform="scale(0.0078125)"/>
                            </pattern>
                            <image id="image0_141_113" width="128" height="128" xlinkHref="data:image/png;base64,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"/>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        </>
    , document.getElementById('modal-root')!)
}