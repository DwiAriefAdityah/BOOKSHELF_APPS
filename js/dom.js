const UNCOMPLETED_LIST_DATA_ID = "wraper-sedangBaca";
const DATA_ITEMID = "itemId";


function tambahData(){
    const uncompletedDATAList = document.getElementById(UNCOMPLETED_LIST_DATA_ID);

    const title = document.getElementById("title").value;
    const pengarang = document.getElementById("pengarang").value;
    const date = document.getElementById("date").value;

    const data = buatData(title, pengarang, date, false); //bermasalah
    const dataObject = composeDataObject(title, pengarang, date, false);

    data[DATA_ITEMID] = dataObject.id;
    datas.push(dataObject);

    // uncompletedTODOList.append(todo);

    alert("Data Masuk");
    // window.location.reload(false);

    updateDataToStorage();
}

function buatData(title, pengarang, date, isCompleted){
    const iLogo = document.createElement("i");
    iLogo.classList.add("fas", "fa-trash-alt");

    const textDate = document.createElement("h4");
    textDate.innerText = date;

    const textContainer = document.createElement("div");
    textContainer.classList.add("aksi-box");
    textContainer.append(iLogo, textDate);

    // const aksiBox = textContainer.append(iLogo, textDate);

    const textp = document.createElement("p");
    textp.innerText = pengarang;

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textBox = document.createElement("div");
    textBox.classList.add("box");
    textBox.append(textContainer, textp, textTitle);
}

function refreshDataFromdatas(){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_DATA_ID);
    // let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    for(data of datas){
        const newData = buatData(data.title, data.pengarang, data.date, data.isCompleted);
        newData[DATA_ITEMID] = data.id;

        if(data.isCompleted){
            // listCompleted.append(newData);
            alert("SALAH");
        } else {
            listUncompleted.append(newData);
            alert("Masuk");
        }
    }
}

function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        datas = data;

    document.dispatchEvent(new Event("ondataloaded"));
}