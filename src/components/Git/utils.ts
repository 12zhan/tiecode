export type gitType = {
    author: string
    date: string
    message?: string
    files?: Array<{
        changes: Array<{
            content: string,
            type: 'add' | 'delete' | 'modify'
        }>
        from: string,
        to: string
    }>
    hash: string
}

//git log -p 日志解析
export function parseGitCommit(logEntry: string): Array<gitType> {

    const commits = [] as Array<gitType>;
    let currentCommit = {} as gitType;

    const reg1 = /^commit \w*/gm
    const arr1 = logEntry.split(reg1)
    arr1.forEach((v) => {
        const arr2 = v.split('\n')
        for (var j = 0; j < arr2.length; j++) {
            if (arr2[j].startsWith('Author: ')) {
                currentCommit.author = arr2[j].slice(7)
            } else if (arr2[j].startsWith('Date: ')) {
                currentCommit.date = arr2[j].slice(8)
            } else if (arr2[j].length == 0 && (arr2.length - 1) > j && arr2[j + 1].startsWith("    ")) {
                currentCommit.message = arr2[j + 1].slice(4)
                j = j + 2
            } else if (arr2[j].startsWith('diff --git')) {
                //开始提取文件差异
                const fileDiff = {
                    from: '',
                    to: '',
                    changes: []
                };
                const fileParts = arr2[j].match(/a\/(.+?) b\/(.+?)/);
                if (fileParts) {
                    fileDiff.from = fileParts[1];
                    fileDiff.to = fileParts[2];
                }
                currentCommit!.files = currentCommit.files || [];
                currentCommit!.files.push(fileDiff);
            } else if (/^-/.test(arr2[j])) {
                currentCommit.files![currentCommit.files!.length - 1].changes.push({
                    type: 'delete',
                    content: arr2[j].slice(1)
                })
            } else if (/^\+/.test(arr2[j])) {
                // 这是一个新增的行
                currentCommit.files![currentCommit.files!.length - 1].changes.push({
                    type: 'add',
                    content: arr2[j].slice(1)
                });
            }
        }
        if (currentCommit && currentCommit.message !== undefined) {
            commits.push(currentCommit);
        }
        currentCommit = {} as gitType

    })


    return commits
}

export function parseGitFileContentWhole(file: { changes: Array<{ content: string, type: 'add' | 'delete' | 'modify' }>, from: string, to: string }) {
    const dir = window.path.join("C:/Users/Administrator/Desktop/tiecode/tiecode", file.from)
    //取原内容

    if (!window.file.exists(dir)) {
        return ""
    }

    const content = window.file.readFile(dir)

    file.changes.forEach((v) => {
        if (v.type === 'delete') {
            
        } else if (v.type === 'add') {

        } else if (v.type === 'modify') {

        }
    })

    console.log(content);


}