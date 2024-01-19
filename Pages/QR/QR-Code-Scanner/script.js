const wrapper = document.querySelector('.wrapper'),
    form = wrapper.querySelector('form'),
    fileInput = form.querySelector('input'),
    infoText = form.querySelector('p'),
    copyBtn = wrapper.querySelector('.copy'),
    closeBtn = wrapper.querySelector('.close');

function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code...";
    fetch("https://api.qrserver.com/v1/read-qr-code/", { 
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Uplaod QR Code to Scan" : "Could't Scan QR Code";
        if(!result) return;
        wrapper.querySelector('textarea').innerText = result;
        form.querySelector('img').src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Could't Scan QR Code";
    });
}


fileInput.addEventListener("change", e => {
    let file = e.target.files[0];//getting user selected file
    if(!file) return;
    let formData = new FormData();//creating new formdata object
    formData.append("file", file); //adding selected file to formdata
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInput.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));