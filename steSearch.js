function steSearch() {

    document.getElementById("tablediv").innerHTML = "";

    // array of table headers
    var header = ["Word", "Approved", "Part of speech", "Approved meaning/ alternatives", "Approved example", "Not approved example"];
    
    // click searchButton on pressing enter
    let inputBox = document.getElementById("searchWord");
    inputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          document.getElementById("searchButton").click();
        }
      });

    // store input from searchWord in a variable 
    let input = inputBox.value;

    if (input != "") {
      
        // create table
        let table = document.createElement("table");
        table.classList.add("TableStyle-Normal");
        document.getElementById("tablediv").appendChild(table);

        // create table header
        let thead = document.createElement("thead");
        table.appendChild(thead);
        let headrow = document.createElement("tr");
        headrow.classList.add("TableStyle-Normal-Head-Header1")
        thead.appendChild(headrow);

        // loop through header array to create table headers
        for (j = 0; j < header.length; j++){
            let th = document.createElement("th");
            th.innerHTML = header[j];
            th.classList.add("TableStyle-Normal-HeadE-Column1-Header1")
            headrow.appendChild(th);
        }

        // create table body
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // fetch JSON file of STE terms.
        fetch("./steTerm.json")
            .then(response => {
                return response.json();
            })
            .then(ste => {

                // search for matching word and create result table row
                for (i = 0; i < ste.length; i++) {
                    if(ste[i].word.includes(input)){

                        let trow = document.createElement("tr");
                        trow.classList.add("TableStyle-Normal-Body-Body1");
                        tbody.appendChild(trow);

                        var entry = ste[i];

                        let keys = Object.keys(ste[i]);

                        for (k in entry) {
                            let td = document.createElement("td");
                            td.innerHTML = entry[k];

                                // if statement to check if word is approved
                                if(ste[i].approved){
                                    td.classList.add("wordApproved");
                                } else td.classList.add("wordBanned");

                            td.classList.add("TableStyle-Normal-BodyE-Column1-Body1");

                            trow.appendChild(td);
                        }

                        
                    } else document.getElementById("notFound").innerHTML = input + " is not found in the terminology database. Please enter another word."
                }
            });
            }
        }