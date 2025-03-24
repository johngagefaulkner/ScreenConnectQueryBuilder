// app/page.tsx (server)
import Home from "@/components/Home";

export const metadata = {
	title: "ScreenConnect Query Builder",
	description: "Generate ScreenConnect session group queries with ease.",
	applicationName: "ScreenConnect Query Builder",
	generator: "Next.js",
	keywords: ["screenconnect", "query builder", "connectwise", "wafer"],
	authors: [{ name: "Gage Faulkner", url: "https://screenconnect.aimnow.app/" }],
	creator: "Gage Faulkner",
	url: "https://screenconnect.aimnow.app/",
	siteName: "ScreenConnect Query Builder",
	images: [
		{
			url: "https://prod--screenconnectquerybuilder.us-central1.hosted.app/og-image.png",
			width: 1200,
			height: 630,
			alt: "ScreenConnect Query Builder",
		},
	],
	locale: "en_US",
	type: "website",
};


export default function Page() {
	return <Home />;
}
