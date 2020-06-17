import * as path from 'path';
import * as fs from "fs-extra";

type File = {
    path: string;
    name: string;
    mode: number;
    uid: number;
    gid: number;
    size: number;
    mtime: Date;
    birthtime: Date;
    isFile: boolean;
    isSymbolicLink: boolean;
};

export function getFiles(dirPath: string, includeDotFile: boolean, callback: (fileList: File[]) => void) {
    console.log(`call getFiles(${dirPath})`);

    fs.readdir(dirPath, (err, files) => {
        if (err) throw err;

        const fileStats: File[] = [];
        files.forEach((file) => {
            if (includeDotFile || !file.startsWith('.')) {
                const filePath = path.join(dirPath, file);
                const stats = fs.statSync(filePath);
                fileStats.push({
                    path: filePath,
                    name: file,
                    mode: stats.mode,
                    uid: stats.uid,
                    gid: stats.gid,
                    size: stats.size,
                    mtime: stats.mtime,
                    birthtime: stats.birthtime,
                    isFile: stats.isFile(),
                    isSymbolicLink: stats.isSymbolicLink()
                });
            }
        });

        callback(fileStats);
    });
}

export function getHomeFiles(includeDotFile: boolean, callback: (fileList: File[]) => void) {
    const homeDir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    getFiles(homeDir, includeDotFile, callback);
}