const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const MAIN_FOLDER = "images_zedo";
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;

export const fetchImages = async (folderName: string) => {
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

export const fetchProjectDetails = async (folderName: string) => {
	try {
		console.log("fetchProjectDetails");
		const scriptId = process.env.GOOGLE_SCRIPT_ID;
		const url = `https://script.google.com/macros/s/${scriptId}/exec?sheet=projects`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();
		const rows = data;

		if (!rows || !Array.isArray(rows)) {
			throw new Error("Invalid data format received");
		}

		const projectDetails = rows.filter(
			(proj) => proj.folderName === folderName
		);

		return projectDetails[0];
	} catch (error) {
		console.error("Error fetching project details:", error);
		return null;
	}
};
