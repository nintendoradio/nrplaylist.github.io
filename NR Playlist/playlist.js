//prepare variables
var DOMtext = document.createTextNode("test");
var DOMnative = document.createElement("span");
DOMnative.appendChild(DOMtext);

//main work for each case
function HTMLescape(html){
  DOMtext.nodeValue = html;
  return DOMnative.innerHTML
}

$(document).ready(function () {
    var table = $('#example')
    	.on('init.dt', function (e, settings, json) {
    		$('#totalNb').text(json.length.toLocaleString('en-US'));
    	})
    	.DataTable({
		ajax: {
		    url: 'playlist.json',
		    dataSrc: function (json) {
						for (var i = 0 ; i < json.length ; i++) {
							json[i].artist = HTMLescape(json[i].artist);
							json[i].title = HTMLescape(json[i].title);
						}
						return json;
				}
		},
		columns: [
		    { data: 'artist', className: 'artistCell' },
		    { data: 'title', className: 'titleCell' },
		    { data: 'length', className: 'lengthCell' },
		],
		order: [[0, 'asc'], [1, 'asc']],
		language: {
			search: '_INPUT_',
			searchPlaceholder: 'Search for songs...'
		},
		paging: false
	});
});
