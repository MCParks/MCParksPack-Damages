var github = "https://raw.githubusercontent.com/RyanHecht/MCParks-ResourcePack/"


var branch = github + getUrlVars()["branch"] + "/assets/minecraft/models/item/"

var type = getUrlVars()["type"];
var tool = getUrlVars()["tool"];

var item = branch + getUrlVars()["type"] + ".json"

var search = getUrlVars()["search"];

console.log(search)



if (search) {
	const types = ["golden", "wooden", "stone", "iron", "diamond"];
	const tools = ["hoe", "axe", "sword", "pickaxe", "shovel"];

	const keywords = search.split("+");
	console.log(keywords)
	types.forEach(function (type, i) {
		tools.forEach(function (tool, i) {
			const item = type + "_" + tool
			getItemJson(item, function (json) {
				if (json.overrides) {

					json.overrides = json.overrides.filter(function (val) {
						if (val) {
							return keywords.some(function (v) { return val.model.indexOf(v) >= 0; })
						} else {
							return false;
						}

					})
					console.log(json.overrides);
					if (json.overrides.length > 0) {
						makeTable(document, item, json);
					}

				}
			});


		})
	})
} else if (type && tool) {
	const item = type + "_" + tool;
	getItemJson(item, function (json) {
		makeTable(document, item, json);
	});

}



function getItemJson(item, onLoad) {
	const url = "https://raw.githubusercontent.com/RyanHecht/MCParks-ResourcePack/" + getUrlVars()["branch"] + "/assets/minecraft/models/item/" + item + ".json";

	const request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onload = function (e) {
		if (request.readyState === 4) {
			if (request.status === 200) {
				onLoad(JSON.parse(request.response));
			}
		}
	}
	request.send(null);



}


function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function makeTable(document1, item, response) {
	var maxDurability;
	if (item.startsWith("gold")) maxDurability = 32;
	else if (item.startsWith("wood")) maxDurability = 59
	else if (item.startsWith("stone")) maxDurability = 131
	else if (item.startsWith("iron")) maxDurability = 251
	else if (item.startsWith("diamond")) maxDurability = 1561

	var table = document.getElementById("stuff");

	console.log((response));
	console.log()
	//let response = JSON.parse(request.response);
	for (var i = 0; i < response.overrides.length; i++) {

		var model = response.overrides[i].model
		var damage = response.overrides[i].predicate.damage

		var dValue = damage * maxDurability

		var command = "/minecraft:give @p minecraft:" + item + " 1 " + Math.round(dValue) + " {Unbreakable:1}"
		if (search == undefined || model.search(decodeURI(search)) !== -1) {
			if (model !== "item/" + item) {

				var tr = table.appendChild(document.createElement("tr"));
				var td = tr.appendChild(document.createElement("td"))
				var td1 = tr.appendChild(document.createElement("td"))
				var td2 = tr.appendChild(document.createElement("td"))
				tr.setAttribute("align", "center")
				td.appendChild(document.createTextNode(model));
				td.setAttribute("align", "center");
				td1.appendChild(document.createTextNode(Math.round(dValue)));
				td1.setAttribute("align", "center");
				td2.appendChild(document.createTextNode(command));
				td2.setAttribute("align", "center");
				//tda.setAttribute("")
				//document1.getElementById("stuff").innerHTML("<li>" + response[i].assets.browser_download_url/*browser_download_url*/ +
				//"</li>");
			}
		}
	}
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

request.send();
