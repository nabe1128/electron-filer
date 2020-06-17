import { Injectable } from '@angular/core';

import { ElectronService } from './electron/electron.service';
import { Observable } from 'rxjs';

import { File } from '../../models/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  file$: Observable<File[]>;

  constructor(private readonly _electronService: ElectronService) {
    this._setFilesObservable();
  }

  private _setFilesObservable() {
    this.file$ = new Observable(subscriber => {
      this._electronService.ipcRenderer.on("files", (_, response) => {
        subscriber.next(response);
      });
    });
  }

  requestFiles(dirPath: string) {
    this._electronService.ipcRenderer.send("getFiles", dirPath);
  }

  requestHomeFiles() {
    this._electronService.ipcRenderer.send("getHomeFiles");
  }
}
