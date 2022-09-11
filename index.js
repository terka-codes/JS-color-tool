let hexInput = document.getElementById("hexInput")
let inputColor = document.getElementById("inputColor")

let hexChars = /[0-9A-F]/i

hexInput.addEventListener("keyup", () => {
    let hex = hexInput.value
    if (!isValidHex(hex)) return

    let strippedHex = hex.replace('#', '')

    inputColor.style.background = "#" + strippedHex
})

const isValidHex = (hex) => {
    if (!hex) return false
    
    const strippedHex = hex.replace('#', '')
    if (strippedHex.length === 3 || strippedHex.length === 6) {
        return hexChars.test(strippedHex) // you can add alert text to let the user know its not a hex color
    } else return false 
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;
    
    let strippedHex = hex.replace('#','');
    
    if(strippedHex.length === 3) {
      strippedHex = strippedHex[0] + strippedHex[0]
      + strippedHex[1] + strippedHex[1]
      + strippedHex[2] + strippedHex[2];
    }
    
    const r  = parseInt(strippedHex.substring(0,2), 16);
    const g  = parseInt(strippedHex.substring(2,4), 16);
    const b  = parseInt(strippedHex.substring(4,6), 16);
    
    return {r,g,b}
  }

  const convertRGBtoHex = (r, g, b) => {
    r = r.toString(16)
    g = g.toString(16)
    b = b.toString(16)

    if (r.length < 2) {
        r = r[0] + r[0]
    }
    
    if (g.length < 2) {
        g = g[0] + g[0]
    }

    if (b.length < 2) {
        b = b[0] + b[0]
    }

    let hex = "#" + r + g + b

    return hex
  }