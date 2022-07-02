// click searchButton on pressing enter
let inputBox = document.getElementById("searchWord");
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});

function steSearch() {

    // clear table each time function is called
    document.getElementById("tablediv").innerHTML = "";

    // store input from searchWord in a variable as lowercase
    let input = inputBox.value.toLowerCase();

    if (input != "") {

        // create table and header
        createTable();

        // fetch JSON file and create table body
        createBody();

        // check if no words have been found
        notFound(input);

    }

    function createTable() {

        // array of table headers
        var header = ["Word", "Approved", "Part of speech", "Approved meaning/ alternatives", "Approved example", "Not approved example"];

        let table = document.createElement("table");
        table.setAttribute("id", "table");
        document.getElementById("tablediv").appendChild(table);

        // create table header
        let thead = document.createElement("thead");
        table.appendChild(thead);
        let headrow = document.createElement("tr");
        thead.appendChild(headrow);

        // loop through header array to create table headers
        for (j = 0; j < header.length; j++) {
            let th = document.createElement("th");
            th.innerHTML = header[j];
            th.classList.add("tableHead");
            headrow.appendChild(th);
        }

        // create table body
        let tbody = document.createElement("tbody");
        tbody.setAttribute("id", "tbody");
        table.appendChild(tbody);

        return table;
    }

    function createBody() {
        fetch("steTerm.json")
            .then(response => {
                return response.json();
            })
            .then(ste => {

                // search for matching word and create result table row
                for (i = 0; i < ste.length; i++) {
                    if (ste[i].word.includes(input)) {

                        let trow = document.createElement("tr");
                        document.getElementById("tbody").appendChild(trow);

                        var entry = ste[i];

                        for (k in entry) {
                            let td = document.createElement("td");

                            // set id to the key (k)
                            td.classList.add(k);

                            // if the key is "word", create a hyperlink to dictionary.com entry
                            if (td.className == "word") {
                                let a = document.createElement('a');
                                a.href = "https://www.dictionary.com/browse/" + entry[k];
                                a.target = "_blank";
                                a.innerText = entry[k];
                                td.appendChild(a);
                            } else
                                td.innerHTML = entry[k];

                            // if statement to check if word is approved
                            if (ste[i].approved) {
                                td.classList.add("wordApproved");
                            } else
                                td.classList.add("wordBanned");

                            trow.appendChild(td);
                        }


                    }
                }
            });
    }

    function notFound(input) {
        let wordFound = document.getElementsByClassName('word').length > 0;
        if (wordFound){
            document.getElementById("notFound").innerHTML = wordFound;
            // caps(input) + " is not found in the terminology database. Please enter another word.";
        }

    }

    function caps(input){
        return input.charAt[0].toUpperCase() + input.slice[1];
    }

}