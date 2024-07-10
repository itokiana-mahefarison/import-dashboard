import { v4 as uuid } from "uuid"

export const useFormatImportData = () => {
    const format = (data: Array<Record<string, any>>) => {
        return data.map((item) => {
            return {
                id: uuid(),
                entryDate: item['PERIODE'],
                poidsBrutKg: item['POIDS_BRUT_KG'],
                tareKg: item['TARE_KG'],
                poidsNetKg: item['POIDS_NET_KG'],
                observation: item['OBSERVATIONS'],
                comments: item['AUTRES_COMMENTAIRES'],
                produit: {
                    id: item['CODE_PRODUIT'],
                    label: item['PRODUIT'],
                    class: item['CLASSE_PRODUITS']
                },
                site: {
                    id: item['CODE_SITE'],
                    name: item['SITE']
                }
            }
        })
    }

    return format
}