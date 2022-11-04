var fieldElementData;

// fetch data from json and parse
fetch('data/fieldElementData.json')
    .then(response => response.json())
    .then(data => {fieldElementData = data;})
    .then(promise => {
        Array.prototype.forEach.call(document.getElementsByClassName('field-point'), element => {
            element.onclick = changeFieldData;  // set listener for green dot clicks
        });
    });

function updateDataElements(data, fieldElement) {
    // set appropriate data for each field
    Object.entries(data).forEach(([key, val]) => {
        let dataElement = document.getElementById(key);
        let dataElementHeader;
        if (key !== "field-element-title") {
            dataElementHeader = document.getElementById(key + "-header");
        }
        
        // if the field is blank, hide it
        if (val !== "") {
            dataElement.innerHTML = val;
            dataElement.style.display = "block";
            try { dataElementHeader.style.display = "block"; } catch {}
        } else {
            dataElement.innerHTML = "";
            dataElement.style.display = "none";
            try { dataElementHeader.style.display = "none"; } catch {}
        }
        
    })
}

function changeFieldData(event) {
    let fieldElement = event.target.dataset.fieldElement;
    
    // remove page load message and show data elements
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