import { equal } from "assert";

class Pagination{
    private pageCount: number;
    
    private json : any;
    private pageOn : HTMLElement;

    constructor( private path : string, private onPage : number){
    }

    public async start() : Promise<any>{
        this.json = await this.setJson(this.path);
        this.setPageCount(this.json);
        this.pagesList("pagination", this.pageCount);

        for(let p of this.json){
            if(this.json.indexOf(p) < this.onPage){
                this.newDiv("person", p, "pers");
            }
        }

        this.pageOn = document.getElementById("page1");
        this.pageOn.classList.add("pagination_active");
    }


    private setJson(path : string) : Promise<any> {
        let data : any = fetch(path)
        .then(resp => resp.json() )
        .catch(error => console.log(`Error: ${error}`))
        return data;
    }


    private setPageCount(json : any) : void{
        let psLeng : number = Object.keys(json).length;
        
        this.pageCount = Math.ceil(psLeng / this.onPage); 
    }

    private newDiv(className : string, person : any, parrentClass : string) : void {
        
        let div : HTMLDivElement = document.createElement("div");
        div.className = className;
        div.innerHTML = person.name + " " + person.surname; 
        document.getElementById(parrentClass).appendChild(div);
    }

    private pagesList(pagesClass : string, count : number) : void{
        let page : string = ""; 
        for(let i = 0; i < count; i++){
            page += `<span data-page = ${i * this.onPage} 
            id=\"page${(i + 1)}\"> ${(i + 1)} </span>`;
    
        }
        document.getElementById(pagesClass).innerHTML = page;
    }


    public objectOut(event : any, personClass : string) : void {


        let e : any = event || window.event;
        let target : any = e.target;
        let id : any = target.id;

        if (target.tagName.toLowerCase() != "span") return;

        let num : number = (target.innerHTML - 1) * this.onPage;

        let old : HTMLCollectionOf<Element> = document.getElementsByClassName(personClass);
        
        while(old[0])
            old[0].parentNode.removeChild(old[0]);

        for(let p of this.json){
            if(this.json.indexOf(p) > num - 1 && this.json.indexOf(p) < num + this.onPage){
                this.newDiv("person", p, "pers");
            }   
        }
        
        this.pageOn.classList.remove("pagination_active");
        this.pageOn = document.getElementById(id);
        this.pageOn.classList.add("pagination_active");
    }

    

}

let pages : Pagination = new Pagination('src/persons.json',5);
pages.start();
function page(event : any) : void{
    pages.objectOut(event, "person");
}

let ar : number[] = [1,0,1,0,1,1,0,1,1,1,0,1,0,1,1,0];

let count : number[] =[]; 

let first : number;
let again : boolean = true;

for(let i = 0; i < ar.length; i++){
    console.log(count + " " + i + " " + ar[i]);
    if(ar[i] >= 1){
        if(!again){
            if(i<( ar.length - 1) && ar[i+1] == 1){
                count[count.length-1] ++;
            }
            else if( i<( ar.length-1) && ar[i+1] != 1){
                count[count.length-1] ++;
                again = true;
            }

        }
        if(again){
            count.push(0);
            if(i<( ar.length - 1) && ar[i+1] == 1){
                count[count.length-1] ++;
            }
            else if( i<( ar.length - 1) && ar[i+1] != 1){
                again = true;
            }
            again = false;
        }
    }
    

}

let max = count.sort()[count.length];

console.log(count);
