function getData() {
		$("#rankings").html('<h1>Loading...</h1>')
		var rankings = new Array();

		var limit = getParameterByName('limit');
		if(limit == '') limit = 1000;
		document.getElementById("formLimit").value = limit;

		var teamFilter = getParameterByName("teamName");
		document.getElementById("teamName").value = teamFilter;

		var pageFilter = getParameterByName("pageName");
		document.getElementById("pageName").value = pageFilter;

		$.get(`http://2018.igem.org/wiki/index.php`, {title:"Special:PopularPages", limit:limit}, function (data) {
			var start = data.indexOf('<ol');
			var end = data.indexOf('</ol>');
			var list = data.slice(start, end);
			var pageArray = list.split("\n");
			var entry = 0;
			for(var i = 0; i < pageArray.length; i++) {
				var index = pageArray[i].indexOf('Team:');
				if(index != -1) {
					var temp = pageArray[i].slice(index + 5, pageArray[i].length);
					var url = temp.slice(0, temp.indexOf("\""));
					console.log(url);
					var fullName = url.replace("_", " ");
					url = `http://2018.igem.org/Team:${url}`;
					var teamName, pageName = "";
					var hasPageName = false;
					var index = fullName.indexOf("/");
					if(index != -1) {
						hasPageName = true;
						var names = fullName.split('/');
						teamName = names[0];
						pageName = names[1];
					} 
					else teamName = fullName 
					var views = temp.slice(temp.indexOf("</a>‏‎ (") + 8, temp.indexOf(" views")).replace(",", "");
					if(teamName.toLowerCase().indexOf("example") == -1) {
						if(hasPageName) {
							rankings[entry] = {teamName:teamName, pageName:pageName, views:views, url:url};
						}
						else {
							rankings[entry] = {teamName:teamName, pageName:"Home", views:views, url:url};
						}
						entry++;
					}
				}
			}
		displayRankings(filterRankingsPagename(filterRankingsTeamname(rankings, teamFilter), pageFilter));
		});
}

function displayRankings(rankings) {
	if(rankings.length == 0) {
		alert("No results! Use different filters or increase search limit.");
	}
	else {
		console.log("Displaying results");
		var content = "Team;Page;Views<br>";
		for(var i = 0; i < rankings.length; i++) {
			content += `<a target=\"_blank\" href=\"${rankings[i].url}\"><b>${i+1}.</b>  <b>Team:</b> ${rankings[i].teamName} | <b>Page:</b> ${rankings[i].pageName} | <b>Views:</b> ${rankings[i].views}</a><br>`;
		}
		$("#rankings").html(content);
	}
}

function filterRankingsTeamname(rankings, teamname) {
	if(teamname == "") return rankings;
	var filtered = new Array();
	var entry = 0;
	console.log("Starting team filter");
	for(var i = 0; i < rankings.length; i++) {
		if(rankings[i].teamName.toLowerCase().indexOf(teamname.toLowerCase()) != -1) {
			filtered[entry] = rankings[i];
			entry++;
		}
	}
	
	return filtered;
}

function filterRankingsPagename(rankings, pagename) {
	if(pagename == "") return rankings;
	var filtered = new Array();
	var entry = 0;
	console.log("Starting page filter");
	for(var i = 0; i < rankings.length; i++) {
		if(rankings[i].pageName.toLowerCase().indexOf(pagename.toLowerCase()) != -1) {
			filtered[entry] = rankings[i];
			entry++;
		}
	}
	return filtered;
}

function getParameterByName(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return '';
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}