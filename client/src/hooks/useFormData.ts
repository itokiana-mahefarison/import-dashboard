import { useRecoilState, useResetRecoilState } from "recoil"
import _ from "lodash"
import { v4 as uuid } from "uuid"
import { FormDataState } from "@/state/FormDataState"
import { useEffect, useMemo } from "react"

export const useFormData = <T = any>(props: Props<T>) => {
    const globalId = useMemo(() => props.id || uuid(), [props.id])
    const [formData, setFormData] = useRecoilState(FormDataState(globalId))
    const reset = useResetRecoilState(FormDataState(globalId))

    useEffect(() => {
        if(props.formData){
            setFormData(props.formData)
        }
    }, [])

    const handleInputChange = (key: string, value?: any) => {
        setFormData((temp) => {
            return {
                ...temp,
                [key]: value
            }
        })
    }

    return {
        formData,
        setFormData,
        handleInputChange,
        reset
    }
}

export type Props<T> = {
    formData?: T
    id?: string
}