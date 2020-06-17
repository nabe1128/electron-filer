import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/services';

@Component({
  selector: '[filer-content]',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(
    private readonly _fileService: FileService
  ) { }

  ngOnInit(): void {
    this._setFilesObserver();

    this._fileService.requestFiles('/');
  }

  private _setFilesObserver() {
    this._fileService.file$.subscribe((fileList) => {
      console.log(fileList);
    });
  }

}
