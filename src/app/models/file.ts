export interface File {

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
}
