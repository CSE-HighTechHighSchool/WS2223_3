var fieldElementData;
fetch('../data/fieldElementData.json')
    .then(response => response.json())
    .then(data => {fieldElementData = data;})
    .then(promise => {
        Array.prototype.forEach.call(document.getElementsByClassName('field-point'), element => {
            element.onclick = changeFieldData;
        });
    });

function updateDataElements(data, fieldElement) {
    Object.entries(data).forEach(([key, val]) => {
        document.getElementById(key).innerHTML = val;
    })
}

function changeFieldData(event) {
    let fieldElement = event.target.dataset.fieldElement;
    
    // remove message before first click and show data elements
    document.getElementById("field-click-message").style.display = "none";
    document.getElementById("field-data-elements").style.display = "block";

    // change circle outline to indicate focus
    Array.prototype.forEach.call(document.getElementsByClassName('field-point'), element => {
        element.style.stroke = "black";
    });
    event.target.style.stroke = "blue";

    // update with selected field element's data
    updateDataElements(fieldElementData[fieldElement], fieldElement);
}