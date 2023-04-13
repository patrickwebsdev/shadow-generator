// Show 
const shadowBox = document.getElementById("shadowContainer");

const valuesElements = {
    'horizontal': {
        'input': 'horizontalShadow',
        'output': 'horizontalValue',
        'percentage': 10,
        'event': 'input'
    },
    'vertical': {
        'input': 'verticalShadow',
        'output': 'verticalValue',
        'percentage': 10,
        'event': 'input'
    },
    'blur': {
        'input': 'blurShadow',
        'output': 'blurValue',
        'percentage': 10,
        'event': 'input'
    },
    'spread': {
        'input': 'spreadShadow',
        'output': 'spreadValue',
        'percentage': 10,
        'event': 'input'
    },
    'opacity': {
        'input': 'opacityShadow',
        'output': 'opacityValue',
        'percentage': 100,
        'event': 'input'
    }
}

Object.values(valuesElements).forEach( element => {
    document.getElementById(element.input)
        .addEventListener(element.event, (e) => {
            document.getElementById(element.output).innerHTML = e.target.value / element.percentage;
            shadow_changes();
        })
})

const colorsInputs = [
    {
        'change': 'colorShadowHex',
        'input': 'colorShadow',
    },
    {
        'change': 'backgroundEnviroment',
        'input': 'backgroundColor',
    },
    {
        'change': 'boxEnviroment',
        'input': 'boxColor',
    }
]

colorsInputs.forEach(element => {
    const changeElement = document.getElementById(element.change)
    const inputElement = document.getElementById(element.input)
    changeElement.addEventListener('change', e => {
        inputElement.value = e.target.value;
        shadow_changes();
    }, false);
    
    inputElement.addEventListener('input', (e) => {
        changeElement.value = e.target.value;
        shadow_changes();
    }, false);
})


// Copy Values
document.getElementById("copyToClipboard").addEventListener("click", function (e) {
    e.preventDefault();
    const shadowConfig = getShadowString();
    const clipboardText = document.getElementById("clipboard");
    const shadowPreset = `box-shadow: ${shadowConfig};
                         -webkit-box-shadow: ${shadowConfig};
                         -moz-box-shadow: ${shadowConfig};`;
    clipboardText.innerHTML = shadowPreset;
    navigator.clipboard.writeText(shadowPreset)
        .then(() => {
            e.target.innerHTML = "¡Copied!";
            setTimeout(() => {
                e.target.innerHTML = "Click to copy";
            }, 2000);
        })
        .catch(e => console.error(e))
});

document.getElementById("toggleMode").addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
});

function getShadowString(){
    // Values
    const v = Object.keys(valuesElements).reduce((acc, el) => {
        const value = document.getElementById(valuesElements[el].input).value
        acc[el] = parseInt(value) / valuesElements[el].percentage
        return acc
    }, {})
    console.log(v)
    const color = document.getElementById('colorShadow').value;
    return `${v.horizontal}em ${v.vertical}em ${v.blur}em ${v.spread}em ${hexToRGB(color, v.opacity)}`;
}

function shadow_changes(){
    // Update Background colors (box and back element)
    const backgroundEnvironment = document.getElementById('backgroundColor').value;
    const boxEnvironment = document.getElementById('boxColor').value;
    document.getElementById("shadowBackground").style.background = backgroundEnvironment;
    shadowBox.style.background = boxEnvironment;

    // Update Shadow
    const boxShadow = getShadowString()
    shadowBox.style.boxShadow = boxShadow;
    shadowBox.style.webkitBoxShadow = boxShadow;
    shadowBox.style.mozBoxShadow = boxShadow;
    document.getElementById("normal").innerHTML = boxShadow;
    document.getElementById("webkit").innerHTML = boxShadow;
    document.getElementById("moz").innerHTML = boxShadow;
}

function hexToRGB(hex, opacity) {
    const hexOpacity = (~~(opacity * 255)).toString(16)
    const fixHexOpacity = hexOpacity.length === 1 ? `0${hexOpacity}` : hexOpacity
    return hex + fixHexOpacity
}