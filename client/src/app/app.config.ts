import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

export class AppConfig {
    constructor(@Inject(DOCUMENT) private document: any) { 
        this.apiPort = 7080;
        this.apiUrl = this.document.location.origin + '/api/v1';
    }

    public readonly apiUrl : string;
    public readonly apiPort : number;
};
