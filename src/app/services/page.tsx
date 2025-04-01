"use client";

import Image from "next/image";

export default function Gallery() {
	return (
		<div className="flex  flex-col gap-4 mx-auto p-4 max-w-5xl">
			<Image
				width={1000}
				height={800}
				src={"/services.jpg"}
				alt={"services"}
				className={`object-contain w-auto max-h-[90vh] max-w-full `}
			/>
		</div>
	);
}
