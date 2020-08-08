import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../core/services/history.service';
import { FileService } from '../core/services';

@Component({
  selector: 'filer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly _historyService: HistoryService,
    private readonly _fileService: FileService,
  ) { }

  ngOnInit(): void {
  }

  onClickBack() {
    if (this._historyService.canBack()) {
      const path = this._historyService.back();
      this._fileService.getFiles(path, false);
    }
  }

  onClickForward() {
    if (this._historyService.canForward()) {
      const path = this._historyService.forward();
      this._fileService.getFiles(path, false);
    }
  }
}
