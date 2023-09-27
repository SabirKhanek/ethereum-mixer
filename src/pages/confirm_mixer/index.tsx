import { useNavigate, useSearchParams } from "react-router-dom"
import { isValidBEP20Address as isValidETH20Address } from "../../shared/validators/input"
import {toast} from 'react-toastify'
import { useEffect } from "react"

export function ConfirmMixer() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [reciever_address, delay] = [searchParams.get('reciever_address'), searchParams.get('delay')]
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isValidETH20Address(reciever_address?reciever_address:'')) {
            toast('Invalid ETH20 Address')
            navigate({pathname:'/'})
        }
    }, [])

    return (
        <>
            <h1>Reciever Address: {reciever_address}</h1>
            <h1>Delay: {delay}</h1>
        </>
        
    )
}