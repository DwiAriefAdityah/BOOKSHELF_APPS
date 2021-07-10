const UNCOMPLETED_LIST_DATA_ID = "wraper-sedangBaca";
const DATA_ITEMID = "itemId";


function tambahData() {
	// const uncompletedDATAList = document.getElementById(UNCOMPLETED_LIST_DATA_ID);

	const title = document.getElementById("title").value;
	const pengarang = document.getElementById("pengarang").value;
	const date = document.getElementById("date").value;

	const data = buatData(title, pengarang, date, false); //bermasalah
	const dataObject = composeDataObject(title, pengarang, date, false);

	// data[DATA_ITEMID] = dataObject.id;
	datas.push(dataObject);

	// uncompletedTODOList.append(todo);

	alert("Data Masuk");
	// window.location.reload(false);

	updateDataToStorage();
}

function buatData(title, pengarang, date, isCompleted) {
	const contentList = document.getElementById(UNCOMPLETED_LIST_DATA_ID);

	const textTitle = document.createElement("h3");
	textTitle.innerText = title;
	
	const ilogoTrash = document.createElement("i");
	ilogoTrash.classList.add("fas" ,"fa-trash-alt");

	const ilogoThumbtack = document.createElement("i");
	ilogoThumbtack.classList.add("fas" ,"fa-thumbtack");

	const logoBox = document.createElement("div");
	logoBox.classList.add("aksi-box");
	if (isCompleted == false) {
		logoBox.append(ilogoThumbtack);
	}
	logoBox.append(ilogoTrash);

	const textp = document.createElement("p");
	textp.innerText = pengarang;

	const textDate = document.createElement("h4");
	textDate.innerText = date;

	const textBox = document.createElement("div");
	textBox.classList.add("box");
	textBox.append(textTitle, textp, textDate, logoBox);

	contentList.appendChild(textBox);
}

function refreshDataFromdatas() {
	const listUncompleted = document.getElementById(UNCOMPLETED_LIST_DATA_ID);
	// let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

	for (data of datas) {
		const newData = buatData(data.title, data.pengarang, data.date, data.isCompleted);
		// newData[DATA_ITEMID] = data.id;

		if (data.isCompleted) {
			// listCompleted.append(newData);
			alert("SALAH");
		} else {
			newData;
			// alert("Masuk");
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