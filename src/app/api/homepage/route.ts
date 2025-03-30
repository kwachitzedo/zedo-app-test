import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
	try {
		const scriptId = process.env.GOOGLE_SCRIPT_ID;
		const url = `https://script.google.com/macros/s/${scriptId}/exec?sheet=projects`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 }
		);
	}
}
