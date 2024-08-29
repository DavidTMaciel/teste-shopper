
function checkStringEmpty(e: string): boolean {
    return e === undefined || e === null || e.trim() === ''
}

function checkIfWaterOrGas(e: string): boolean {
    if(!e) return true
    const validTypes = ["WATER", "GAS"]
    return validTypes.includes(e.toUpperCase().trim()) ? false : true
}

function isBase64String(str: string): boolean {
    if (checkStringEmpty(str)) return true
    const base64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i
    const base64Str = str.includes(",") ? str.split(",")[1] : str

    return base64Regex.test(base64Str) ? false : true
}

function isValidDateFormat(date: string): boolean {
    if (checkStringEmpty(date)) return true

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = date.match(dateRegex)
    if (!match) return true

    const day = parseInt(match[1], 10)
    const month = parseInt(match[2], 10)
    const year = parseInt(match[3], 10)

    if (month < 1 || month > 12) return true

    const daysInMonth = new Date(year, month, 0).getDate()
    return day >= 1 && day <= daysInMonth ? false : true
}

function checkNumberEmpty(e: number): boolean {
    return e === undefined || e === null || Number.isNaN(e)
}

export {
    checkStringEmpty,
    checkIfWaterOrGas,
    isBase64String,
    isValidDateFormat,
    checkNumberEmpty
};