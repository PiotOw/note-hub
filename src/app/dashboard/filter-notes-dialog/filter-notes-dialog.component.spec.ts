import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterNotesDialogComponent} from './filter-notes-dialog.component';

describe('FilterNotesDialogComponent', () => {
	let component: FilterNotesDialogComponent;
	let fixture: ComponentFixture<FilterNotesDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FilterNotesDialogComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FilterNotesDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
