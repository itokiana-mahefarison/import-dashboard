import { useCallback, useEffect, useRef } from "react"

export const useSkipper = () => {
    const shouldSkipRef = useRef(true)
    const shouldSkip = shouldSkipRef.current

    const skip = useCallback(() => {
        shouldSkipRef.current = true
    }, [])

    useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip] as const
}