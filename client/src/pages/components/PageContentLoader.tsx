import { BarLoader } from "react-spinners"

export const PageContentLoader = () => {
    return (
        <div className="h-full min-h-[100px]">
            <BarLoader className="!w-full"/>
        </div>
    )
}