import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {FileModel} from './file.model';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private http: HttpClient) {
	}

	fetchAllFiles(): Observable<FileModel[]> {
		const link = environment.BASE_API_URL + '/files';
		return this.http.get<any>(link);
	}

	uploadFile(data: FileModel): Observable<any> {
		const link = environment.BASE_API_URL + '/files';
		return this.http.post<any>(link, data);
	}
}
