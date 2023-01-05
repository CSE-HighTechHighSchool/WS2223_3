let categories = {
    'excellence': 12,   // number of awards
    'skills': 11,
    'champions': 9,
    'worlds': 5
}
let TOTAL_AWARDS = 37;

let time = 0;
let cumulativeCount = 0;
let bar = document.getElementById('results-bar-inner');
let outerBar = document.getElementById('results-bar');

function updateCategoryProgress(barCount, counterCount, category, bar, counter) {
    // update values on bar and counter
    bar.ariaValueNow = counterCount;
    bar.style.width = ((barCount / TOTAL_AWARDS) * 100) + "%";
    counter.innerHTML = Math.round(counterCount);
    
    // if at end of category, prepare for next one
    if (counterCount === categories[category]) {
        cumulativeCount += categories[category];
    }

    // readjust the width of the linear gradient
    bar.style.backgroundSize = outerBar.offsetWidth + "px 100%";
    console.log(outerBar.offsetWidth)
}

function handleCategoryProgress(category) {
    let counter = document.getElementById(category + '-count');

    for (let i = 1; i <= 100; i++) {
        time += 0.06 * (-0.0004 * (i - 50) * (i - 50) + 1); // easing function
        let count = categories[category] * 0.01 * i;
        setTimeout(() => {
            updateCategoryProgress(cumulativeCount + count, count, category, bar, counter);
        }, time * 1000);
    }
    setTimeout(() => {
        bar.style.backgroundSize = "100%"; // set to 100% gradient width once animation finished
    }, time * 1000)
}

Object.keys(categories).forEach(handleCategoryProgress);