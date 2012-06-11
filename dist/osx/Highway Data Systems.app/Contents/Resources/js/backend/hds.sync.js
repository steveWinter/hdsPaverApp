

hds.sync = hds.sync || {}



hds.sync.sendLoad = function(load) {
	var syncSuccessful = false;
	hds.sync.isSyncing = true;

	$.ajax({
		url : settings.getRemoteServer(),
		type : 'POST',
		data : load,
		timeout : settings.requestTimeout,
		beforeSend : function() {
			//
		},
		success : function(responseData, text, xhrobject) { 
			if (responseData != '' && text != '' && xhrobject != undefined) {
				if (xhrobject.status == 200) {
					var response = JSON.parse(responseData);	
					load.sent = response.code;
					hds.sync.isSyncing = false;
					
					switch(load.sent) { 
						case config.syncCodes.succes:
							syncSuccessful 	= true;
							load.sent		= 100
							break;

						default:
							//
					}
				}
			} else {
				load.sent	= 103;
			}
			hds.loads.updateInterface(load);
		},
		error : function(responseData) {
			load.sent	= 104;
			hds.loads.updateInterface(load);
		}
	});
}

