import Image from "next/image";
import Link from "next/link";

interface Project {
	imageURL: string;
	projectName: string;
	folderName: string;
}

function getOptimizedCloudinaryURL(url: string) {
	if (!url.includes("res.cloudinary.com")) return url;
	return url.replace("/upload/", "/upload/f_auto,q_auto:eco/");
}

const ProjectCard = ({ project }: { project: Project }) => {
	const projectUrl = `/projects/${project.folderName}?name=${encodeURIComponent(
		project.projectName
	)}`;

	// if (project.imageURL === "") return;

	const imageURL = project.imageURL?.includes("cloudinary")
		? getOptimizedCloudinaryURL(project.imageURL)
		: "https://dummyimage.com/1920x1080/cccccc/cccccc";
	return (
		<Link href={projectUrl} className="block">
			<div className="bg-white mb-24 cursor-pointer lg:w-lg w-auto ">
				<div className="relative mb-2  bg-gray-500 overflow-hidden ">
					<Image
						src={imageURL}
						alt={project.projectName}
						width={0}
						height={0}
						sizes="100vw"
						className={`w-full h-auto object-cover ${
							project.imageURL ===
							"https://dummyimage.com/1920x1080/cccccc/cccccc"
								? "animate-pulse"
								: ""
						}`}
						priority
					/>
				</div>
				<h2 className="text-lg text-left mt-2">{project.projectName}</h2>
			</div>
		</Link>
	);
};

export default ProjectCard;
