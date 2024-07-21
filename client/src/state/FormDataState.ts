import { atomFamily } from "recoil";

export const FormDataState = atomFamily<any, string>({
    key: 'FormData',
    default: {}
})