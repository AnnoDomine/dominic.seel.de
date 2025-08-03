import TechnologyModal from "../../atoms/technoloy-modal/technology-modal";
import useTechnologyList from "./technology-list.hooks";

type Props = {
    technologies: number[];
};

const TechnologyList = ({ technologies }: Props) => {
    const { technologyList, isLoading } = useTechnologyList(technologies);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "0px" }}>
            {technologyList.map((tech) => (
                <TechnologyModal key={tech.id} technology={tech} />
            ))}
        </div>
    );
};

export default TechnologyList;
