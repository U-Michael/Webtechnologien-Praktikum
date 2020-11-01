/*
 * Data Transfer Object für Fachobjekt Adresse
 */
class AdresseDTO  {
	
	constructor(id, name, email, ort, plz, strasse) {
		this._id = id;
		this._name = name;
		this._email = email;
		this._ort = ort;
		this._plz = plz;
		this._strasse = strasse;
	}

	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get email() {
		return this._email;
	}
	get ort() {
		return this._ort;
	}
	get plz() {
		return this._plz;
	}
	get strasse() {
		return this._strasse;
	}
	set id(wert) {
		this._id = wert;
	}
	set name(wert) {
		this._name = wert;
	}
	set email(wert) {
		this._email = wert;
	}
	set ort(wert) {
		this._ort = wert;
	}
	set plz(wert) {
		this._plz = wert;
	}
	set strasse(wert) {
		this._strasse = wert;
	}

	/**
	 * Prüft die Attribute einzeln auf Korrektheit.
	 * Bei einem Fehler wird eine Exception (=Fehlermeldung als String) geworfen.
	 * Beim Aufrufer sollte diese gefangen werden und z.B. an der Benutzeroberfläche als Fehler-
	 * meldung ausgegeben werden.
	 */
	pruefe() {

		if(this.name == ""){
			alert("Der Name darf nicht leer stehen");
		}

		if(this.email =="" || !this.validateEmail(this.email) ){
			alert("Die Email ist leer oder ungültig");
		}

		if(this.plz =="" || this.plz < 0 ){
			alert("Die Postleitzahl ist leer oder ungültig");
		}

		if(this.ort ==""){
			alert("Der Ort darf nicht leer stehen");
		}

		if(this.strasse == ""){
			alert("Die Strasse darf nicht leer stehen");
		}

    }

	/**
	 * Liefert true, falls 'email' eine korrekte E-Mail-Adresse enthält.
	 */
	validateEmail(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	}

    toString() {
    	return "{" + this.id + ", " +
    		this.name + ", " + 
    		this.email + ", " + 
    		this.ort + ", " + 
    		this.plz + ", " + 
    		this.strasse + "}";
    }
}
