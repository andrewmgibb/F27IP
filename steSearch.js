// click searchButton on pressing enter
let inputBox = document.getElementById("searchWord");
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
    });

function steSearch() {

    // clear table each time function is called
    document.getElementById("tablediv").innerHTML = "";

    // array of table headers
    var header = ["Word", "Approved", "Part of speech", "Approved meaning/ alternatives", "Approved example", "Not approved example"];

    // store input from searchWord in a variable 
    let input = inputBox.value;

    if (input != "") {
      
        // create table
        let table = document.createElement("table");
        document.getElementById("tablediv").appendChild(table);

        // create table header
        let thead = document.createElement("thead");
        table.appendChild(thead);
        let headrow = document.createElement("tr");
        thead.appendChild(headrow);

        // loop through header array to create table headers
        for (j = 0; j < header.length; j++){
            let th = document.createElement("th");
            th.innerHTML = header[j];
            th.classList.add("tableHead");
            headrow.appendChild(th);
        }

        // create table body
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // fetch JSON file of STE terms.
        fetch("steTerm.json")
            .then(response => {
                return response.json();
            })
            .then(ste => {

                // search for matching word and create result table row
                for (i = 0; i < ste.length; i++) {
                    if(ste[i].word.includes(input)){

                        let trow = document.createElement("tr");
                        tbody.appendChild(trow);

                        var entry = ste[i];

                        for (k in entry) {
                            let td = document.createElement("td");

                            // set id to the key (k)
                            td.setAttribute("id", k);

                            // if the key is "word", create a hyperlink to dictionary.com
                            if (td.id == "word") {
                                let a = document.createElement('a');
                                a.href = "https://www.dictionary.com/browse/" + entry[k];
                                a.innerText = entry[k];
                                td.appendChild(a);
                            } else td.innerHTML = entry[k];

                                // if statement to check if word is approved
                                if(ste[i].approved){
                                    td.classList.add("wordApproved");
                                } else td.classList.add("wordBanned");

                            trow.appendChild(td);
                        }

                        
                    } else document.getElementById("notFound").innerHTML = input + " is not found in the terminology database. Please enter another word."
                }
            });
            }
        }