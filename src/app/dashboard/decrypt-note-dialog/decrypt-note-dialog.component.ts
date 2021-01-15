import {Component, OnInit} from '@angular/core';
import {Note} from '../../note/note.model';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {sha256} from 'js-sha256';

declare var require: any;

@Component({
	selector: 'app-decrypt-note-dialog',
	templateUrl: './decrypt-note-dialog.component.html',
	styleUrls: ['./decrypt-note-dialog.component.scss']
})
export class DecryptNoteDialogComponent implements OnInit {

	note: Note;

	decrypted: string = '***** ***';

	notePasswordForm = new FormGroup({
		password: new FormControl(null)
	})

	constructor(private dialogRef: MatDialogRef<DecryptNoteDialogComponent>) {
	}

	ngOnInit(): void {
		this.notePasswordForm.controls['password'].valueChanges.subscribe(pass => {
			if (pass.length > 0) {
				const aesjs = require('aes-js');
				const key = sha256.update(pass).digest();
				const encryptedBytes = aesjs.utils.hex.toBytes(this.note.content);
				const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
				const decryptedBytes = aesCtr.decrypt(encryptedBytes);
				this.decrypted = aesjs.utils.utf8.fromBytes(decryptedBytes);
			} else {
				this.decrypted = this.note.content;
			}
		})
	}

	close() {
		this.dialogRef.close();
	}

}
