import { useCallback, useMemo } from "react"
import _ from "lodash"

export const useGenerateColor = (props: Props) => {
    const calculatePoint = useCallback((i: number, intervalSize: number, colorRangeInfo: ColorRangeInfo) => {
        const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
        return (useEndAsStart
            ? (colorEnd - (i * intervalSize))
            : (colorStart + (i * intervalSize)));
    }, [])

    const interpolateColors = useCallback(({colorRangeInfo, colorScale, dataLength}: Props) => {
        const { colorStart, colorEnd } = colorRangeInfo;
        const colorRange = colorEnd - colorStart;
        const intervalSize = colorRange / dataLength;
        const colorArray = [] as Array<string>;

        _.range(0, dataLength).forEach((item) => {
            const colorPoint = calculatePoint(item, intervalSize, colorRangeInfo)
            colorArray.push(colorScale(colorPoint))
        })

        return colorArray;
    }, [])
    
    return useMemo(() => {
        return interpolateColors(props)
    }, [props])
}

type Props = {
    colorScale: Function
    dataLength: number
    colorRangeInfo: ColorRangeInfo
}

type ColorRangeInfo = {
    colorStart: number
    colorEnd: number
    useEndAsStart: boolean
}