const storageKey = "STORAGE_KEY";

function checkForStorage() {
    return typeof (Storage) !== "undefined"
}

if (checkForStorage()) {
    const tambah = document.getElementById("tambah");
    const modal = document.getElementById("myModal");

    tambah.addEventListener("click", function (ev) {
        if (datas.length < 10) {
            const titleModal = document.getElementById("titleModal");
	        titleModal.innerText="Tambah Buku";
            modal.style.display = "block";
        }else{
            alert("Mencapaik Maksimal Buku Bacaan, Kamu Hanya dapat Membaca 10 Buku");
        }
    });

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";        
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const submitForm /* HTMLFormElement */ = document.getElementById("form");
    submitForm.addEventListener("submit", function (event) {
        tambahData();
    });
    loadDataFromStorage();
    
    const totalBaca = document.getElementById("totalBaca");
    totalBaca.innerText = "Total Data " +datas.length+ " / 10";
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromdatas();
});
