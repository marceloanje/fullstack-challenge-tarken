"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const rxjs_2 = require("rxjs");
const rxjs_3 = require("rxjs");
let SearchService = class SearchService {
    constructor(HttpService) {
        this.HttpService = HttpService;
    }
    async searchMovie(query) {
        const apiUrl = `http://www.omdbapi.com/?apikey=f993b6c&s=${query}`;
        return (0, rxjs_3.firstValueFrom)(this.HttpService.get(apiUrl)
            .pipe((0, rxjs_1.map)(response => response.data), (0, rxjs_1.catchError)(error => {
            console.error('Error querying external API:', error.message);
            return (0, rxjs_2.throwError)(() => new Error('Failed to fetch movie data'));
        })));
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SearchService);
//# sourceMappingURL=search.service.js.map