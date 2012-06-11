
 hds.loads = hds.loads || {};
 //var load = load || {};

/**
 * 
 */
 hds.loads.init = function() {
 	$('#barcode').change(function() {
 		hds.loads.createEntry($('#barcode').val());
 	});
 	$('#loadTable').html(hds.loads.loadTable());
 };

/**
 * Manage the creation of the load in the local DB, 
 * then try and push it to the remote DB - on sucess, update
 * the local DB field and the user interface
 */
 hds.loads.createEntry = function(barcode) { showMe(barcode);
 	var load 		= hds.loads.setDefault();
 	load.truck		= barcode;
 	load.action		= 'arrive';

 	// create the record locally
 	load.id			= hds.database.addLoad(load);
 	
 	// try to call the remote server
 	if (Titanium.Network.online == true) {
 		hds.sync.sendLoad(load);
 	} else {
 		load.sent	= 105;
		hds.loads.updateInterface(load);
 	}
 	
 	// clear the field
 	$('#barcode').val('');
 };
 

 hds.loads.setDefault = function() { 
 	var tmp				= {};
 	tmp.installationID	= settings.getInstallationID();
 	tmp.paverID			= settings.getPaverID();

 	return tmp;
 };



 hds.loads.loadTable = function() {
	var todaysLoads		= hds.database.todaysLoads();
	var html			= '<table id="loadTableTable"><thead><tr><th>Truck</th><th>Action</th><th>Result</th></tr></thead><tbody>';
	if(todaysLoads.length > 0) { 
		$.each(todaysLoads, function() {
			html	  += hds.loads.loadRow(this); 
		});
	} else {
		html		   += '<tr id="noLoads"><td colspan="3">No loads to show for today</td></tr>';
	}
	html			   += '</tbody></table>';
	
	return html;
}

 hds.loads.loadRow = function(load) {
 	var row = '<tr><td>'+load.truck+'</td><td>'+load.action+'</td><td>'+load.sent+'</td></tr>';
 	return row;
 }

 hds.loads.updateInterface = function(load) {
 	hds.database.syncLoad(load);
 	 if($('#noLoads')) {
 		$('#noLoads').remove();
 	}
	$('#loadTableTable').append(hds.loads.loadRow(load));
 }
