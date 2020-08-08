import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/services';

@Component({
  selector: '[filer-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private readonly _fileService: FileService) { }

  ngOnInit(): void {
  }

  onClickShortcut(target: string) {
    if (target === 'home') {
      this._fileService.getHomeFiles();
    }
  }

}
