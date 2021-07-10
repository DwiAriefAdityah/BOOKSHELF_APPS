const storageKey = "STORAGE_KEY";

function checkForStorage() {
    return typeof (Storage) !== "undefined"
}

if (checkForStorage()) {
    // alert("berhasil masuk");
    const tambah = document.getElementById("tambah");
    const modal = document.getElementById("myModal");

    tambah.addEventListener("click", function (ev) {
        // console.log("OK");
        modal.style.display = "block";
    });

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
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

});

document.addEventListener("ondataloaded", () => {
    refreshDataFromdatas();
});

