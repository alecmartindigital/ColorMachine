const currentColor = document.getElementById("currentColor");
const rgbColorH2 = document.getElementById("rgbColor");
const hexColorH2 = document.getElementById("hexColor");
const redValueSpan = document.getElementById("redValue");
const greenValueSpan = document.getElementById("greenValue");
const blueValueSpan = document.getElementById("blueValue");
const hexInput = document.getElementById("hexInput");
const manualRedInput = document.getElementById("manualRed");
const manualGreenInput = document.getElementById("manualGreen");
const manualBlueInput = document.getElementById("manualBlue");
const alphaValueSpan = document.getElementById("alphaValue");


const colorComponents = {
    red: 255,
    green: 255,
    blue: 255
};

let intervalId;

const randomizeColorBtn = document.getElementById("randomizeColor");
const increaseRedBtn = document.getElementById("increaseRed");
const decreaseRedBtn = document.getElementById("decreaseRed");
const increaseGreenBtn = document.getElementById("increaseGreen");
const decreaseGreenBtn = document.getElementById("decreaseGreen");
const increaseBlueBtn = document.getElementById("increaseBlue");
const decreaseBlueBtn = document.getElementById("decreaseBlue");
const applyHexBtn = document.getElementById("applyHex");
const applyRGBBtn = document.getElementById("applyRGB");

randomizeColorBtn.addEventListener('click', function () {
    colorComponents.red = getRandomColorComponent();
    colorComponents.green = getRandomColorComponent();
    colorComponents.blue = getRandomColorComponent();

    updateColorDisplay();
});

increaseRedBtn.addEventListener('mousedown', function () {
    startContinuousUpdate(function () {
        colorComponents.red = (colorComponents.red + 1) % 256;
        updateColorDisplay();
    });
});

decreaseRedBtn.addEventListener('mousedown', function () {
    startContinuousUpdate(function () {
        colorComponents.red = (colorComponents.red - 1 + 256) % 256;
        updateColorDisplay();
    });
});

increaseGreenBtn.addEventListener('mousedown', function () {
    startContinuousUpdate(function () {
        colorComponents.green = (colorComponents.green + 1) % 256;
        updateColorDisplay();
    });
});

decreaseGreenBtn.addEventListener('mousedown', function () {
    startContinuousUpdate(function () {
        colorComponents.green = (colorComponents.green - 1 + 256) % 256;
        updateColorDisplay();
    });
});

increaseBlueBtn.addEventListener('mousedown', function () {
    startContinuousUpdate(function () {
        colorComponents.blue = (colorComponents.blue + 1) % 256;
        updateColorDisplay();
    });
});

decreaseBlueBtn.addEventListener('mousedown', function () {
    startContinuousUpdate(function () {
        colorComponents.blue = (colorComponents.blue - 1 + 256) % 256;
        updateColorDisplay();
    });
});

document.addEventListener('mouseup', function () {
    stopContinuousUpdate();
});

applyHexBtn.addEventListener('click', function () {
    const hexValue = hexInput.value.replace(/^#/, ''); // Remove '#' if present
    const rgbValues = hexToRgb(hexValue);
    
    if (rgbValues) {
        colorComponents.red = rgbValues.red;
        colorComponents.green = rgbValues.green;
        colorComponents.blue = rgbValues.blue;
        updateColorDisplay();
    } else {
        alert('Invalid HEX code');
    }
});

applyRGBBtn.addEventListener('click', function () {
    colorComponents.red = parseInt(manualRedInput.value) || 0;
    colorComponents.green = parseInt(manualGreenInput.value) || 0;
    colorComponents.blue = parseInt(manualBlueInput.value) || 0;

    updateColorDisplay();
});

function getRandomColorComponent() {
    return Math.floor(Math.random() * 256);
}

function startContinuousUpdate(incrementFunction) {
    intervalId = setInterval(function () {
        incrementFunction();
    }, 100);
}

function stopContinuousUpdate() {
    clearInterval(intervalId);
}

function rgbToHex(red, green, blue) {
    const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const hexRed = toHex(red);
    const hexGreen = toHex(green);
    const hexBlue = toHex(blue);

    return `#${hexRed}${hexGreen}${hexBlue}`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        }
        : null;
}

function updateColorDisplay() {
    const isDarkColor = (colorComponents.red + colorComponents.green + colorComponents.blue) / 3 < 128;
    const textColor = isDarkColor ? 'white' : 'black';

    document.body.style.color = textColor;
    document.body.style.backgroundColor = `rgb(${colorComponents.red}, ${colorComponents.green}, ${colorComponents.blue})`;

    const rgbColorString = `RGB: (${colorComponents.red}, ${colorComponents.green}, ${colorComponents.blue})`;
    const hexColorString = rgbToHex(colorComponents.red, colorComponents.green, colorComponents.blue);

    rgbColorH2.textContent = rgbColorString;
    hexColorH2.textContent = `Hex: ${hexColorString}`;
    redValueSpan.textContent = `${colorComponents.red}`;
    greenValueSpan.textContent = `${colorComponents.green}`;
    blueValueSpan.textContent = `${colorComponents.blue}`;

    // Update button styles
    const buttonColor = isDarkColor ? 'white' : 'black';
    const buttonBorderColor = isDarkColor ? 'white' : 'black';

    applyHexBtn.style.color = buttonColor;
    applyHexBtn.style.borderColor = buttonBorderColor;

    applyRGBBtn.style.color = buttonColor;
    applyRGBBtn.style.borderColor = buttonBorderColor;

    randomizeColorBtn.style.color = buttonColor;
    randomizeColorBtn.style.borderColor = buttonBorderColor;

    // Update increase and decrease button styles
    increaseRedBtn.style.color = buttonColor;
    increaseRedBtn.style.borderColor = buttonBorderColor;

    decreaseRedBtn.style.color = buttonColor;
    decreaseRedBtn.style.borderColor = buttonBorderColor;

    increaseGreenBtn.style.color = buttonColor;
    increaseGreenBtn.style.borderColor = buttonBorderColor;

    decreaseGreenBtn.style.color = buttonColor;
    decreaseGreenBtn.style.borderColor = buttonBorderColor;

    increaseBlueBtn.style.color = buttonColor;
    increaseBlueBtn.style.borderColor = buttonBorderColor;

    decreaseBlueBtn.style.color = buttonColor;
    decreaseBlueBtn.style.borderColor = buttonBorderColor;

    const alphaPercentage = Math.round(colorComponents.alpha * 100);
    alphaValueSpan.textContent = `${alphaPercentage}`;


}