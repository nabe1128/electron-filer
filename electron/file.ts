import * as path from 'path';
import * as fs from "fs-extra";

type File = {
    path: string;
    size: number;
    mtime: Date;
    isFile: boolean;
};

export function getFiles(dirPath: string, includeDotFile: boolean, callback: (files: File[]) => void) {
    console.log(`call getFiles(${dirPath})`);

    fs.stat(dirPath, (err, _) => {
        if (err) throw err;

        fs.readdir(dirPath, (err, files) => {
            if (err) throw err;

            const fileList: File[] = [];
            files.forEach((file) => {
                if (includeDotFile || !file.startsWith('.')) {
                    const filePath = path.join(dirPath, file);
                    const stat = fs.statSync(filePath);
                    fileList.push({
                        path: filePath,
                        size: stat.size,
                        mtime: stat.mtime,
                        isFile: stat.isFile()
                    });
                }
            });

            callback(fileList);
        });
    });
}