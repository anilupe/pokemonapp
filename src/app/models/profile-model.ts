export interface Profile{
    name:string,
    age:number,
    hobby:string,
    dni:string
   }

   export interface ProfileComplete{
    name:string,
    age:number,
    hobby:string[],
    dni:string
   }

   export enum typeUser{
    adult,
    younger,
    none
   }