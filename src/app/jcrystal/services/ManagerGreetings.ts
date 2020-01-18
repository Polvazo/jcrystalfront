import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs';
import {AppConfiguration} from "../../utils/app-configuration";
import { NetworkBase, defaultOnError, TipoError, RequestError } from '../services/NetworkBase';
export class ManagerGreetings{
	/**
	* /api/greetings/greetings
	**/
	static greetings(base : NetworkBase,nombreUsuario:string,onSuccess: (r:string)=> void ,onError : (error : RequestError)=>void = defaultOnError){
		let params:string = null;
		let headers =  new HttpHeaders({'Content-Type': 'application/json;charset='+document.characterSet});
		let ruta:string = "/api/greetings/greetings";
		if (base.onError) {
			onError = base.onError;
		}
		if(AppConfiguration.DEBUG)console.log("POST "+ruta);
		let body: any = {};
		if (nombreUsuario) {
			body.nombreUsuario= nombreUsuario;
		}
		if (params) {
			ruta+=params;
		}
		base.http.post(ruta, JSON.stringify(body), {responseType : 'json', headers : headers}).subscribe((js:any) =>{
			if (js.success === 1) {
				onSuccess(js.r as string)
			}
			else if (js.success === 2) {
				onError(new RequestError(js.code, js.mensaje, TipoError.ERROR));
			}
			else if (js.success === 3) {
				onError(new RequestError(-1, js.mensaje, TipoError.UNAUTHORIZED));
			}
			else{
				onError(new RequestError(-1, js.mensaje, TipoError.SERVER_ERROR));
			}
		}, error =>{
			console.log(error);
			onError(new RequestError(-1, error.statusText, TipoError.SERVER_ERROR));
		});
	}
}
