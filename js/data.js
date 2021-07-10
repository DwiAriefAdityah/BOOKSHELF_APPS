const STORAGE_KEY = "BOOKSHELF_APPS";

let datas = [];

function composeDataObject(title, pengarang, date, isCompleted) {
    // window.location.reload(false);
    return {
        id: +new Date(),
        title,
        pengarang,
        date,
        isCompleted
    };
}

function updateDataToStorage(){
    const parsed = JSON.stringify(datas);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}