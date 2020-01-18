import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from './error.services';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable()
export class DefaultOnError{
	constructor(private _r: Router, private _e:ErrorService){
	}
	onError = (error : RequestError):void =>{
		if (error.tipoError == TipoError.UNAUTHORIZED) {
			this._r.navigate(['/login']);
		}
		else{
			console.log(error);
			this._e.announceError(error.mensaje);
		}
	}
}
export interface NetworkBase{
	http:HttpClient;
	onError? : ((error : RequestError)=>void);
}
export enum TipoError{
	/**
	 * Representa un error de la aplicacion, InternalError
	 */
	ERROR = 1,
	/**
	* Representa un error de la conexiÃ³n al servidor, json mal formados, errores HTTP, etc
	*/
	SERVER_ERROR = 2,
	UNAUTHORIZED = 3,
	NO_INTERNET = 4,
	CORS = 5
}
export class RequestError{
	public tipoError : TipoError;
	public mensaje : string;
	public codigo : number;
	constructor(codigo : number = -1, mensaje : string, tipoError : TipoError = TipoError.ERROR){
		this.tipoError = tipoError;
		this.mensaje = mensaje;
		this.codigo = -1;
	}
}
export const defaultOnError = (error : RequestError)=>{
	if (error.tipoError == TipoError.UNAUTHORIZED) {
		window.location.href = '/login';
	}
	else if (error.tipoError == TipoError.SERVER_ERROR) {
		Swal.fire("Error interno del servidor");
	}
	else{
		Swal.fire(error.mensaje);
	}
}
export const alertInfo = (error : string)=>{ Swal.fire(error); }
