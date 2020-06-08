
function reciever() { 
	
// Accesses information from html page. 
// Begins other functions. 
	
	let numRows = (document.getElementById("rowNum").value); 
	let numColumns = (document.getElementById("columnNum").value);
	let numGenerations = (document.getElementById("generationNum").value);

	createTable(numRows, numColumns);

	createDummyTable();

	runGame();

	
}

function createTable(rows, columns) {
	
//Creates new div and table according to user's dimensions. 

	let newDiv = document.createElement("div")
	newDiv.id = "divTable";
	document.body.appendChild(newDiv);

	let table = document.createElement("TABLE");

	table.setAttribute("id", "myTable");
  	newDiv.appendChild(table);

	for (let i = rows - 1; i >= 0; i = i - 1){
		let row = table.insertRow(0);
		for (let j = columns - 1; j >= 0; j = j - 1){
			 let cell = row.insertCell(0);
			
//Gives cell id as which line and column it is locted in. 
			 cell.id = [i, j];
			 cell.innerHTML = "";
			 document.getElementById(cell.id).style.width = `${45/columns}vh`;
			 document.getElementById(cell.id).style.height =`${42/columns}vh`;
			 document.getElementById(cell.id).style.backgroundColor =`white`;
		}

	}

	let tableClick = document.getElementById("myTable");
	
// Directs to onclick function. 

	for (let i = 0; i < tableClick.rows.length; i++) {
       		for (let j = 0; j < tableClick.rows[i].cells.length; j++)
    			 tableClick.rows[i].cells[j].onclick = function () {
           			select(i, j);
      		};
    	}
	
}

function createDummyTable() {
	
//Creates a non-visible dummy table. 
//Serves as the last column to ensure the actual game of life runs smoothely, serves as a buffer zone. 

	let newDiv = (document.getElementById("divTable"));

	let table = document.createElement("TABLE");

	table.setAttribute("id", "dummyTable");
	newDiv.appendChild(table);

	let numColumns = (document.getElementById("columnNum").value);

	let numRows = (document.getElementById("rowNum").value);

	let row = table.insertRow(0);

	for (let i = 0; i < numRows; i ++) {
		let cell = row.insertCell(0);
		cell.id = [i, numColumns];
	}	

	document.getElementById("dummyTable").style.visibility = `hidden`;
	
}

function execute(timeout) {
	
// Takes in an array of whether each cell should be alive or dead, and changes the table accordingly. 
	
	  setTimeout(() => {
		let liveArray = findLive();
		let totalArray = cellBorders();

		for (let i = 0; i < totalArray.length; i++) {
			if (totalArray[i][1] == "live") {
				document.getElementById([totalArray[i][0]]).style.backgroundColor = "black";
			}
			else if (totalArray[i][1] == "die") {

				document.getElementById([totalArray[i][0]]).style.backgroundColor = "white";
			}
		}		
    	}, timeout);
}

function runGame() {
	
// Creates run button user clicks after choosing the squares in table. 
// Directs code to run COnway's game of life. 

	let numGenerations = (document.getElementById("generationNum").value);

	let newerDiv = document.createElement("div")
	newerDiv.id = "divSub";
	document.body.appendChild(newerDiv);

	let button = document.createElement("button");
	button.innerHTML = "Run";

	newerDiv.appendChild(button);
	
// Sets time out so each change has visibl interval to be seen.

	button.addEventListener ("click", function() {

		for (let a = 0; a < numGenerations; a++) {	

			let timeout = a * 1200;

			execute(timeout);
		}
		
	});
}



function cellBorders() {

// Checks how many live cells each cell in the table borders. 
// Determines whether they be alive or not in the following round. 
	
	let numRows = (document.getElementById("rowNum").value); 
	let numColumns = (document.getElementById("columnNum").value);
	let numGenerations = (document.getElementById("generationNum").value);

	let counter = 0;
	let markArray = [];
	let totalArray = [];

	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j <= numColumns; j++) {

			counter = 0;
			markArray = [];			
			
			for (let k = 1; k >= -1; k = k - 1) {
				for (let l = 1; l >= -1; l = l - 1) {

					if (i + k < 0 || j + l < 0) {
						break;
					}

					else if (i + k >= numRows || j + l > numColumns) {
						break;
					}

					if (document.getElementById([i + k, j + l]).style.backgroundColor == "black"){
						counter++;			

					}					
						
				}
			}

			if (document.getElementById([i, j]).style.backgroundColor == "black"){
				counter = counter - 1;
					
				if (counter == 2 || counter == 3) {
					counter = "live";
				} 

				else {
					counter = "die";
				}			

			}

			else if (document.getElementById([i, j]).style.backgroundColor == "white"){
					
				if (counter == 3) {
					counter = "live";
				}
				else {
					counter = "die";
				}			

			}

			else {
				counter = "die";
			}
			
			markArray = [[i, j], counter];
			totalArray.push(markArray);		
		}

	}

	return(totalArray);

}

function select(i, j) {

// Changes cell colour after user clicks cell. 
	
	if (document.getElementById([i, j]).style.backgroundColor == "black") {
	
		document.getElementById([i, j]).style.backgroundColor = "white";

	} 
	
	else {
		document.getElementById([i, j]).style.backgroundColor = "black";
	}

	
}


function findLive() {
	
// Produces an array of live cells for reference purposes. 
	
	let table = document.getElementById("myTable");
	let liveArray = [];

	for (let i = 0; i < document.getElementById("myTable").rows.length; i++) {

		for (let j = 0; j < document.getElementById("myTable").rows[0].cells.length; j++) {

			if (document.getElementById([i, j]).style.backgroundColor == "black") {
				liveArray.push([i, j]);

			}			

		}
	}

	return(liveArray);

}

function progressionOrganizer(){

}

