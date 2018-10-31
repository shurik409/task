
let persons =" ";
fetch('src/persons.json', {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      "Content-Type": "application/json"
    }
  })
.then( resp => resp.json() )
.then( json => {
    console.log(JSON.stringify(json) + "SSS");
    pagin(json);
}); 

function pagin(persons){

    let psLeng = Object.keys(persons).length;
    console.log(psLeng);
    let onPage = 5;
    let cnt_page = Math.ceil(psLeng / onPage); 

    console.log(cnt_page);



    for(p in persons){
        if(p<onPage){
            let div = document.createElement("div");

            div.className = "person";
            div.innerHTML = persons[p].name + " " + persons[p].surname;
            console.log(JSON.stringify(persons[p].name));
            document.getElementById("pers").appendChild(div);
        }
    }

    let page = "" 
    for(let i = 0; i < cnt_page; i++){
        page += "<span data-page=" + i * onPage + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";

    }
    document.getElementById("pagination").innerHTML = page;


    let main_page = document.getElementById("page1");
    main_page.classList.add("paginator_active");

    window.page = function(event) {
        let e = event || window.event;
        let target = e.target;
        let id = target.id;
        console.log(target + " " + id);


        if (target.tagName.toLowerCase() != "span") return;

        let num = (target.innerHTML - 1) * onPage;
        console.log(num);

        old = document.getElementsByClassName("person");
        console.log(old.length);
        while(old[0])
            old[0].parentNode.removeChild(old[0]);

        for(p in persons){
            if(p>num-1 && p<num+onPage){
                let div = document.createElement("div");
        
                div.className = "person";
                div.innerHTML = persons[p].name + " " + persons[p].surname;
                console.log(JSON.stringify(persons[p].name));
                document.getElementById("pers").appendChild(div);
            }
        }
        main_page.classList.remove("pagination_active");
        main_page = document.getElementById(id);
        main_page.classList.add("pagination_active");
        
    }

}