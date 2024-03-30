import { api, wire } from "lwc";
import LightningModal from "lightning/modal";
import REFRESH_CHANNEL from "@salesforce/messageChannel/Record_Selected__c";
import { publish, MessageContext } from "lightning/messageService";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LwcCaseCreationModal extends LightningModal {
  @api contentFromLwc = {};
  accId;
  product;
  spinner;

  closeModal() {
    this.close("canceled");
  }

  handleSuccess() {
    this.showNotification();
    this.publishMessage();
    this.close("save");
  }

  connectedCallback() {
    this.spinner = true;
    this.accId = this.contentFromLwc?.accountId;
    this.product = this.contentFromLwc?.oppProductId;
    this.spinner = false;
  }
  showNotification() {
    const evt = new ShowToastEvent({
      title: "Congratulations!",
      message: "A case was created",
      variant: "success"
    });
    this.dispatchEvent(evt);
  }
  @wire(MessageContext)
  messageContext;

  // Respond to UI event by publishing message
  publishMessage() {
    const payload = { message: "case created" };
    console.log("published message: ", payload.message);
    publish(this.messageContext, REFRESH_CHANNEL, payload);
  }
}
