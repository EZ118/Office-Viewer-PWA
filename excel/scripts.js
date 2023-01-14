OneDrag = document.getElementById("OneDrag");
Container = document.getElementById("container");
WebTitle = document.getElementsByTagName("title")[0];


/*
 *  sheetjs Function
 */

var X = XLSX;

var process_wb = (function () {
	var HTMLOUT = document.getElementById('container');
	var to_html = function to_html(workbook) {
		HTMLOUT.innerHTML = "";
		workbook.SheetNames.forEach(function (sheetName) {
			var htmlstr = X.write(workbook, { sheet: sheetName, type: 'string', bookType: 'html' });
			HTMLOUT.innerHTML += htmlstr;
		});
		return "";
	};
	return function process_wb(wb) {
		to_html(wb);
	};
})();

var do_file = (function () {
	return function do_file(files) {
		var f = files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			var data = e.target.result;
			process_wb(X.read(data, { type: 'array' }));
		};
		reader.readAsArrayBuffer(f);
	};
})();

(function () {
	var SelectFileBtn = document.getElementById('SelectFileBtn');
	if (!SelectFileBtn.addEventListener) return;
	function handleFile(e) {
		console.log(e);
		WebTitle.innerText = "表格 - " + e.target.files[0].name;
		do_file(e.target.files);
	}
	SelectFileBtn.addEventListener('change', handleFile, false);
})();


/*
 *  File Drop To Upload API
 */

OneDrag.ondragover = function(e) {
	//拖拽文件未释放
	e.preventDefault();
	OneDrag.setAttribute("style", "background:rgba(200, 200, 200, 0.5);");
}

OneDrag.ondrop = function(e) {
	//拖拽文件并释放
	e.preventDefault();
	OneDrag.setAttribute("style", "background:rgba(200, 200, 200, 0.0);");
	
	WebTitle.innerText = "表格 - " + e.dataTransfer.files[0].name;
	do_file(e.dataTransfer.files);
}

OneDrag.ondragleave = function () {
	//拖拽文件后未释放，同时离开检测区
	OneDrag.setAttribute("style", "background:rgba(200, 200, 200, 0.0);");
}

/*
 *  Windows File Handling API
 */

if ('launchQueue' in window) {
	window.launchQueue.setConsumer(async launchParams => {
		if (launchParams.files.length) {
			const fileHandles = launchParams.files;
			fileHandles.map(handle => console.log(handle.name));
			do_file(launchParams.dataTransfer.files);
		}
	});
}


/*
 *  PWA Menu Shortcut API
 */
function GetUrlData() {
	let a = window.location.href + "#";
	a = a.split("#"); 
	return a[1];
}
window.onload = function() {
	if(GetUrlData() == "OD") {
		OneDrag.setAttribute("style", "height: 100%;");
	} else if(GetUrlData() == "OIB") {
		try {
			window.open(window.location.href.replace("#OIB", ""));
			window.close();
		} catch(e) {
			alert(" Failed To Open In Browser Tab! \n Please Enable 'Popup Window & Redirect'.");
		}
	}
}


/*
 *  Print&Close
 */
function closeWin() { window.opener=null;window.close(); }
function doPrint() {
	document.getElementById("TBMB").style.display="none";
	document.getElementById("TBMBonBtn").setAttribute("onclick", "TBMBon(this)");
	
	var bdhtml = window.document.body.innerHTML;
	var startStr = '<!--start-->';
	var endStr = '<!--end-->';
	var printHtml = bdhtml.substring(bdhtml.indexOf(startStr) + startStr.length, bdhtml.indexOf(endStr));
	
	window.document.body.innerHTML = printHtml;
	window.print();
	window.document.body.innerHTML = bdhtml;
}


/*
 *  Service Worker
 */

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('./sw.js')
		.then(function (registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		})
		.catch(function (err) {
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}