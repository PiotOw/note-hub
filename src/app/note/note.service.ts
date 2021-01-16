import {Injectable} from '@angular/core';
import {Note} from './note.model';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FileModel} from '../file/file.model';
import {NoteTypeEnum} from './note-type.enum';

@Injectable({
	providedIn: 'root'
})
export class NoteService {

	constructor(private http: HttpClient) {
	}

	fetchAllNotes(): Observable<Note[]> {
		const link = environment.BASE_API_URL + '/notes';
		return this.http.get<any>(link);
	}

	postNote(data: Note): Observable<any> {
		const link = environment.BASE_API_URL + '/notes';
		return this.http.post<any>(link, data);
	}
}
