import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DecryptNoteDialogComponent} from './decrypt-note-dialog.component';

describe('DecryptNoteDialogComponent', () => {
	let component: DecryptNoteDialogComponent;
	let fixture: ComponentFixture<DecryptNoteDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DecryptNoteDialogComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DecryptNoteDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
