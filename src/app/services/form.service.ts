import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { HttpParamsOptions } from "@angular/common/http/src/params";
import { CookieService } from "angular2-cookie/core";

@Injectable({
  providedIn: "root"
})
export class FormService {
  number;
  readonly endpointFormConfirm = environment["endpointFormConfirm"];
  readonly endpointFamliyIdentifiers = environment["endpointFamliyIdentifiers"];
  readonly endpointFormFindSection = environment["endpointFormFindSection"];
  readonly endpointGetFormMember = environment["endpointGetFormMember"];
  readonly endpointInsertUpdateAnswersMember =
    environment["endpointInsertUpdateAnswersMember"];
  readonly endpointFormUpdateSection = environment["endpointFormUpdateSection"];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  public confirmar_envio(credenciales: Object) {
    console.log("Consiguiendo...");
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    //headers = headers.append('Authorization:Bearer ', 'ACCESSTOKEN');
    return this.httpClient.post(`${this.endpointFormConfirm}`, credenciales, {
      headers
    });
  }

  public pedir_cedulas(credenciales: Object) {
    console.log("Consiguiendo cedulas...");
    let headers = new HttpHeaders();
    const httpParams: HttpParamsOptions = {
      fromObject: credenciales
    } as HttpParamsOptions;
    headers = headers.append("Content-Type", "application/json");
    //headers = headers.append('Authorization:Bearer ', 'ACCESSTOKEN');
    return this.httpClient.post(
      `${this.endpointFamliyIdentifiers}`,
      credenciales,
      { headers }
    );
  }

  public conseguir_seccion(credenciales: Object) {
    console.log("Consiguiendo seccion...");
    let headers = new HttpHeaders();
    const httpParams: HttpParamsOptions = {
      fromObject: credenciales
    } as HttpParamsOptions;
    headers = headers.append("Content-Type", "application/json");
    const params = { params: new HttpParams(httpParams), headers: headers };
    //headers = headers.append('Authorization:Bearer ', 'ACCESSTOKEN');
    return this.httpClient.get(`${this.endpointFormFindSection}`, params);
  }

  public pedir_respuestaPersona(credenciales: Object) {
    console.log("Consiguiendo respuestas de la familia...");
    credenciales = {
      CFN: credenciales["CFN"],
      ECN: credenciales["ECN"]
    };
    let headers = new HttpHeaders();
    const httpParams: HttpParamsOptions = {
      fromObject: credenciales
    } as HttpParamsOptions;
    headers = headers.append("Content-Type", "application/json");
    //headers = headers.append('Authorization:Bearer ', 'ACCESSTOKEN');
    return this.httpClient.post(`${this.endpointGetFormMember}`, credenciales, {
      headers
    });
  }

  public actualizar_respuestaFormularioPersona(
    credenciales: Object,
    form: any
  ) {
    console.log("Actualizando respuestas del formulario...");
    credenciales = {
      CFN: credenciales["CFN"],
      ECN: credenciales["ECN"],
      questions: form["questions"]
    };

    console.log("Credenciales");
    console.log(credenciales);
    let headers = new HttpHeaders();
    const httpParams: HttpParamsOptions = {
      fromObject: credenciales
    } as HttpParamsOptions;
    headers = headers.append("Content-Type", "application/json");
    //headers = headers.append('Authorization:Bearer ', 'ACCESSTOKEN');

    return this.httpClient.post(
      `${this.endpointInsertUpdateAnswersMember}`,
      credenciales,
      { headers }
    );
  }

  public actualizar_seccionEspecifica(
    credenciales: Object,
    number: any,
    form: any
  ) {
    console.log("Actualizando respuestas de una seccion...");
    credenciales = {
      CFN: credenciales["CFN"],
      ECN: credenciales["ECN"],
      number: number
    };

    let headers = new HttpHeaders();
    const httpParams: HttpParamsOptions = {
      fromObject: credenciales
    } as HttpParamsOptions;
    headers = headers.append("Content-Type", "application/json");
    const params = { params: new HttpParams(httpParams), headers: headers };
    //headers = headers.append('Authorization:Bearer ', 'ACCESSTOKEN');

    return this.httpClient.put(
      `${this.endpointFormUpdateSection}`,
      form,
      params
    );
  }
}
