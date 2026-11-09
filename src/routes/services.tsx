import { createFileRoute } from "@tanstack/react-router";
import { InformationPage } from "@/components/site/InformationPage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/services")({
 head: () => pageHead("/services", "Services & enquiries", "The topics below are examples to ask about, not a confirmed list of services provided by Kalahari Pharmacy."),
 component: Page,
});
function Page() { return <InformationPage title="Start with a question" intro="The topics below are examples to ask about, not a confirmed list of services provided by Kalahari Pharmacy." sections={[{"title": "Everyday-care questions", "text": "You may wish to ask about personal-care items, first-aid supplies, skincare or family essentials. Call to confirm whether the pharmacy carries the type of item you need."}, {"title": "Pharmacy services", "text": "If you need a screening, vaccination, consultation or other pharmacy service, ask the pharmacy directly whether it is available and what arrangements apply. No service, fee, appointment or medical-aid arrangement is confirmed on this site."}, {"title": "Prescription enquiries", "text": "Call first about prescription requirements and repeats. Use the Prescriptions page for this website\u2019s privacy boundaries; do not send a prescription or health history through an ordinary website enquiry."}]} />; }
