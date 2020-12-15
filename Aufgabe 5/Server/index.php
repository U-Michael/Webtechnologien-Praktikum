<?php
header("Access-Control-Allow-Origin: *");
function __autoload($class_name) {
    include $class_name . '.php';
}

$service = new Service();

function handleCORS($requestType, $url, $body) {
    http_response_code(200);
   header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
   header("Access-Control-Allow-Headers: Pragma, Cache-Control, access-control-expose-headers, content-type");
   header("Access-Control-Allow-Origin: *");
}

// ungültige Anfrage
function badRequest($requestType, $url, $body) {
    http_response_code(400);
   die('Ungültiger Request: '.$requestType.' '.$url.' '.$body);
}

$url = $_REQUEST['_url'];
$requestType = $_SERVER['REQUEST_METHOD'];
//$headers = getallheaders();
$body = file_get_contents('php://input'); 

try {
    if ($requestType === "OPTIONS") { // CORS: OPTIONS request kommt vor eig. request
        handleCORS($requestType, $url, $body);
    } else if ($url === '/benutzer/login' && $requestType === 'POST') {
              login(json_decode($body));
    } else if ($url === '/artikel' && $requestType === 'GET') {
        ladeAlleArtikel();
    } else if (preg_match("/\/kunde\/[0-9]\/warenkorb/", $url) && $requestType === 'GET') {
        getWarenkorb(explode('/', $url)[2]);
    } else if (preg_match("/\/kunde\/[0-9]\/warenkorb/", $url) && $requestType === 'PUT') {
        speichereWarenkorb(explode('/', $url)[2], json_decode($body));
    } else {
        throw new Exception('bad request');
    }
} catch (Exception $e) {
    badRequest($requestType, $url, $body);
}

function getWarenkorb($id){

    global $service;

    echo json_encode($service->getWarenkorb($id));

}

function login($benutzer){
    global $service;
    $kunde = $service->login($benutzer);
    if($kunde != NULL){
        echo json_encode($kunde);
    } else {
        http_response_code(403);
    }

}

function ladeAlleArtikel(){
    global $service;
    echo json_encode($service->ladeAlleArtikel());
}

function speichereWarenkorb($kundeID,$warenkorb){
    global $service;
    if($kundeID == $warenkorb->kundenId){
    echo json_encode($service->speichereWarenkorb($warenkorb));
    } else {
        http_response_code(400);
    }

}
