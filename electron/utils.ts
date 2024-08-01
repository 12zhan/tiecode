type CommitDetails = {
    message: string;
};

type FileChange = {
    type: 'added' | 'deleted';
    content: string;
};

type FileDiff = {
    from: string;
    to: string;
    changes: FileChange[];
};

type Commit = {
    hash: string;
    author: string;
    date: string;
    details: CommitDetails;
    files: FileDiff[];
};

function parseGitLogP(logOutput: string): Commit[] {
    const commits: Commit[] = [];
    let currentCommit: Commit | null = null;
    const lines = logOutput.split('\n');

    for (const line of lines) {
        if (line.startsWith('commit ')) {
            if (currentCommit) {
                commits.push(currentCommit);
            }
            currentCommit = {
                hash: line.slice(7, line.indexOf('\n')),
                author: '',
                date: '',
                details: { message: '' },
                files: []
            };
        } else if (line.startsWith('Author: ')) {
            currentCommit!.author = line.slice(7);
        } else if (line.startsWith('Date: ')) {
            currentCommit!.date = line.slice(5);
        } else if (line.startsWith('    ')) {
            const messageLine = line.slice(4);
            currentCommit!.details.message += messageLine + '\n';
        } else if (line.startsWith('diff --git')) {
            const fileDiff: FileDiff = {
                from: '',
                to: '',
                changes: []
            };
            const fileParts = line.match(/a\/(.+?) b\/(.+?)/);
            if (fileParts) {
                fileDiff.from = `a/${fileParts[1]}`;
                fileDiff.to = `b/${fileParts[2]}`;
            }
            currentCommit!.files.push(fileDiff);
        } else if (/^---/.test(line) || /^\+\+\+/.test(line)) {
            // Ignore file paths
        } else if (/^@@ -\d+,\d+ \+\d+,\d+ @@/.test(line)) {
            // Extract change positions
        } else if (line.startsWith('-')) {
            const fileIndex = currentCommit!.files.length - 1;
            currentCommit!.files[fileIndex].changes.push({
                type: 'deleted',
                content: line.slice(1)
            });
        } else if (line.startsWith('+')) {
            const fileIndex = currentCommit!.files.length - 1;
            currentCommit!.files[fileIndex].changes.push({
                type: 'added',
                content: line.slice(1)
            });
        }
    }

    if (currentCommit) {
        commits.push(currentCommit);
    }

    return commits;
}