import { LightningElement, wire, api, track } from "lwc";
import returnOpportunityProducts from "@salesforce/apex/OpportunityScoring.returnOpportunityProducts";
import lwcCaseCreationModal from "c/lwcCaseCreationModal";

export default class LwcAccountOppProducts extends LightningElement {
  @api recordId;
  @track data = [];
  @track datatableData = [];
  typeName;

  actions = [{ label: "Create Case", name: "create_case" }];

  columns = [
    {
      label: "Opportunity Product Name",
      fieldName: "Name",
      type: "text",
      hideDefaultActions: true
    },
    {
      label: "Price",
      fieldName: "Price__c",
      type: "currency",
      hideDefaultActions: true,
      sortable: true
    },
    {
      label: "Discount",
      fieldName: "Discount__c",
      type: "currency",
      hideDefaultActions: true
    },
    {
      label: "Discount Percentage",
      fieldName: "DiscountPercentage",
      type: "percent",
      hideDefaultActions: true
    },
    {
      label: "Product Type",
      fieldName: "Product_Type__c",
      type: "text",
      hideDefaultActions: true,
      sortable: true
    },
    {
      label: "Created Date",
      fieldName: "CreatedDate",
      type: "date",
      hideDefaultActions: true
    },
    { type: "action", typeAttributes: { rowActions: this.actions } }
  ];

  @wire(returnOpportunityProducts, { AccountId: "$recordId" })
  retrievedOppProducts({ error, data }) {
    if (data) {
      const dataMapped = data.map((el) => {
        return {
          ...el,
          DiscountPercentage: el.Price__c ? el.Discount__c / el.Price__c : 0
        };
      });
      this.data = dataMapped;
      this.datatableData = data;
    } else if (error) {
      console.error(error);
    }
  }

  handleSearch(event) {
    this.typedName = event.target.value;
    const searchKey = this.typedName.trim().toLowerCase();
    console.log(searchKey);
    if (searchKey) {
      this.datatableData = this.data.filter((oppProduct) => {
        return oppProduct.Name.toLowerCase().includes(searchKey);
      });
    } else {
      this.datatableData = this.data;
    }
  }

  async openModal(event) {
    const action = event.detail.action;
    const row = event.detail.row;
    if (action.name === "create_case") {
      console.log("CREATE CASE", row);
      const result = await lwcCaseCreationModal.open({
        size: "large",
        description: "Create a case",
        contentFromLwc: { accountId: this.recordId, oppProductId: row.Id }
      });
      console.log(result);
    }
  }
}
