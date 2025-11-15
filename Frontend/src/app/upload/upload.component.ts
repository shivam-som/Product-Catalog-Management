import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
    selector: 'app-upload', template: `
<div>
<h3>Bulk Upload CSV</h3>
<input type="file" (change)="onFile($event)" accept=".csv">
<button class="btn btn-primary mt-2" (click)="upload()">Upload</button>
<div *ngIf="result">Inserted: {{result.inserted}} Errors: {{result.errors}}</div>
</div>
` })
export class UploadComponent {
    file: any; result: any;
    constructor(private api: ApiService) { }
    onFile(e: any) { this.file = e.target.files[0]; }
    upload() { const fd = new FormData(); fd.append('file', this.file); this.api.postForm('upload/csv', fd).subscribe((r: any) => this.result = r, () => alert('Upload failed')); }
}