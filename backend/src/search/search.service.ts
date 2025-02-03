import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
    constructor(private readonly HttpService: HttpService) {}

    async searchMovie(query: string): Promise<any> {
        const apiUrl = `http://www.omdbapi.com/?apikey=f993b6c&s=${query}`;
    
        return firstValueFrom(
            this.HttpService.get<any>(apiUrl)
                .pipe(
                    map(response => response.data),
                    catchError(error => {
                        console.error('Error querying external API:', error.message);
                        return throwError(() => new Error('Failed to fetch movie data'));
                    })
                )
        );
    }

    async getMovieById(id: string): Promise<any> {
        const apiUrl = `http://www.omdbapi.com/?apikey=f993b6c&i=${id}`;

        return firstValueFrom(
            this.HttpService.get<any>(apiUrl)
                .pipe(
                    map(response => response.data),
                    catchError(error => {
                        console.error('Error querying external API by ID:', error.message);
                        return throwError(() => new Error('Failed to fetch movie by ID'));
                    })
                )
        );
    }
}