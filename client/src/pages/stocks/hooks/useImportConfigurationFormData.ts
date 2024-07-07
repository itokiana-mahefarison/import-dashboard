import { useFormData } from "@/hooks/useFormData"

export const useImportConfigurationFormData = () => {
    return useFormData({id: `import-configuration`})
}