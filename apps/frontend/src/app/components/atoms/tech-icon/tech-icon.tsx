import { technologyIcons } from "@utils";

const TechIcon = ({ name }: { name: string }) => {
    const Icon = name in technologyIcons ? technologyIcons[name].Icon : null;
    if (Icon) {
        return <Icon />;
    }
    return null;
};

export default TechIcon;
