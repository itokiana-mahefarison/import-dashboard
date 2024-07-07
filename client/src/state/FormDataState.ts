import { atomFamily } from "recoil";

export const FormDataState = atomFamily<Record<string, any>, string>({
    key: 'FormData',
    default: {}
})