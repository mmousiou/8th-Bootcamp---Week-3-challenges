public with sharing class CtrlPokemon {
    @AuraEnabled
    public static Map<String,Object> retrievePokemon (String pokemonName){
        try {
            Map<String,Object> results = new Map<String,Object>();
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
            req.setMethod('GET');
            Http http = new Http();
            HTTPResponse res = http.send(req);
            System.debug(res.getBody());
            System.debug(res.getStatusCode());
            if (res.getStatusCode() == 200) {
                results = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
            }
            results.put('statusCode', res.getStatusCode());
            return results;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}