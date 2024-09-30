function getNumberOfZerosAfterDecimal(x: number) {
  return -Math.floor(Math.log10(x) + 1)
}

function formatResult(result: number) {
  const numberOfZerosAfterDecimal = getNumberOfZerosAfterDecimal(result)

  if (numberOfZerosAfterDecimal <= 1) {
    return result.toFixed(2)
  } else {
    return result.toFixed(numberOfZerosAfterDecimal + 2)
  }
}

export function convertBaseToTarget(
  amount: string | number,
  exchangeRate: number
) {
  const result = Number(amount) * exchangeRate
  return formatResult(result)
}

export function convertTargetToBase(
  amount: string | number,
  exchangeRate: number
) {
  const result = Number(amount) / exchangeRate
  return formatResult(result)
}
