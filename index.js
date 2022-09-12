let hexInput = document.getElementById("hexInput")
let inputColor = document.getElementById("inputColor")
let slider = document.getElementById("slider")
let sliderText = document.getElementById("sliderText")
let alteredColor = document.getElementById("alteredColor")
let alteredColorText = document.getElementById("alteredColorText")
let lightenText = document.getElementById("lightenText")
let darkenText = document.getElementById("darkenText")
let toggleBtn = document.getElementById("toggleBtn")

let hexChars = /[0-9A-F]/i

hexInput.addEventListener("keyup", () => {
    let hex = hexInput.value
    if (!isValidHex(hex)) return

    let strippedHex = hex.replace('#', '')

    inputColor.style.background = "#" + strippedHex
})

toggleBtn.addEventListener("click", () => {
    if (toggleBtn.classList.contains("toggled")) {
        toggleBtn.classList.remove("toggled")
        lightenText.classList.remove("unselected")
        darkenText.classList.add("unselected")
    } else {
        toggleBtn.classList.add("toggled")
        lightenText.classList.add("unselected")
        darkenText.classList.remove("unselected")
    }
})

slider.addEventListener("input", () => {
    sliderText.innerText = `${slider.value}%`

    if (!isValidHex(hexInput.value)) return

    const alteredHex = alterColor(hexInput.value, slider.value)
    alteredColor.style.background = alteredHex
    alteredColorText.innerText = "" + alteredHex
    // change the text color depending on the color displayed and style it in css
})

const isValidHex = (hex) => {
    if (!hex) return false
    
    const strippedHex = hex.replace('#', '')
    if (strippedHex.length === 3 || strippedHex.length === 6) {
        return hexChars.test(strippedHex) // you can add alert text to let the user know its not a hex color
    } else return false 
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null

    let strippedHex = hex.replace('#','')

    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }

    const r  = parseInt(strippedHex.substring(0,2), 16)
    const g  = parseInt(strippedHex.substring(2,4), 16)
    const b  = parseInt(strippedHex.substring(4,6), 16)

    return {r,g,b}
}

const convertRGBToHex = (r, g, b) => {
    r = ("0" + r.toString(16)).slice(-2)
    g = ("0" + g.toString(16)).slice(-2)
    b = ("0" + b.toString(16)).slice(-2)

    let hex = "#" + r + g + b

    return hex
}

const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex)

    const amount = Math.floor((percentage / 100) * 255)

    let newR = r + amount
    let newG = g + amount
    let newB = b + amount

    // ensure the nuber is between 0 and 255
    newR > 255 ? newR = 255 : newR < 0 ? newR = 0 : newR
    newG > 255 ? newG = 255 : newG < 0 ? newG = 0 : newG
    newB > 255 ? newB = 255 : newB < 0 ? newB = 0 : newB

    // if the percentaze is 0, make the color #000000
    percentage === 0 ? newR = 0 : newR
    percentage === 0 ? newG = 0 : newG
    percentage === 0 ? newB = 0 : newB

    return convertRGBToHex(newR, newG, newB)
}