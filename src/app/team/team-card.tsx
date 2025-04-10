interface TeamMember {
	name: string;
	description: string;
	image: string;
}

interface TeamCardProps {
	member: TeamMember;
}

function getOptimizedCloudinaryURL(url: string) {
	if (!url.includes("res.cloudinary.com")) return url;
	return url.replace("/upload/", "/upload/f_auto,q_auto:good/");
}

export default function TeamCard({ member }: TeamCardProps) {
	const imageURL = member.image?.includes("cloudinary")
		? getOptimizedCloudinaryURL(member.image)
		: "https://dummyimage.com/1920x1080/cccccc/cccccc";
	return (
		<div className="bg-white  max-w-84 flex flex-col gap-2">
			<img
				src={imageURL}
				alt={member.name}
				className="w-full h-56 object-cover  mb-4"
			/>
			<h2 className="text-xl w-fit font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-300 after:transition-all after:duration-00 hover:after:w-full">
				{member.name}
			</h2>

			<p className="text-gray-600 text-xs">{member.description}</p>
		</div>
	);
}
