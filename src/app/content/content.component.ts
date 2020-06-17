import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/services';
import { File } from '../models/file';

@Component({
  selector: '[filer-content]',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  currentDirFiles: File[] = [];

  private _today = new Date();

  constructor(
    private readonly _fileService: FileService
  ) { }

  ngOnInit(): void {
    this._setFilesObserver();

    // TODO 2回リクエストを投げないで済む方法模索
    this._fileService.getHomeFiles(false);
    setTimeout(() => {
      this._fileService.getHomeFiles(false);
    }, 0);
  }

  private _setFilesObserver() {
    this._fileService.files$.subscribe((fileList) => {
      this.currentDirFiles = fileList;
    });
  }

  formatSize(size: number): string {
    // GB
    if (size > 1000000000) {
      const gb = size / 1000000000;
      return `${gb.toFixed(1)}GB`;
    }
    // MB
    else if (size > 1000000) {
      const mb = size / 1000000;
      return `${mb.toFixed(1)}MB`;
    }
    // KB
    else {
      const kb = size / 1000;
      return `${kb.toFixed(1)}KB`;
    }
  }

  isToday(date: Date): boolean {
    return this._today.getFullYear() === date.getFullYear()
      && this._today.getMonth() === date.getMonth()
      && this._today.getDate() === date.getDate();
  }
}
