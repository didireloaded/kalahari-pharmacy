import { createFileRoute } from "@tanstack/react-router";
import { InformationPage } from "@/components/site/InformationPage";
import { pageHead } from "@/lib/seo";
import introAsset from "@/assets/wellness-intro.jpg.asset.json";
export const Route = createFileRoute("/about")({
 head: () => pageHead("/about", "About Kalahari Pharmacy", "Kalahari Pharmacy is associated with Gustav Voigts Centre on Independence Avenue, Windhoek. This website brings its existing contact channels together with a guide to everyday-care enquiries."),
 component: Page,
});
function Page() { return <InformationPage title="A familiar counter in the heart of Windhoek" intro="Kalahari Pharmacy is associated with Gustav Voigts Centre on Independence Avenue, Windhoek. This website brings its existing contact channels together with a guide to everyday-care enquiries." sections={[{"title": "In the city centre", "text": "Find the pharmacy at Gustav Voigts Centre, Independence Avenue, Windhoek, Namibia. Please call before travelling to confirm opening hours and the details of your visit."}, {"title": "A conversation first", "text": "Use the category guide or illustrative store to organise questions, then speak directly with the pharmacy about availability and prices. The website does not establish which products or services are offered."}, {"title": "What is still to be confirmed", "text": "Opening hours, official brand artwork, offered services and product stock need pharmacy approval. Editorial portraits are not staff photographs; no founder story, team identities or business history is asserted here."}]} image={introAsset.url} />; }
