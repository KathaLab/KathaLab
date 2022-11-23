import { useEffect, useRef, useState } from 'react'


export const useDelayQueue = <T>(callback: (element?: T) => Promise<void>): [T[], (elmnt: T) => void] => {

    const [queue, setQueue] = useState<T[]>([]);
    const isWaiting = useRef(false);

    useEffect(() => {
        if(queue.length > 0 && isWaiting.current === false)
            useCallback();
    }, [queue])

    const addEement = (element: T) => {
        setQueue((old) => [...old, element])
    }

    const removeEement = () => {
        setQueue((oldQueue) => oldQueue.splice(1, oldQueue.length - 1));
    }

    const useCallback = async () => {
        isWaiting.current = true;
        await callback(queue?.[0]);
        removeEement()
        isWaiting.current = false
    }

    return [queue, addEement]
}
