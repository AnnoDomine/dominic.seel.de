import { useMemo } from "react";
import { useListTechnologiesQuery } from "../../../../redux/queries/technology";

const useTechnologyList = (technologies: number[]) => {
    const { data, isFetching } = useListTechnologiesQuery();

    const technologyList = useMemo(() => {
        const list = (data || []).filter((item) => technologies.includes(item.id)).sort((a, b) => a.id - b.id);
        return list;
    }, [data, technologies]);

    return {
        technologyList,
        isLoading: isFetching,
    };
};

export default useTechnologyList;
