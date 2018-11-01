var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Pagination {
    constructor(path, onPage) {
        this.path = path;
        this.onPage = onPage;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.json = yield this.setJson(this.path);
            this.setPageCount(this.json);
            this.pagesList("pagination", this.pageCount);
            for (let p of this.json) {
                if (this.json.indexOf(p) < this.onPage) {
                    this.newDiv("person", p, "pers");
                }
            }
            this.pageOn = document.getElementById("page1");
            this.pageOn.classList.add("pagination_active");
        });
    }
    setJson(path) {
        let data = fetch(path)
            .then(resp => resp.json())
            .catch(error => console.log(`Error: ${error}`));
        return data;
    }
    setPageCount(json) {
        let psLeng = Object.keys(json).length;
        this.pageCount = Math.ceil(psLeng / this.onPage);
    }
    newDiv(className, person, parrentClass) {
        let div = document.createElement("div");
        div.className = className;
        div.innerHTML = person.name + " " + person.surname;
        document.getElementById(parrentClass).appendChild(div);
    }
    pagesList(pagesClass, count) {
        let page = "";
        for (let i = 0; i < count; i++) {
            page += `<span data-page = ${i * this.onPage} 
            id=\"page${(i + 1)}\"> ${(i + 1)} </span>`;
        }
        document.getElementById(pagesClass).innerHTML = page;
    }
    objectOut(event, personClass) {
        let e = event || window.event;
        let target = e.target;
        let id = target.id;
        if (target.tagName.toLowerCase() != "span")
            return;
        let num = (target.innerHTML - 1) * this.onPage;
        let old = document.getElementsByClassName(personClass);
        while (old[0])
            old[0].parentNode.removeChild(old[0]);
        for (let p of this.json) {
            if (this.json.indexOf(p) > num - 1 && this.json.indexOf(p) < num + this.onPage) {
                this.newDiv("person", p, "pers");
            }
        }
        this.pageOn.classList.remove("pagination_active");
        this.pageOn = document.getElementById(id);
        this.pageOn.classList.add("pagination_active");
    }
}
let pages = new Pagination('src/persons.json', 5);
pages.start();
function page(event) {
    pages.objectOut(event, "person");
}
//# sourceMappingURL=index.js.map