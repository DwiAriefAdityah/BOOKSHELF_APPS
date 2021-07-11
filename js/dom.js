const UNCOMPLETED_LIST_DATA_ID = "wraper-sedangBaca";
const COMPLETED_LIST_DATA_ID = "wraper-selesaiBaca";
const DATA_ITEMID = "itemId";

function tambahData() {
	const title = document.getElementById("title").value;
	const pengarang = document.getElementById("pengarang").value;
	const date = document.getElementById("date").value;

	const data = buatData(title, pengarang, date, false);
	const dataObject = composeDataObject(title, pengarang, date, false);

	datas.push(dataObject);

	alert("Berhasil Menambah BUKU");
	
	updateDataToStorage();
}

function buatData(id, title, pengarang, date, isCompleted) {
	// const contentList = document.getElementById(UNCOMPLETED_LIST_DATA_ID);

	const textTitle = document.createElement("h3");
	textTitle.innerText = title;
	
	

	

	const logoBox = document.createElement("div");
	logoBox.classList.add("aksi-box");

	if (isCompleted == false) {
		
		logoBox.append(
			createThumbtackButton(),
			createTrashButton()
		);
		// logoBox.append(ilogoThumbtack);
	}else{
		logoBox.append(
			createUndoButton(),
			createTrashButton()
		);
		console.log("UNDO MASUK");
		// logoBox.append(ilogoUndo);
	}

	// logoBox.append(ilogoTrash);

	const textp = document.createElement("p");
	textp.innerText = pengarang;

	const textDate = document.createElement("h4");
	textDate.innerText = date;

	const textBox = document.createElement("div");
	textBox.classList.add("box");
	textBox.append(textTitle, textp, textDate, logoBox);

	return textBox;

	// contentList.appendChild(textBox);
}

function createUndoButton() {
	const ilogoUndo = "fa-undo-alt";
	
    return createButton(ilogoUndo, function (event) {
        // undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
	const ilogoTrash = "fa-trash-alt";
	
    return createButton(ilogoTrash, function (event) {
        // removeTaskFromCompleted(event.target.parentElement);
    });
}

function createThumbtackButton() {
	// console.log("Tumbtack Created");
	// const ilogoThumbtack = document.createElement("i");
	const ilogoThumbtack = "fa-thumbtack"; 
	return createButton(ilogoThumbtack);
    // return createButton( ilogoThumbtack ,function (event) {
    //     // addTaskToCompleted(event.target.parentElement);
	// 	alert("thumtack clicked");
    // });
}

function createButton(buttonTypeClass /* string , eventListener /* Event */) {
    const button = document.createElement("i");
	button.classList.add("fas");
	button.classList.add(buttonTypeClass);
    // button.classList.add("fas" +buttonTypeClass);
    // button.addEventListener("click", function (event) {
    //     eventListener(event);
    //     event.stopPropagation();
    // });
	
    return button;
	
}

function refreshDataFromdatas() {
	const listUncompleted = document.getElementById(UNCOMPLETED_LIST_DATA_ID);
	const listCompleted = document.getElementById(COMPLETED_LIST_DATA_ID);

	for (data of datas) {
		const newData = buatData(data.id, data.title, data.pengarang, data.date, data.isCompleted);
		// newData[DATA_ITEMID] = data.id;

		if (data.isCompleted) {
			listCompleted.append(newData);
			// listCompleted.newData;
			// alert("Benar");
		} else {
			listUncompleted.append(newData);
			// listUncompleted.newData;
			// alert(data.isCompleted);
		}
	}
}

function loadDataFromStorage() {
	const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);

	let data = JSON.parse(serializedData);

	if (data !== null)
		datas = data;
		console.log("loadDataFromStorage Success");

	document.dispatchEvent(new Event("ondataloaded"));
}