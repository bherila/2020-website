import textColor from './TextColors.css'

export default function CurrencyDisplay({
  value,
  digits = 2,
}: {
  value: number
  digits: number
}) {
  if (value < 0) {
    return <span style={textColor.red}>${value.toFixed(digits)}</span>
  } else {
    return <span>${value.toFixed(digits)}</span>
  }
}
