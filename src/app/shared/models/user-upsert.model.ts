export class UserUpsertModel{
    constructor(public name:string,public adress:String,public city:string,public country:string,
        public idNumber:number,public mobile:string,public mail:string, public username:string,
        public password:string, public objectId:number,public vatnumber:number){}
}