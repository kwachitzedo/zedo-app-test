export async function GET() {
	const apiUrl = process.env.STUDIO_BE_GOOGLE_SCRIPT_URL;

	if (!apiUrl) {
		return new Response(JSON.stringify({ error: "API URL not set" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
