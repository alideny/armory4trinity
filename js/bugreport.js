

function updateReportLength() {
	document.getElementById('DescriptionCharactersLeft').innerHTML = 1000-document.getElementById('reportDescription').value.length+' characters left';
}

function openReport() {
	document.getElementById('bugreport').style.display ='block';
}

function closeReport() {
}

function reportValidateDescription() {
		return false;
	}else if(desc.length>1000) {
		return false;
	}
	return true;
}

function reportBug() {
	if(!reportValidateDescription()) return;
	var location = parent.location;
	var userAgent = navigator.userAgent;

	AJAX = getAjaxObject();
	if(AJAX) {
       var params = 'userInput='+userInput+'&location='+location+'&userAgent='+userAgent;
       AJAX.open("POST", url, true);
       AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	   AJAX.setRequestHeader("Content-length", params.length);
	   AJAX.setRequestHeader("Connection", "close");
       AJAX.onreadystatechange = function() {
			if(AJAX.readyState == 4 && AJAX.status == 200) {
				if(AJAX.responseText == 1) {
                     closeReport();
                     return;
				}else if(AJAX.responseText == -1) {
				}
				else reportError();
			}else if(AJAX.readyState == 4 && Number(AJAX.status) >= 400) {
			}
	   }
	   AJAX.send(params);
	}else reportError();

}

function reportError() {
	closeReport();
}