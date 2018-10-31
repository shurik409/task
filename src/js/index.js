var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Pagination = /** @class */ (function () {
    function Pagination(path, count) {
        this.path = path;
        this.onPage = count;
    }
    Pagination.prototype.start = function () {
        this.json = this.setJson(this.path);
        console.log(JSON.stringify(this.json));
        this.setPageCount(this.json);
        this.pagesList("pagination", this.pageCount);
        for (var _i = 0, _a = this.json; _i < _a.length; _i++) {
            var p = _a[_i];
            console.log(p);
            console.log(this.json.indexOf(p));
            if (this.json.indexOf(p) < this.onPage) {
                this.newDiv("person", p, "pers");
                console.log(p);
            }
        }
        var main_page = document.getElementById("page1");
        main_page.classList.add("paginator_active");
    };
    Pagination.prototype.setJson = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (fetch('src/persons.json', {
                            method: 'GET',
                            mode: 'no-cors',
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(function (resp) { return resp.json(); }))];
                    case 1: return [4 /*yield*/, (_b.sent())];
                    case 2:
                        data = _b.sent();
                        console.log(JSON.stringify(data));
                        _a = this;
                        return [4 /*yield*/, data];
                    case 3:
                        _a.json = _b.sent();
                        console.log(JSON.stringify(this.json));
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Pagination.prototype.setPageCount = function (json) {
        var psLeng = Object.keys(json).length;
        this.pageCount = Math.ceil(psLeng / this.onPage);
    };
    Pagination.prototype.newDiv = function (className, person, parrentClass) {
        var div = document.createElement("div");
        div.className = className;
        div.innerHTML = person.name + " " + person.surname;
        document.getElementById(parrentClass).appendChild(div);
    };
    Pagination.prototype.pagesList = function (pagesClass, count) {
        var page = "";
        for (var i = 0; i < count; i++) {
            page += "<span data-page=" + i * this.onPage + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
        }
        document.getElementById(pagesClass).innerHTML = page;
    };
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
    Pagination.prototype.objectOut = function (event, personClass) {
        var e = event || window.event;
        var target = e.target;
        var id = target.id;
        if (target.tagName.toLowerCase() != "span")
            return;
        var num = (target.innerHTML - 1) * this.onPage;
        var old = document.getElementsByClassName(personClass);
        while (old[0])
            old[0].parentNode.removeChild(old[0]);
        for (var _i = 0, _a = this.json; _i < _a.length; _i++) {
            var p = _a[_i];
            if (this.json.indexOf(p) > num - 1 && this.json.indexOf(p) < num + this.onPage) {
                this.newDiv("person", p, "pers");
            }
        }
    };
    return Pagination;
}());
var pages = new Pagination('src/persons.json', 5);
pages.start();
function page(event) {
    pages.objectOut(event, "person");
}
