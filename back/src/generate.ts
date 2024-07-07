import { Entities } from "./entities";
import { join } from "path"
import fs from "fs"
import { addCRUDControllers, generateControllerByEntity } from "./utils/CRUDUtils";

try {
    const folderName = 'crud'
    const folder = join(__dirname, folderName)
    Entities.forEach((entity) => {
        generateControllerByEntity(folder, entity.name)
    })

    const indexFile = join(__dirname, 'index.ts')
    const indexData = fs.readFileSync(indexFile, {encoding: "utf8"})

    fs.writeFileSync(indexFile, addCRUDControllers(indexData, Entities.map((item) => item.name), folderName))

} catch (error) {
    console.error(error)
}