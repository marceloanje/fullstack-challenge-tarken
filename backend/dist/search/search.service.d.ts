import { HttpService } from '@nestjs/axios';
export declare class SearchService {
    private readonly HttpService;
    constructor(HttpService: HttpService);
    searchMovie(query: string): Promise<any>;
}
