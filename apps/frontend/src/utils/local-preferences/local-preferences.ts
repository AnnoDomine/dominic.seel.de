import { useCallback, useEffect } from "react";
import type { RoadmapStatus } from "../../types/redux/roadmap";

type Preferences = {
    roadmap_column_order?: RoadmapStatus[];
};

const DEFAULT_PREFERENCE: Preferences = {
    roadmap_column_order: ["on_hold", "planned", "in_progress", "completed"],
};

type Return = [
    <P extends keyof Preferences = keyof Preferences>(preference: P) => NonNullable<Preferences[P]>,
    <P extends keyof Preferences = keyof Preferences>(preference: P, value: Preferences[P]) => void,
];

/**
 * Hook to handle user preferences which are stored in the local storage.
 *
 * @typedef Preferences - Object with preference key value pair
 *
 * @returns {Return} - Getter and setter functions as useState like array
 */
const useLocalPreferences = (): Return => {
    const localStoragePreferences = useCallback(
        (): Preferences => JSON.parse(localStorage.getItem("preferences") || "{}"),
        []
    );

    const setPreferences = useCallback((preferences: Preferences) => {
        localStorage.setItem("preferences", JSON.stringify(preferences));
    }, []);

    const changePreference = useCallback(
        <P extends keyof Preferences = keyof Preferences>(preference: P, value: Preferences[P]) => {
            const currentPreferences = localStoragePreferences();
            setPreferences({ ...currentPreferences, [preference]: value });
        },
        [localStoragePreferences, setPreferences]
    );

    const getPreference = useCallback(
        <P extends keyof Preferences = keyof Preferences>(preference: P): NonNullable<Preferences[P]> => {
            const preferences = localStoragePreferences();
            if (!preferences[preference]) {
                setPreferences({ ...preferences, [preference]: DEFAULT_PREFERENCE[preference] });
                return DEFAULT_PREFERENCE[preference] as NonNullable<Preferences[P]>;
            }
            return preferences[preference] as NonNullable<Preferences[P]>;
        },
        [localStoragePreferences, setPreferences]
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: Should only run initial
    useEffect(() => {
        const preferences = localStoragePreferences();
        if (Object.keys(preferences).length === 0) {
            setPreferences(DEFAULT_PREFERENCE);
        }
    }, []);

    return [getPreference, changePreference];
};

export default useLocalPreferences;
