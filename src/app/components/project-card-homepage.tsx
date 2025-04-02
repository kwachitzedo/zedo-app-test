import Image from "next/image";
import Link from "next/link";

interface Project {
	imageURL: string;
	projectName: string;
	folderName: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
	const projectUrl = `/projects/${project.folderName}?name=${encodeURIComponent(
		project.projectName
	)}`;

	if (project.imageURL === "") return;

	return (
		<Link href={projectUrl} className="block">
			<div className="bg-white mb-24 cursor-pointer lg:w-lg w-auto ">
				<div className="relative mb-2  bg-gray-500 overflow-hidden min-h-64">
					<Image
						src={
							project.imageURL ??
							"https://dummyimage.com/1920x1080/cccccc/cccccc"
						}
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
