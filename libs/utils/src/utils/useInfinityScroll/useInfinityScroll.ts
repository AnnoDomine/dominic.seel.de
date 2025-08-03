import { useCallback, useDebugValue, useRef } from "react";

export const useInfinityScroll = (
    isLoading: boolean,
    hasMorePages: boolean,
    setPage: React.Dispatch<React.SetStateAction<number>>
) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastUserElementRef = useCallback(
        (node: HTMLElement | null) => {
            console.group("useInfinityScroll - lastUserElementRef");
            console.log("Node:", node);
            console.log("isLoading:", isLoading);
            console.log("hasMorePages:", hasMorePages);
            console.groupEnd();
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMorePages) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMorePages, setPage]
    );

    useDebugValue({
        isLoading,
        hasMorePages,
        lastUserElementRef,
        observer: observer.current,
    });

    return { lastUserElementRef, observer };
};
