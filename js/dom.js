const UNCOMPLETED_LIST_DATA_ID = "wraper-sedangBaca";
const COMPLETED_LIST_DATA_ID = "wraper-selesaiBaca";

function tambahData() {
	const title = document.getElementById("title").value;
	const pengarang = document.getElementById("pengarang").value;
	const date = document.getElementById("date").value;

	const dataObject = composeDataObject(title, pengarang, date, false);

	datas.push(dataObject);

	alert("Berhasil Menambah BUKU");
	
	updateDataToStorage();
}

function buatData(id, title, pengarang, date, isCompleted) {
	const dataid = id;

	const textTitle = document.createElement("h3");
	textTitle.innerText = title;
	
	const logoBox = document.createElement("div");
	logoBox.classList.add("aksi-box");

	if (isCompleted == false) {	
		logoBox.append(
			createThumbtackButton(dataid),
			createTrashButton(dataid)
		);
	}else{
		logoBox.append(
			createUndoButton(dataid),
			createTrashButton(dataid)
		);
	}

	const textp = document.createElement("p");
	textp.innerText = pengarang;

	const textDate = document.createElement("h4");
	textDate.innerText = date;

	const textBox = document.createElement("div");
	textBox.classList.add("box");
	textBox.append(textTitle, textp, textDate, logoBox);

	return textBox;
}

function createUndoButton(id) {
	const ilogoUndo = "fa-undo-alt";
	
    return createButton(ilogoUndo, function (event) {
        undoTaskFromCompleted(id);
    });
}

function createTrashButton(id) {
	const ilogoTrash = "fa-trash-alt";
    return createButton(ilogoTrash, function (event) {
        removeTaskFromCompleted(id);
    });
}

function createThumbtackButton(id) {
	const ilogoThumbtack = "fa-thumbtack"; 
    return createButton( ilogoThumbtack ,function (event) {
        addTaskToCompleted(id);
    });
}

function createButton(buttonTypeClass /* string */, eventListener /* Event */) {
    const button = document.createElement("i");
	button.classList.add("fas");
	button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
	
    return button;
}

function refreshDataFromdatas() {
	const listUncompleted = document.getElementById(UNCOMPLETED_LIST_DATA_ID);
	const listCompleted = document.getElementById(COMPLETED_LIST_DATA_ID);

	for (data of datas) {
		const newData = buatData(data.id, data.title, data.pengarang, data.date, data.isCompleted);

		if (data.isCompleted) {
			listCompleted.append(newData);
		} else {
			listUncompleted.append(newData);
		}
	}
}

function addTaskToCompleted(id) {
	const data = findData(id);
	if (data.isCompleted == false) {
		data.isCompleted = true;
		updateDataToStorage();
		alert("Buku Selesai di Baca");
		window.location.reload(true);
	}
}

function undoTaskFromCompleted(id) {
	const data = findData(id);
	if (data.isCompleted == true) {
		data.isCompleted = false;
		updateDataToStorage();
		alert("Mengembalikan ke List Sedang Baca");
		window.location.reload(true);
	}
}

function removeTaskFromCompleted(id) {
	const dataIndex = findDataIndex(id);
	
    datas.splice(dataIndex, 1);
	alert("Berhasil Menghapus Buku");
    updateDataToStorage();
	window.location.reload(true);
}

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);

	let data = JSON.parse(serializedData);

	if (data !== null)
		datas = data;
		console.log("loadDataFromStorage Success");

	document.dispatchEvent(new Event("ondataloaded"));
}