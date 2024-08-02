import { FileTreeItemProps } from "../FileTreeItemProps";
import { ProjectItem } from "../ProjectItem";

interface project{
    getALlProject() : ProjectItem[]
    addProject(project:ProjectItem) : void
    getFileList(path:string) : Array<FileTreeItemProps>
    readFile(p:string) : string
}

export const project:project = window.project