let hexInput = document.getElementById("hexInput")
let inputColor = document.getElementById("inputColor")
let slider = document.getElementById("slider")
let sliderText = document.getElementById("sliderText")


let hexChars = /[0-9A-F]/i

hexInput.addEventListener("keyup", () => {
    let hex = hexInput.value
    if (!isValidHex(hex)) return

    let strippedHex = hex.replace('#', '')

    inputColor.style.background = "#" + strippedHex
})

slider.addEventListener("change", () => {
    let value = slider.value

    sliderText.innerText = value + " %"
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

  const convertRGBToHex = (r, g, b) => {
    r = ("0" + r.toString(16)).slice(-2)
    g = ("0" + g.toString(16)).slice(-2)
    b = ("0" + b.toString(16)).slice(-2)

    let hex = "#" + r + g + b

    return hex
  }