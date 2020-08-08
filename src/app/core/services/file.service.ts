import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ElectronService } from './electron/electron.service';
import { HistoryService } from './history.service';
import { File } from '../../models/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private _filesSubject = new Subject<File[]>();

  includeDotFile = false;

  constructor(
    private readonly _zone: NgZone,
    private readonly _electronService: ElectronService,
    private readonly _historyService: HistoryService,
  ) { }

  get files$(): Observable<File[]> {
    return this._filesSubject.asObservable();
  }

  getFiles(dirPath: string, addHistory: boolean) {
    this._electronService.fs.readdir(dirPath, (err, fileNames) => {
      if (err) {
        console.error(err);
        return;
      };

      const files: File[] = [];
      fileNames.forEach((file) => {
        if (this.includeDotFile || !file.startsWith('.')) {
          const filePath = this._electronService.path.join(dirPath, file);
          const stats = this._electronService.fs.statSync(filePath);
          files.push({
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

      if (addHistory) {
        this._historyService.push(dirPath);
      }

      this._zone.run(() => {
        this._filesSubject.next(files);
      });
    });
  }

  getHomeFiles() {
    const homeDir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    this.getFiles(homeDir, true);
  }
}
