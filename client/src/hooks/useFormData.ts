import { useRecoilState, useResetRecoilState } from "recoil"
import _ from "lodash"
import { v4 as uuid } from "uuid"
import { FormDataState } from "@/state/FormDataState"

export const useFormData = <T = any>(props: Props<T>) => {
    const globalId = props.id || uuid()
    const [formData, setFormData] = useRecoilState(FormDataState(globalId))
    const reset = useResetRecoilState(FormDataState(globalId))

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