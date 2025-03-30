import { NextRequest, NextResponse } from "next/server";

const fetchProjectDetails = async (folderName: string) => {
	try {
		const scriptId = process.env.GOOGLE_SCRIPT_ID;
		const url = `https://script.google.com/macros/s/${scriptId}/exec?sheet=projects`;

		const response = await fetch(url);
		if (!response.ok) throw new Error("Failed to fetch data");

		const data = await response.json();
		const rows = data;

		if (!rows || !Array.isArray(rows))
			throw new Error("Invalid data format received");

		const projectDetails = rows.find(
			(proj: any) => proj.folderName === folderName
		);

		return projectDetails || null;
	} catch (error) {
		console.error("Error fetching project details:", error);
		return null;
	}
};

export async function GET(
	req: NextRequest,
	{ params }: { params: { folderName: string } }
) {
	const { folderName } = params;

	if (!folderName) {
		return NextResponse.json(
			{ error: "Missing folderName parameter." },
			{ status: 400 }
		);
	}

	try {
		const projectDetails = await fetchProjectDetails(folderName);
		return NextResponse.json({ projectDetails }, { status: 200 });
	} catch (error) {
		console.error("Error fetching project details:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
