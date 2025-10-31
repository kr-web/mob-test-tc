import type { AiGuideResult } from "../types/AiGuideResult";

export const useGroupedByLine = (items: AiGuideResult[]) => {
    const map = new Map<number, AiGuideResult[]>()

    items.forEach((item) => {
        if(!map.has(item.line)) map.set(item.line, [])
        map.get(item.line)!.push(item)
    })

    return Array.from(map.entries()).map(([line, list]) => ({
        line, list
    }))

}