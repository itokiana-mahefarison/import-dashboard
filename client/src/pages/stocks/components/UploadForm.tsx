import { Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from 'react-dropzone'
import { PropagateLoader } from "react-spinners";

export const UploadForm = (props: UploadFormProps) => {
    const [error, setError] = useState<Error | undefined>(undefined);

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isFocused,
    } = useDropzone({
        accept: {
            "text/csv": [],
            "application/csv": [],
            "application/vnd.ms-excel": [],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
                [],
            "application/vnd.ms-excel.sheet.macroEnabled.12": [],
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12": [],
        },
        maxFiles: 1,
        minSize: 5,
        onError: (err) => setError(err),
        onDrop: (acceptedFiles) => {
            props.onSubmited?.(acceptedFiles);
        },
    });

    return (
        <div
            {...getRootProps({ className: "dropzone" })}
            className={`flex flex-col items-center rounded-md border border-dashed border-slate-400 bg-slate-100 ${
                error || isDragReject ? "border-red-600 bg-red-300" : ""
            } ${
                isDragAccept || isFocused ? "border-slate-600 bg-slate-300" : ""
            } px-6 py-10 cursor-pointer`}
        >
            { props.isLoading ? <PropagateLoader/> : <Upload/> }
            <div className="mt-4 flex items-center text-sm leading-6 text-gray-600">
                <div
                    className={`relative cursor-pointer rounded-md font-semibold text-[rgb(25,118,210)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[rgb(25,118,210)] focus-within:ring-offset-2 hover:text-[rgb(25,118,180)]`}
                >
                    <span>Cliquez pour uploader</span>
                    <input {...getInputProps()} name="file-upload" />
                </div>
                <p className="pl-1">ou glissez et déposez ici votre fichier</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
                XLS, XLSX, CSV
            </p>
        </div>
    );
};

type UploadFormProps = {
    onSubmited?: (files: File[]) => void;
    isLoading?: boolean
};