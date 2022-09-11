//let hex = document.getElementById("hexInput").value
let hexChars = /[0-9A-F]/i

const isValidHex = (hex) => {
    if(!hex) return false
    
    const strippedHex = hex.replace('#', '')
    if (strippedHex.length === 3 || strippedHex.length === 6) {
        return hexChars.test(strippedHex)
    } else return false 
}