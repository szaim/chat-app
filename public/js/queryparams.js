function getUrlParameter(key) {
	var search = location.search.replace("?", "").split("&");
	var value;
	search.forEach(function(item) {
		item = item.split("=");
		if(item[0] == key) {
			value = item[1];
			return false;
		}
	});

	return value;

}
