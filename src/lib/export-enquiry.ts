import {getCategory} from "@/content/site";
export function enquiryPrintText(slugs:string[]){
  return "Kalahari Pharmacy — category enquiry list\n\n"+slugs.map(s=>getCategory(s)?.name).filter((v):v is string=>!!v).map(s=>"- "+s).join("\n")+"\n\nAvailability and prices have not been confirmed. This is not an order or medical request.";
}
