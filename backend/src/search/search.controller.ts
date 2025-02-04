import { Controller, Get, Query, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('movie')
  async searchMovie(@Query('query') query: string) {
    return this.searchService.searchMovie(query);
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.searchService.getMovieById(id);
  }
}