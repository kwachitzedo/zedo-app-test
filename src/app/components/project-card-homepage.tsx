import { useRouter } from "next/navigation";
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

	return (
		<Link href={projectUrl} className="block">
			<div className="bg-white border border-gray-300 mb-10 cursor-pointer">
				<div className="mb-2">
					<Image
						src={project.imageURL}
						alt={project.projectName}
						width={900}
						height={700}
						priority
					/>
				</div>
				<h2 className="text-lg text-center mt-2">{project.projectName}</h2>
			</div>
		</Link>
	);
};

export default ProjectCard;
