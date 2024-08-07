import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { forkJoin, Observable,of } from 'rxjs';
import { map,mergeMap } from 'rxjs/operators';
import { Yeoman } from './yeoman.service';
/* import { AuthRESTService } from "./auth-rest.service";
 */import { CategoryInterface } from './global.service';
 export interface PropertiesInterface{
}
 export interface RequestInterface{
}
export interface UserInterface {
}
export interface ColorInterface {
}export interface BrandInterface {
}
export interface OrderInterface {
}
export interface PartInterface {
}
export interface ClientInterface {
}
export interface PostInterface {
}
export interface DistInterface {
}
export interface ProductInterface {
}
export interface CarInterface {
}
export interface MemberInterface {
}
export interface RubroInterfaces {

}

export interface CardInterface {
	id?:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
	//ticket: Observable<any>;
	private baseUrl = 'https://db.buckapi.com:8090/api';
	private apiUrl = 'https://db.buckapi.com:8090/api/collections/tdProperties/records'; // Asegúrate de que esta URL esté configurada correctamente
	url:any;
	cards:any;
	orders:any;
	clients:any;
	dists:any;
	client:any;
	chat:any;
	messages:any;
	chats:any;
	cars:any;
	parts:any;
	branch:any;
	cierre:any;
	serial:any;
	transactions:any;
  	constructor(
	  	// public butler:Butler, 
		public yeoman: Yeoman,
/*   		private AuthRESTService:AuthRESTService,
 */ 	 	private http: HttpClient
  	) {
		}
  	headers : HttpHeaders = new HttpHeaders({  		
		  "Content-Type":"application/json"	
	});

	deleteP(id: string): Observable<any> {
		const url = `${this.apiUrl}/${id}`;
		return this.http.delete(url);
	  }
	  getProperty(id: string): Observable<any> {
		const url = `${this.apiUrl}/api/collections/tdProperties/records/${id}`;
		return this.http.get(url).pipe(
		  map((data: any) => {
			console.log('Datos recibidos del servidor:', data);
			return data;
		  })
		);
	  }
	 
	getAllCategory() {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/tdCategories/records';
		return this.http.get(url_api);
	  }
	
	getAllProperties(){
		const url_api = this.yeoman.origin.restUrl+'/api/collections/tdProperties/records';
		return this.http.get(url_api);
	}
	getAllTestimonials(){
		const url_api = this.yeoman.origin.restUrl+'/api/testimonials';
		return this.http.get(url_api);
	}
	getAllIntegrations(){
		const url_api = this.yeoman.origin.restUrl+'/api/integrations';
		return this.http.get(url_api);
	}
	getClients() {
		const url_api = this.yeoman.origin.restUrl+'/api/collections/svbProducts/records';
		return this.http.get(url_api);
	}
	getProduct(id: string){
		const url_api = this.yeoman.origin.restUrl+`/api/products/${id}`;
		return this.http.get(url_api);
	}
	getAllPosts(){
		const url_api = this.yeoman.origin.restUrl+'/api/posts';
		return this.http.get(url_api);
	}
	/* deleteProduct(id: string){
		const token = this.AuthRESTService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/products/${id}/?access_token$={token}`;
		return this.http
		.delete<PartInterface>(url_api, {headers: this.headers})
		.pipe(map(data => data));
	}
	deleteCategory(id: string){
		const token = this.AuthRESTService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/products/${id}/?access_token$={token}`;
		return this.http
		.delete<PartInterface>(url_api, {headers: this.headers})
		.pipe(map(data => data));
	
	} */
	
	savePost(post :PostInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/posts';
		return this.http
		.post<PostInterface>(url_api, post)
		.pipe(map(data => data));
	}
	saveTestimony(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/testimonials';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	saveProduct(product :ProductInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/products';
		return this.http
		.post<ProductInterface>(url_api, product)
		.pipe(map(data => data));
	}

	saveClient(client: ClientInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/svbProducts/records';
		return this.http.post<ClientInterface>(url_api, client).pipe(
		  map(data => data)
		);
	  }
	  
	  saveColor(color: ColorInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/svbColors/records';
		return this.http.post<ColorInterface>(url_api, color).pipe(
		  map(data => data)
		);
	  }
	  saveBrand( brand: BrandInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/svbBrands/records';
		return this.http.post<BrandInterface>(url_api, brand).pipe(
		  map(data => data)
		);
	  }
	  saveCategory( category: CategoryInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/svbCategories/records';
		return this.http.post<CategoryInterface>(url_api, category).pipe(
		  map(data => data)
		);
	  }
      saveRequest( request: RequestInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/formsLegalesRequests/records';
		return this.http.post<RequestInterface>(url_api, request).pipe(
		  map(data => data)
		);
	  }
	  saveProperties( properties: PropertiesInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/tdProperties/records';
		return this.http.post<PropertiesInterface>(url_api, properties).pipe(
		  map(data => data)
		);
	  }
	  sendmessage( properties: PropertiesInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/tdmessage/records';
		return this.http.post<PropertiesInterface>(url_api, properties).pipe(
		  map(data => data)
		);
	  }
	  updateProperties(properties: any, id: string): Observable<any> {
		// Construir la URL de la solicitud
		const url = `https://db.buckapi.com:8090/api/collections/tdProperties/records/${id}`;
	
		// Realizar la solicitud PATCH para actualizar el registro
		return this.http.patch(url, properties).pipe(
		  map(response => response)
		);
	  }
	  
	  
	saveModules(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/modules';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	saveIntegrations(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/integrations';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	// saveCategory(client :ClientInterface){
	// 	const url_api=	this.yeoman.origin.restUrl+'/api/categories';
	// 	return this.http
	// 	.post<ClientInterface>(url_api, client)
	// 	.pipe(map(data => data));
	// }
	saveFaqs(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/faqs';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	

	deleteProperty(id: string) {
		const url_api = `${this.yeoman.origin.restUrl}/api/collections/tdProperties/records/${id}`;
			return this.http.delete<PropertiesInterface>(url_api).pipe(map((data) => data));
		  }
	  
		 /*  deleteProperty(id: string): Observable<PropertiesInterface> {
			const url_api = `${this.restUrl}/${id}`;
			console.log('DELETE URL:', url_api); // Log para verificar la URL completa
			return this.http.delete<PropertiesInterface>(url_api).pipe(
			  map(data => data)
			);
		  } */
	
	updateRubro(car :RubroInterfaces,  id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/categories`;
		return this.http
		.put<RubroInterfaces>(url_api, car)
		.pipe(map(data => data));
	}
	updateColor(colorData: any, id: string): Observable<any> {
		const url = `https://db.buckapi.com:8090/api/collections/svbConfig/records/${id}`;
		return this.http.patch(url, colorData).pipe(
		  map(response => response)
		);
	  }
	  updateRecord(recordId: string, data: any): Observable<any> {
		const url = `${this.baseUrl}/collections/svbConfig/records/${recordId}`;
		return this.http.patch<any>(url, data);
	  }
	productUpdate(clientData: any, id: string): Observable<any> {
		// Construir la URL de la solicitud
		const url = `https://db.buckapi.com:8090/api/collections/svbProducts/records/${id}`;
	
		// Realizar la solicitud PATCH para actualizar el registro
		return this.http.patch(url, clientData).pipe(
		  map(response => response)
		);
	  }
	  
	testimonyUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/testimonials/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	integrationsUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/integrations/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	modulesUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/modules/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	productsUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/products/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	categoryUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/categories/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	faqsUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/faqs/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}

}