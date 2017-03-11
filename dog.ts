export class Dog {
	constructor(public name:string){
		
	}
	bark():void{
		console.log("name is: " + this.name);
	}
}