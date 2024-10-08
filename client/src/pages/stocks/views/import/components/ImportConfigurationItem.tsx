import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import _ from "lodash"
import { useImportConfigurationFormData } from "../hooks/useImportConfigurationFormData"

export const ImportConfigurationItem = ({ sheetName, dataRange }: Props) => {
    const { setFormData } = useImportConfigurationFormData()
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">
                    <div className="flex justify-between items-center">
                        <span>{sheetName}</span>
                        <Button size={"sm"}>
                            <X size={18} onClick={() => setFormData((v: any) => _.omit(v, sheetName))} />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <span>Plage de données : </span> <code className="bg-slate-200 p-1 rounded-lg">{dataRange}</code>
            </CardContent>
        </Card>
    )
}

type Props = {
    sheetName: string
    dataRange: string 
}