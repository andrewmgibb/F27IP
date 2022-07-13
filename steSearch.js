// click searchButton on pressing enter
let inputBox = document.getElementById("searchWord");
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});

function steSearch() {

    // clear table each time function is called
    document.getElementById("tbody").innerHTML = "";

    // clear not found function
    document.getElementById("notFound").innerHTML = "";

    // store input from searchWord in a variable as lowercase
    let input = inputBox.value.toLowerCase();

    // check for empty input
    if (input != "") {

        // fetch JSON file and create table body
        createBody();        
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

                        // // create table body
                        // let tbody = document.createElement("tbody");
                        // tbody.setAttribute("id", "tbody");
                        // table.appendChild(tbody);

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

                // check if no words have been found and display message. If no words haave been found, there will be no elements with the "word" class
                if (document.getElementsByClassName("word").length == 0){
                    let capsword = String(input).charAt(0).toUpperCase() + String(input).slice(1);
                    document.getElementById("notFound").innerHTML = capsword + " is not found in the terminology database. Please enter another word.";
                }
            });
    }
}