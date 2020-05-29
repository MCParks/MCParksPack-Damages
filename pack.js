var github = "https://raw.githubusercontent.com/RyanHecht/MCParks-ResourcePack/"


var branch = github + getUrlVars()["branch"] + "/assets/minecraft/models/item/"

var item = branch + getUrlVars()["item"] + ".json"

var search = getUrlVars()["search"]
var maxDurability;

if (getUrlVars()["item"].startsWith("gold")) maxDurability = 32;
else if (getUrlVars()["item"].startsWith("wood")) maxDurability = 59
else if (getUrlVars()["item"].startsWith("stone")) maxDurability = 131
else if (getUrlVars()["item"].startsWith("iron")) maxDurability = 250
else if (getUrlVars()["item"].startsWith("diamond")) maxDurability = 1561


let b = document;
var request = new XMLHttpRequest();
let response;
request.open('get', item, true)
request.onload = function (e) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      response = JSON.parse(request.response);
	  console.log(request.response)
	  makeTable(b, response);
	  
    } else {
      console.error(request.statusText);
    }
  }
};

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function makeTable(document1, response)
{
	var table = document.getElementById("stuff");
  
	console.log((response));
	  console.log()
	  //let response = JSON.parse(request.response);
	    for (var i = 0; i < response.overrides.length; i++)
		{
			
			var model = response.overrides[i].model
			var damage = response.overrides[i].predicate.damage
			
			var dValue = damage * maxDurability
			if (search == undefined || model.search(decodeURI(search)) !== -1) {
				if (model !== "item/" + getUrlVars()["item"]) {
				
					var tr = table.appendChild(document.createElement("tr"));
					var td = tr.appendChild(document.createElement("td"))
					var td1 = tr.appendChild(document.createElement("td"))
					tr.setAttribute("align", "center")
					td.appendChild(document.createTextNode(model));
					td.setAttribute("align", "center");
					td1.appendChild(document.createTextNode(Math.round(dValue)));
					td1.setAttribute("align", "center");
					//tda.setAttribute("")
					//document1.getElementById("stuff").innerHTML("<li>" + response[i].assets.browser_download_url/*browser_download_url*/ +
					//"</li>");
				}	
			}
		}
} 

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

request.send();
