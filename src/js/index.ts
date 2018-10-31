

class Pagination{
    private onPage: number;
    private pageCount: number;
    private path : string;
    private json : any;

    constructor(path : string, count : number){
        this.path = path;
        this.onPage = count;
    }

    public start() : void{
        this.json = this.setJson(this.path);
        console.log(JSON.stringify(this.json));
        this.setPageCount(this.json);
        this.pagesList("pagination", this.pageCount);

        for(let p of this.json){
            console.log(p);
            console.log(this.json.indexOf(p));
            if(this.json.indexOf(p) < this.onPage){
                this.newDiv("person", p, "pers");
                console.log(p);
            }
        }

        let main_page : HTMLElement = document.getElementById("page1");
        main_page.classList.add("paginator_active");  
    }


    private async setJson(path : string) : Promise<any> {
        let data : any = await (await (fetch('src/persons.json', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              "Content-Type": "application/json"
            }
          })
        .then( resp => resp.json() )
        ));
        console.log(JSON.stringify(data));
        this.json = await data;
        console.log(JSON.stringify(this.json));
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
            page += "<span data-page=" + i * this.onPage + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
    
        }
        document.getElementById(pagesClass).innerHTML = page;
    }

    /*nextPage(event : any, personClass : string){
        fetch(this.path, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              "Content-Type": "application/json"
            }
          })
        .then( resp => resp.json() )
        .then( json => {
            this.objectOut(event, personClass, json)
        });
    }*/

    public objectOut(event : any, personClass : string) : void{


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

    }
}

let pages : Pagination = new Pagination('src/persons.json',5);
pages.start();
function page(event){
    pages.objectOut(event, "person");
}