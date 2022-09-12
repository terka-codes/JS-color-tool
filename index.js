const hexInput = document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")
const slider = document.getElementById("slider")
const sliderText = document.getElementById("sliderText")
const alteredColor = document.getElementById("alteredColor")
const alteredColorText = document.getElementById("alteredColorText")
const lightenText = document.getElementById("lightenText")
const darkenText = document.getElementById("darkenText")
const toggleBtn = document.getElementById("toggleBtn")
const textCopied = document.getElementById("textCopied")

let hexChars = /[0-9A-F]/i

// on every keyup checks if its valid hex and runs reset
hexInput.addEventListener("keyup", () => {
    if (!isValidHex(hexInput.value)) return

    reset()
})

// reset make the slider to be at zero, and updated the colors in feilds + the altered text
const reset = () => {
    slider.value = 0
    sliderText.innerText = `${slider.value}%`
    
    let strippedHex = hexInput.value.replace('#', '')

    inputColor.style.background = "#" + strippedHex
    alteredColor.style.background = "#" + strippedHex
    alteredColorText.innerText = "#" + strippedHex
}

// checks if the toggle button is on dark or light on click and changes classes, then runs reset
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
    reset()
})

// on changing slider value changes the displayed percentage, checks if hex is valid
// and then checks the toggle button to know if to lighten or darken color
// then alters the color through a function, and changes the colors in the boxes
slider.addEventListener("input", () => {
    sliderText.innerText = `${slider.value}%`

    if (!isValidHex(hexInput.value)) return

    const valueAddition = toggleBtn.classList.contains("toggled") ? -slider.value : slider.value
    
    const alteredHex = alterColor(hexInput.value, valueAddition)
    alteredColor.style.background = alteredHex
    alteredColorText.innerText = alteredHex
})

// checks if the hex input is valid
const isValidHex = (hex) => {
    if (!hex) return false
    
    const strippedHex = hex.replace('#', '')
    if (strippedHex.length === 3 || strippedHex.length === 6) {
        return hexChars.test(strippedHex)
    } else return false 
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null

    let strippedHex = hex.replace('#','')

    // if only 3 digits makes each of them twice
    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }

    // assigns 2 digits to the RGB values
    const r  = parseInt(strippedHex.substring(0,2), 16)
    const g  = parseInt(strippedHex.substring(2,4), 16)
    const b  = parseInt(strippedHex.substring(4,6), 16)

    return {r,g,b}
}

const convertRGBToHex = (r, g, b) => {
    // adds 0 befor every string (in case its a single character) and then takes the last 2 characters
    r = ("0" + r.toString(16)).slice(-2)
    g = ("0" + g.toString(16)).slice(-2)
    b = ("0" + b.toString(16)).slice(-2)

    let hex = "#" + r + g + b

    return hex
}

const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex)

    // calculates percentage from the slider / 100 * 255 for the RGB values and rounds
    const amount = Math.floor((percentage / 100) * 255)

    // adds the calculated amout to each color
    let newR = r + amount
    let newG = g + amount
    let newB = b + amount

    // ensure the nuber is between 0 and 255
    newR > 255 ? newR = 255 : newR < 0 ? newR = 0 : newR
    newG > 255 ? newG = 255 : newG < 0 ? newG = 0 : newG
    newB > 255 ? newB = 255 : newB < 0 ? newB = 0 : newB

    // if the percentaze is 0, make the color #000000
    percentage === 0 ? newR = f : newR
    percentage === 0 ? newG = f : newG
    percentage === 0 ? newB = f : newB

    // Checks if the color is too light or too dark, and then changes the color of the text
    // in altered color to make it legible
    newR > 125 ? alteredColorText.style.color = "#000" : alteredColorText.style.color = "#fff"
    newG > 125 ? alteredColorText.style.color = "#000" : alteredColorText.style.color = "#fff"
    newB > 125 ? alteredColorText.style.color = "#000" : alteredColorText.style.color = "#fff"

    newR > 125 ? textCopied.style.color = "#000" : textCopied.style.color = "#fff"
    newG > 125 ? textCopied.style.color = "#000" : textCopied.style.color = "#fff"
    newB > 125 ? textCopied.style.color = "#000" : textCopied.style.color = "#fff"

    return convertRGBToHex(newR, newG, newB)
}

// on click on hex color copies to clipboard and shows massage for 5s
alteredColorText.addEventListener("click", () => {
    navigator.clipboard.writeText(alteredColorText.innerText);

    textCopied.style.opacity = 0.9
    setTimeout(hideCopyText,5000)

})

// copies the hex of the altered color to the clipboard
const hideCopyText = () => {
    textCopied.style.opacity = 0
}