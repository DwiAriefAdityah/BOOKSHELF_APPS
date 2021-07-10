const storageKey = "STORAGE_KEY_book";

const clickTambah = document.getElementById("tambah");
const submitAction = document.getElementById("form");

// Fungsi ini akan mengembalikan nilai true jika fitur web storage didukung oleh browser dan false jika tidak
function checkForStorage() {
	return typeof (Storage) !== "undefined"
};

clickTambah.addEventListener("click", function (ev) {
	const modal = document.getElementById("myModal");
	const span = document.getElementsByClassName("close")[0];
	if (checkForStorage()) {
		modal.style.display = "block";

		// Ketika "close" di klik
		span.onclick = function () {
			modal.style.display = "none";
		};

		// Ketika klik sembarang tempat
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		};
	} else {
		alert("Browser Anda Tidak Mendukung Web Storage!");
	}
});

submitAction.addEventListener("submit", function (event) {
	const inputTitle = document.getElementById("title").value;
	const inputPengarang = document.getElementById("pengarang").value;
	const inputTahun = document.getElementById("date").value;
	const newData = {
		judul: inputTitle,
		pengarang: inputPengarang,
		tahunTerbit: inputTahun,
	}
	putList(newData);
	renderUserList();
});

function putList(datax) {
	if (checkForStorage()) {
		let data = [];
		if (localStorage.getItem(storageKey) === null) {
			data = [];
		} else {
			data = JSON.parse(localStorage.getItem(storageKey));
		}
		data.unshift(datax);
		if (data.length > 5) {
			data.pop();
		}
		localStorage.setItem(storageKey, JSON.stringify(data));
	}
}

function getList() {
	if (checkForStorage()) {
		return JSON.parse(localStorage.getItem(storageKey)) || [];
	} else {
		return [];
	}
}

function renderList() {
	let getData = getList();
	const contentList = document.querySelector("#wraper-sedangBaca");

	for (let d of getData) {
		const textTitle = document.createElement("h3");
		textTitle.innerText = d.judul;

		const textp = document.createElement("p");
		textp.innerText = d.pengarang;

		const textDate = document.createElement("h4");
		textDate.innerText = d.tahunTerbit;

		const textBox = document.createElement("div");
		textBox.classList.add("box");
		textBox.append(textTitle, textp, textDate);

		contentList.appendChild(textBox);
	}
}

window.addEventListener("load", function () {
	if (checkForStorage) {
		if (localStorage.getItem(storageKey) !== null) {
			let data = getList();
			renderList(data);
		}
	} else {
		alert("Browser yang Anda gunakan tidak mendukung Web Storage")
	}
});