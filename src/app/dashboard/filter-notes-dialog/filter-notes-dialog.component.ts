import {Component, OnInit} from '@angular/core';
import {NoteTypeEnum} from '../../note/note-type.enum';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
	selector: 'app-filter-notes-dialog',
	templateUrl: './filter-notes-dialog.component.html',
	styleUrls: ['./filter-notes-dialog.component.scss']
})
export class FilterNotesDialogComponent implements OnInit {

	notePublic = false;
	notePrivate = false;
	noteProtected = false;

	constructor(private dialogRef: MatDialogRef<FilterNotesDialogComponent>) {
	}

	ngOnInit(): void {
	}

	close() {
		const filters = [];
		if (this.notePublic) {
			filters.push(NoteTypeEnum.PUBLIC);
		}
		if (this.notePrivate) {
			filters.push(NoteTypeEnum.PRIVATE);
		}
		if (this.noteProtected) {
			filters.push(NoteTypeEnum.PROTECTED);
		}
		this.dialogRef.close(filters);
	}

}
