/** biome-ignore-all lint/suspicious/noExplicitAny: Any comes from the base definition */
import { useCallback } from "react";
import { useImmer } from "use-immer";
import { v1 as uuidv1 } from "uuid";

type ConsoleInstance = typeof console;

type ConsoleMethodKeys = {
    [K in keyof ConsoleInstance]: ConsoleInstance[K] extends (...args: any[]) => any ? K : never;
}[keyof ConsoleInstance];

type LogGroupItem<C extends ConsoleMethodKeys = ConsoleMethodKeys> = {
    id: string;
    type: C;
    timestamp: number;
    message: Parameters<ConsoleInstance[C]>;
};

type LogGroup = {
    [id: string]: LogGroupItem[];
};

export const useLogger = () => {
    const [logGroup, setLogGroup] = useImmer<LogGroup>({});
    const [groupName, setGroupName] = useImmer<Record<string, string>>({});

    const startLog = useCallback((name: string) => {
        const id = uuidv1();
        setLogGroup((draft) => {
            draft[id] = [];
        });
        setGroupName((draft) => {
            draft[id] = name;
        });
        return id;
    }, []);

    const addToLog = useCallback(
        (id: string) =>
            <C extends ConsoleMethodKeys = ConsoleMethodKeys>(type: C, message: Parameters<ConsoleInstance[C]>) => {
                setLogGroup((draft) => {
                    draft[id].push({
                        id: uuidv1(),
                        type,
                        timestamp: Date.now(),
                        message,
                    });
                });
            },
        []
    );

    const getGroupName = useCallback((id: string) => {
        return groupName[id] || "unnamed";
    }, []);

    const generateLogMessage = useCallback(
        <C extends ConsoleMethodKeys = ConsoleMethodKeys>(log: ConsoleInstance[C], name: string) => {
            console.groupCollapsed(
                `[${new Date().toISOString()} - Log ${name}] ${Array.from(Array(15))
                    .map(() => "-")
                    .join("")}`
            );
            log();
            console.log(
                Array.from(Array(15))
                    .map(() => "-")
                    .join("")
            );
            console.groupEnd();
        },
        []
    );

    const generateLog = useCallback((logs: ConsoleInstance[ConsoleMethodKeys][], id: string) => {
        const name = getGroupName(id);
        console.groupCollapsed(
            `[${new Date().toISOString()} - Log ${name}] ${Array.from(Array(15))
                .map(() => "-")
                .join("")}`
        );
        console.log(
            Array.from(Array(15))
                .map(() => "-")
                .join("")
        );
        logs.forEach((log) => {
            generateLogMessage(log, name);
        });
        console.log(
            Array.from(Array(15))
                .map(() => "-")
                .join("")
        );
        console.groupEnd();
    }, []);

    /**
     * We process over a log group and show the log to the related console.
     * The group is shown in a collapsed grouped.
     * Every single log entry will be grouped in a collapsed group.
     */
    const showLog = useCallback(async (id: string) => {
        const log = logGroup[id];
        if (!log) {
            if (groupName[id]) {
                setGroupName((draft) => {
                    delete draft[id];
                });
            }
            return;
        }
        if (log.length === 0) {
            if (groupName[id]) {
                setGroupName((draft) => {
                    delete draft[id];
                });
            }
            setLogGroup((draft) => {
                delete draft[id];
            });
            return;
        }
        try {
            const logs = log.map((item) => {
                const logFn = (console[item.type] as (...args: any[]) => void)
                    .bind(console)
                    .bind(null, ...item.message);
                return logFn;
            });
            await new Promise(() => {
                generateLog(logs, id);
            });
        } finally {
            setLogGroup((draft) => {
                delete draft[id];
            });
            setGroupName((draft) => {
                delete draft[id];
            });
        }
    }, []);

    class Logger {
        private id: string;

        constructor(name: string) {
            this.id = startLog(name);
        }

        public log(type: ConsoleMethodKeys, ...message: Parameters<ConsoleInstance[ConsoleMethodKeys]>) {
            addToLog(this.id)(type, message);
        }

        public async show() {
            await showLog(this.id);
        }
    }

    return Logger;
};
