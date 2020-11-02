"use strict";

var adressenDAO = AdressenDAO.gibAdresseDAO();

window.onfocus = function (evt) {
	var table = document.getElementById("adressenTabelle");
	
	console.log("table = " + table);
	if (table == null) { // passiert nur, wenn wir in anderem Tab sind...
		return;
	}
	
	if (evt.type == 'focus') {		
		console.log('focus');
		belegeAdressenTabelle();
	}			
};

/*
 * Handler für Suchdialog
 */
function neueAdresseAnlegen() { 
	window.open("NeueAdresse.html?mode=new");
}

function bearbeiteAdresse(edit_button) { 
	var url = "NeueAdresse.html?mode=edit";
	
	try {
		var row = edit_button.parentNode.parentNode;
		
		url += "&id=" + row.cells[0].innerHTML;
		url += "&name=" + row.cells[1].innerHTML;
		url += "&email=" + row.cells[2].innerHTML;
		url += "&ort=" + row.cells[3].innerHTML;
		url += "&plz=" + row.cells[4].innerHTML;
		url += "&strasse=" + row.cells[5].innerHTML;
	    window.open(encodeURI(url));
 	} catch (error) {
 		alert(error);
 	}
}

function loescheAdresse(buttonWidget) {
    var index = buttonWidget.parentNode.parentNode.rowIndex;
	var id = Number(buttonWidget.parentNode.parentNode.cells[0].innerHTML);

    adressenDAO.loescheAdresse(id);
    document.getElementById('adressenTabelle').deleteRow(index);
}

/*
 * Hilfsfunktionen für Suchdialog
 */
function belegeZeile(table, adresse) {
	console.log("belegeZeile: adresse = " + adresse.toString());

	var tr = table.insertRow(1); // Überschrift überspringen	
	var td  = tr.insertCell(0);
	
   	var inhalt  = document.createTextNode(adresse.id);
   	td.appendChild(inhalt);
   	td.hidden = "true";
   	
	td  = tr.insertCell(1);
   	inhalt = document.createTextNode(adresse.name);
   	td.appendChild(inhalt);

	// *** (5) ***

	td = tr.insertCell(2);
	inhalt = document.createTextNode(adresse.email)
	td.appendChild(inhalt);

	td = tr.insertCell(3);
	inhalt = document.createTextNode(adresse.ort)
	td.appendChild(inhalt);

	td = tr.insertCell(4);
	inhalt = document.createTextNode(adresse.plz)
	td.appendChild(inhalt);

	td = tr.insertCell(5);
	inhalt = document.createTextNode(adresse.strasse)
	td.appendChild(inhalt);


	// edit button
	td = tr.insertCell(6);
	var edit_button = document.createElement('button');
	edit_button.onclick = function() {
		bearbeiteAdresse(this);
	};
	var edit_image = document.createElement('img');
	edit_image.src = "images/editIcon.jpg";
	edit_image.width = "15";
	edit_image.height = "15";
	edit_button.appendChild(edit_image);
	td.appendChild(edit_button);
	// delete button

	// *** (6) ***
	var del_button = document.createElement('button');
	del_button.onclick = function() {
		loescheAdresse(this);
	}

	var del_image = document.createElement('img');
	del_image.src = "images/trashIcon.jpg";
	del_image.width = "15";
	del_image.height = "15";
	del_button.appendChild(del_image);
	td.appendChild(del_button);

}

function belegeAdressenTabelle() {
	try {
		console.log("belegeAdressenTabelle");
	
		var table = document.getElementById("adressenTabelle");
		var adressen = adressenDAO.findeZuFilterUndSortiere(
			document.getElementById('name').value,
			document.getElementById('ort').value,
			document.getElementById('sortierung').value);
		var i;

		while (table.rows.length > 1) {
			table.deleteRow(1);
		}
		for (i = 0; i < adressen.length; ++i) {
			belegeZeile(table, adressen[i]);
		}
	} catch (error) {
		console.log(error);
		alert(error);
	}
}

/*
 * Handler für Dialog zum Anlegen/Bearbeiten von Adressen
 */
function adresseBearbeitenAbbrechen() {
	window.close();
}

function speichereAdresse() {
	var id = document.getElementById("id").value;
	var adresse = new AdresseDTO(id,
			document.getElementById("name").value,
			document.getElementById("email").value,
			document.getElementById("ort").value,
			document.getElementById("plz").value,
			document.getElementById("strasse").value);
    
    try {
    	adresse.pruefe();
    	if (id == -1) {
    		adressenDAO.neueAdresse(adresse);    		
    	} else {
    		adressenDAO.aktualisiereAdresse(adresse);    		
    	}    	
    	window.close();
    } catch (errorMsg) {
        alert(errorMsg);
    }
}

/*
 * Hilfsfunktionen für Dialog zum Bearbeiten/Neuanlegen
 */
function initialisiereSeite() {
	var url = decodeURI(window.location.href);
    var urlParts = url.split("?");
    var modeParts = urlParts[1].split("&");
    var newText = "Neue Adresse anlegen";
    var bearbeitenText = "Adresse bearbeiten";
    
    if (modeParts[0] == "mode=new") {
        document.getElementById("title").innerHTML = newText;
        document.getElementById("ueberschrift").innerHTML = newText;
        document.getElementById("id").value="-1";
    } else {
        document.getElementById("title").innerHTML = bearbeitenText;
        document.getElementById("ueberschrift").innerHTML = bearbeitenText;
        document.getElementById("id").value = modeParts[1].split("=")[1];
        document.getElementById("name").readonly = true;
        document.getElementById("name").disabled = true;
        document.getElementById("name").value = modeParts[2].split("=")[1];
        document.getElementById("email").value = modeParts[3].split("=")[1];
        document.getElementById("ort").value = modeParts[4].split("=")[1];
        document.getElementById("plz").value = modeParts[5].split("=")[1];
        document.getElementById("strasse").value = modeParts[6].split("=")[1];
    }
}

