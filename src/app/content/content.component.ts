import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/services';
import { File } from '../models/file';
import { fromEvent, merge, Subscription } from 'rxjs';
import { bufferTime, map, filter } from 'rxjs/operators';

@Component({
  selector: '[filer-content]',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  currentDirFiles: File[] = [];

  private _today = new Date();

  subscription?: Subscription = null;

  constructor(
    private readonly _fileService: FileService
  ) { }

  ngOnInit(): void {
    this._setFilesObserver();

    this._fileService.getHomeFiles();
  }

  private _setFilesObserver() {
    this._fileService.files$.subscribe((fileList) => {
      this.currentDirFiles = fileList;
    });
  }

  iconClass(file: File): string {
    if (!file.isFile) {
      return 'icon-folder';
    } else {
      return 'icon-newspaper';
    }
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

  onMouseDownFile(me: MouseEvent, file: File) {
    if (!this.subscription) {
      me.preventDefault();
      const elm = document.getElementById(`file-${file.name}`);
      const mouseDownEvent$ = fromEvent(elm, 'mousedown');
      const mouseUpEvent$ = fromEvent(elm, 'mouseup');
      this.subscription = merge(mouseDownEvent$, mouseUpEvent$).pipe(
        bufferTime(300),
        map((event) => event.length),
        filter((eventLength) => eventLength === 3)
      ).subscribe(() => {
        this._fileService.getFiles(file.path, true);

        this.subscription.unsubscribe();
        this.subscription = null;
      });
    }
  }
}
