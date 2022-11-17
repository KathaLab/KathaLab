export const useId = (() => {
    const lastIdPerKey: Record<string, number> = {};

    return (key: string) => {
        if (!lastIdPerKey[key]) {
            lastIdPerKey[key] = 0;
        }

        return ++lastIdPerKey[key];
    }
})();