Container = document.getElementById("container");
WebTitle = document.getElementsByTagName("title")[0];

/*
 *  All Office Listing Function
 *  Edit Configurations in "office.cfg"
 */

for(let i = 0; i < DIR.length; i ++) {
	Container.innerHTML += `
		<a href=".` + DIR[i].path + `" target="_blank" id="ITEM_` + i + `">
			<div class="ListItem"><br>
				<img src=".` + DIR[i].path + `icon.png"><br><br>
				<label>` + DIR[i].name + `</label><br>
			</div>
		</a>
	`;
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
	if(GetUrlData() == "AIOM") {
		for(let i = 0; i < DIR.length; i ++) {
			try{document.getElementById("ITEM_" + i).removeAttribute("target");}
			catch(e){}
		}
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