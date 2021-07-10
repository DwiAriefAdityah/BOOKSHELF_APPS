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
	
	const ilogoTrash = document.createElement("i");
	ilogoTrash.classList.add("fas" ,"fa-trash-alt");

	const ilogoThumbtack = document.createElement("i");
	ilogoThumbtack.classList.add("fas" ,"fa-thumbtack");

	const ilogoUndo = document.createElement("i");
	ilogoUndo.classList.add("fas", "fa-undo-alt");

	const logoBox = document.createElement("div");
	logoBox.classList.add("aksi-box");

	if (isCompleted == false) {
		logoBox.append(ilogoThumbtack);
	}else{
		logoBox.append(ilogoUndo);
	}

	logoBox.append(ilogoTrash);

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