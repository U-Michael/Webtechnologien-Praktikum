<?php
class Service{

   /* private $dao;

    public function __construct(){
        $this->dao = new DAO();
    }*/

    public function getWarenkorb($id){
        $dao = new DAO();
       return $dao->findeWarenkorbZuKunde($id);
    }

    public function login($benutzer){
        $dao = new DAO();
        $kunde = $dao->findeKundeZuBenutzername($benutzer->name);

        if ($kunde != NULL && $kunde->passwort == $benutzer->passwort){
            return $kunde;
        } else {
            return NULL;
        }
    }

    public function ladeAlleArtikel(){
        $dao = new DAO();
        return $dao->findeAlleArtikel();
    }

    public function speichereWarenkorb($warenkorb){
        $dao = new DAO();
        $dao->speichereWarenkorb($warenkorb);
        return $warenkorb;
    }

}

?>