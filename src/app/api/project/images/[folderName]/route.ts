import { NextRequest, NextResponse } from "next/server";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const MAIN_FOLDER = "images_zedo";
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;

const fetchImages = async (folderName: string) => {
	const folderPath = `${MAIN_FOLDER}/${folderName}`;
	const query = `folder:${folderPath}`;
	const apiUrl = `${BASE_URL}?expression=${encodeURIComponent(query)}`;

	try {
		const response = await fetch(apiUrl, {
			method: "GET",
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${API_KEY}:${API_SECRET}`
				).toString("base64")}`,
			},
		});

		if (!response.ok) throw new Error("Failed to fetch images");

		const data = await response.json();
		return data.resources.map((img: any) => ({
			url: img.secure_url,
		}));
	} catch (error) {
		console.error("Error fetching images:", error);
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
		const images = await fetchImages(folderName);
		return NextResponse.json({ images }, { status: 200 });
	} catch (error) {
		console.error("Error fetching images:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
