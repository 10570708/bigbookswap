/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* Toastr - Toastr Servic Implementation
*
*/
import { InjectionToken } from "@angular/core";

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
    
    success (msg: string, title?: string): void;
    info (msg: string, title?: string): void;
    warning (msg: string, title?: string): void;
    error (msg: string, title?: string): void;
    
}

