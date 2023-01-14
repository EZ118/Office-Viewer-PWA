OneDrag = document.getElementById("OneDrag");
Container = document.getElementById("container");
WebTitle = document.getElementsByTagName("title")[0];

/*
 *	Operating Panel
 */
var con_l = document.getElementById("container_l");
con_l.onclick = function() {
	
}
LOLItem


/*
 *  Windows File Handling API
 */

if ('launchQueue' in window) {
	window.launchQueue.setConsumer(async launchParams => {
		if (launchParams.files.length) {
			const fileHandles = launchParams.files;
			fileHandles.map(handle => console.log(handle.name));
			ReadSave(launchParams);
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