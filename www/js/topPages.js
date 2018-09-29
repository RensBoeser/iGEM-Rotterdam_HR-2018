function getData() {
	// Setting up loading screen
	$("#rankings").html('<h1>Loading...</h1>')

	// Gather filter inputs
	var limit = getParameterByName('limit');
	if(limit == '') limit = 1000;
	document.getElementById("formLimit").value = limit;

	var teamFilter = getParameterByName("teamName");
	document.getElementById("teamName").value = teamFilter;

	var pageFilter = getParameterByName("pageName");
	document.getElementById("pageName").value = pageFilter;

	// Gather data
	var rankings = new Array();
	$.get(`http://2018.igem.org/wiki/index.php`, {title:"Special:PopularPages", limit:limit}, function (data) {
		// Analyse and split data into rows containing iGEM wiki page info
		var start = data.indexOf('<ol');
		var end = data.indexOf('</ol>');
		var list = data.slice(start, end);
		var pageArray = list.split("\n");

		// Analyse rows for gathering specific page info
		var entry = 0;
		for(var i = 0; i < pageArray.length; i++) {
			// Check if the page is a teampage
			var index = pageArray[i].indexOf('Team:');
			if(index != -1) {
				// Slice data
				var temp = pageArray[i].slice(index + 5, pageArray[i].length);
				var url = temp.slice(0, temp.indexOf("\""));
				var fullName = url.replace("_", " ");
				url = `http://2018.igem.org/Team:${url}`;
				
				// Gather page name data
				var teamName = "";
				var pageName = "Home";
				var index = fullName.indexOf("/");
				if(index != -1) {
					var names = fullName.split('/');
					teamName = names[0];
					pageName = names[1];
				} 
				else teamName = fullName;

				// Gather page views data
				var views = temp.slice(temp.indexOf("</a>‏‎ (") + 8, temp.indexOf(" views")).replace(",", "");

				// Check if the page is not an iGEM example page
				if(teamName.toLowerCase().indexOf("example") == -1) {
					rankings[entry] = {teamName:teamName, pageName:pageName, views:views, url:url};
					entry++;
				}
			}
		}
	// Filter data and display on page
	displayRankings(filterRankingsPagename(filterRankingsTeamname(rankings, teamFilter), pageFilter));
	});
}

function displayRankings(rankings) {
if(rankings.length == 0) {
	$("#rankings").html('<h1>No results! Use different filters or increase search limit.</h1>')
}
else {
	console.log("Displaying results");
	var content = "<table> <tr> <th>Rank</th> <th>Views</th> <th>Team name</th> <th>Page name</th> <th>URL</th> </tr>";
	for(var i = 0; i < rankings.length; i++) {
		content += `
		<tr>
			<td>${i + 1}</td>
			<td>${rankings[i].views}</td>
			<td><a target="_blank" href="${rankings[i].url}">${rankings[i].teamName}</a></td>
			<td><a target="_blank" href="${rankings[i].url}">${rankings[i].pageName}</a></td>
			<td><a target="_blank" href="${rankings[i].url}">${rankings[i].url}</a></td>
		</tr>
		`;
	}
	content += '</table>'
	$("#rankings").html(content);
}
}

function filterRankingsTeamname(rankings, teamname) {
if(teamname == "") return rankings;
var filtered = new Array();
var entry = 0;
console.log("Filtering pages on team name");
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
console.log("Filtering pages on page name");
for(var i = 0; i < rankings.length; i++) {
	if(rankings[i].pageName.toLowerCase().indexOf(pagename.toLowerCase()) != -1) {
		filtered[entry] = rankings[i];
		entry++;
	}
}
return filtered;
}

function getParameterByName(name) {
// This function reads a specific parameter from the url and returns its value
var url = window.location.href;
name = name.replace(/[\[\]]/g, '\\$&');
var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	results = regex.exec(url);
if (!results) return '';
if (!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
