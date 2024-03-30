import { LightningElement, wire, api } from "lwc";
import { subscribe, MessageContext } from "lightning/messageService";
import REFRESH_CHANNEL from "@salesforce/messageChannel/Record_Selected__c";
import getOpportunityScore from "@salesforce/apex/OpportunityScoring.calculateOpportunityScore";
import getOppId from "@salesforce/apex/OpportunityScoring.getOppId";
import getNumberOfCases from "@salesforce/apex/OpportunityScoring.getNumberOfCases";

export default class LwcOpportynityScore extends LightningElement {
  @api recordId;
  message;
  score;
  numberOfCases;
  customClass = "cold";

  @wire(MessageContext) messageContext;

  async connectedCallback() {
    const oppId = await getOppId({ AccountId: this.recordId });
    this.score = await getOpportunityScore({ opportunityId: oppId });
    this.numberOfCases = await getNumberOfCases({ AccountId: this.recordId });
    if (this.score === 1) {
      console.log("cold ");
      this.customClass = "cold";
    } else if (this.score === 2) {
      console.log("warm ");
      this.customClass = "warm";
    } else {
      this.customClass = "cold";
    }
    this.subscribeToMessageChannel();
  }
  // Encapsulate logic for LMS subscribe.
  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      REFRESH_CHANNEL,
      async (payload) => {
        await this.handleMessage(payload);
      }
    );
  }

  async handleMessage(payload) {
    console.log("subscribe", payload.message);
    this.numberOfCases = await getNumberOfCases({ AccountId: this.recordId });
  }
}
