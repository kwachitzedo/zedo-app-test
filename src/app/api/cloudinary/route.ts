import { NextResponse } from "next/server";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const MAIN_FOLDER = "images_zedo";

async function fetchFirstImage(folder: string) {
	const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search?expression=folder:"${folder}" AND resource_type:image&max_results=1`;

	console.log("Fetching images from:", url);

	const response = await fetch(url, {
		headers: {
			Authorization: `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString(
				"base64"
			)}`,
		},
	});

	const data = await response.json();
	console.log(`Images for folder ${folder}:`, data);

	return data.resources?.length > 0 ? data.resources[0].secure_url : null;
}

export async function GET() {
	try {
		// Step 1: Get subfolders
		const folderUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders/${MAIN_FOLDER}`;

		const folderResponse = await fetch(folderUrl, {
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${API_KEY}:${API_SECRET}`
				).toString("base64")}`,
			},
		});

		const folderData = await folderResponse.json();
		console.log("folderData", folderData);
		const subfolders = folderData.folders || [];

		// Step 2: Fetch the first image from each subfolder
		const images = await Promise.all(
			subfolders.map(async (folder: { path: string }) =>
				fetchFirstImage(folder.path)
			)
		);

		return NextResponse.json({ images: images.filter((img) => img !== null) });
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 }
		);
	}
}
