public without sharing class OpportunityScoring {
  @AuraEnabled
  public static Integer calculateOpportunityScore(Id opportunityId) {
    Opportunity opportunity = [
      SELECT AccountId, Total_Amount__c
      FROM Opportunity
      WHERE Id = :opportunityId
    ];
    AggregateResult opportunities = [
      SELECT count(Id) activeOpps
      FROM Opportunity
      WHERE AccountId = :opportunity.AccountId AND StageName = 'Closed Won'
    ][0];

    Integer closedWonOpportunities = (Integer) opportunities.get('activeOpps');
    Decimal totalAmount = (Decimal) opportunity.Total_Amount__c;

    Integer score = 0;

    // Calculate score based on active opportunities
    if (closedWonOpportunities >= 1 && closedWonOpportunities <= 5) {
      score += 1;
    } else if (closedWonOpportunities >= 6 && closedWonOpportunities <= 10) {
      score += 2;
    } else if (closedWonOpportunities >= 11) {
      score += 3;
    }

    // Calculate score based on total amount
    if (totalAmount > 0 && totalAmount < 10000) {
      score += 1;
    } else if (totalAmount >= 10000) {
      score += 2;
    }

    return score;
  }
  @AuraEnabled(cacheable=true)
  public static List<OpportunityProduct__c> returnOpportunityProducts(
    Id AccountId
  ) {
    List<OpportunityProduct__c> oppProductList = [
      SELECT
        Id,
        Product__c,
        Name,
        Price__c,
        Discount__c,
        CreatedDate,
        Product_Type__c
      FROM OpportunityProduct__c
      WHERE Opportunity__r.AccountId = :AccountId
    ];
    return oppProductList;
  }

  @AuraEnabled
  public static String getOppId(Id AccountId) {
    String oppId = [SELECT Id FROM Opportunity WHERE AccountId = :AccountId].Id;
    return oppId;
  }
  @AuraEnabled
  public static Integer getNumberOfCases(Id AccountId) {
    List<Case> totalCases = [SELECT Id FROM Case WHERE AccountId = :AccountId];
    return totalCases.size();
  }
}
