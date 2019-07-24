
//thank you iChrome
browser.webRequest.onBeforeRequest.addListener(
	function() {
		return {
			redirectUrl: "moz-extension://" + browser.i18n.getMessage("@@extension_id") + "/index.html"
		};
	},
	{
		urls: ["https://bonjourr.fr/redirect"]
	}
);

function intro(infolistener) {

	browser.management.getSelf().then((infoself) => {

		//check si l'ext installé est la meme que bonjourr
		if (infoself.id === infolistener.id) {

			browser.storage.local.get().then((data) => {

				//si l'intro a deja été dismiss alors welcome back
				if (data.isIntroduced === true) browser.storage.local.set({"welcomeback": true});

				browser.tabs.create({
					url:"../../index.html"
				});
			});
		}
	});	
}

//appelle intro à chaque install
browser.management.onInstalled.addListener(intro);


browser.storage.local.get().then((data) => {

	var url =  "https://bonjourr.fr/";

	if (data.lang === "fr") {
		url += "fr/goodbye";
	} else {
		url += "goodbye";
	}

	browser.runtime.setUninstallURL(url);
});