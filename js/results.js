let categories = ['excellence', 'skills', 'champions', 'worlds'];
let TOTAL_AWARDS = 36;

function updateCategoryProgress(count, category, bar, counter) {
    bar.ariaValueNow = count;
    bar.style.width = ((bar.ariaValueMax / TOTAL_AWARDS) * (count / bar.ariaValueMax) * 100) + "%";
    counter.innerHTML = Math.round(count);
}

let time = 0;
function handleCategoryProgress(category) {
    let bar = document.getElementById(category + '-bar');
    let counter = document.getElementById(category + '-count');

    for (let i = 1; i <= 100; i++) {
        time += 0.06 * (-0.0004 * (i - 50) * (i - 50) + 1);
        let count = bar.ariaValueMax * 0.01 * i;
        setTimeout(() => {
            updateCategoryProgress(count, category, bar, counter);
        }, time * 1000);
    }
}

categories.forEach(handleCategoryProgress);