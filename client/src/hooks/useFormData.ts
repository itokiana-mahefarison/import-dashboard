import { useRecoilState, useResetRecoilState } from "recoil"
import _ from "lodash"
import { v4 as uuid } from "uuid"
import { FormDataState } from "@/state/FormDataState"
import { useCallback, useEffect, useMemo } from "react"

export const useFormData = <T = any>(props: Props<T>) => {
    const globalId = useMemo(() => props.id || uuid(), [props.id])
    const [formData, setFormData] = useRecoilState<T>(FormDataState(globalId))
    const reset = useResetRecoilState(FormDataState(globalId))

    const handleReset = useCallback(() => {
        reset()
        if(props?.formData){
            setFormData(props?.formData)
        }
    }, [reset, props, setFormData])

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
        reset: handleReset
    }
}

export type Props<T> = {
    formData?: T
    id?: string
}