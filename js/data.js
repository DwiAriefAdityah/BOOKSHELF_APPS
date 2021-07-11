const STORAGE_KEY = "BOOKSHELF_APPS";

let datas = [];

function composeDataObject(title, pengarang, date, isCompleted) {
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

function findData(dataId) {

    for(data of datas){
        if(data.id === dataId)
            return data;
    }

    return null;
}

function findDataIndex(dataId) {
    let index = 0
    for (data of datas) {
        if(data.id === dataId)
            return index;

        index++;
    }

    return -1;
}