export type FileTreeItemProps = {
    path: string
    name: string
    type: 'file' | 'folder'
    children?: Array<FileTreeItemProps>
}