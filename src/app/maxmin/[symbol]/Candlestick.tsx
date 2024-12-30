interface CandlestickProps {
  x?: number
  y?: number
  width?: number
  height?: number
  low?: number
  high?: number
  openClose?: [number, number]
  fill?: string
}

const Candlestick = (props: CandlestickProps) => {
  const { openClose } = props
  if (!openClose) {
    return null
  }
  const [open, close] = openClose
  const { x, y, width, height, low, high, fill } = props
  if (
    height == null ||
    width == null ||
    x == null ||
    y == null ||
    low == null ||
    high == null ||
    open == null ||
    close == null
  ) {
    return null
  }
  const isGrowing = open < close
  const ratio = Math.abs(height / (open - close))

  return (
    <g stroke={fill} fill="none" strokeWidth="2">
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* bottom line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
        />
      )}
      {/* top line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
        />
      )}
    </g>
  )
}

export default Candlestick
