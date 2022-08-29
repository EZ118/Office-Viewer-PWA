OneDrag = document.getElementById("OneDrag");
Container = document.getElementById("container");
WebTitle = document.getElementsByTagName("title")[0];


/*
 *  docx2html Function
 */

function docx2h5(input){
	Container.innerHTML = "";
	require("docx2html")(input.files[0],{container:document.getElementById("container")})
		.then(html=>{
			Container.setAttribute("style", "display:block;");
			OneDrag.setAttribute("style", "background:rgba(200, 200, 200, 0.0);");
			WebTitle.innerText = "文稿 - " + input.files[0].name;
		});
}


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
	
	WebTitle.innerText = "文稿 - " + e.dataTransfer.files[0].name;
	docx2h5(e.dataTransfer);
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
			docx2h5(launchParams);
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