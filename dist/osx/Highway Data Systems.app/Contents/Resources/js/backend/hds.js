var hds = hds || {};

/**
 * Init the hds framework and all necessary parts
 *
 * @author Steve Winter
 */
hds.init = function() { 
	// Set the app title
	//hds.setTitle('Wunderlist' + (wunderlist.account.isLoggedIn() && wunderlist.account.email != '' ? ' - ' + wunderlist.account.email : ''));
	
	// Set the os version
	hds.os = Titanium.Platform.name.toLowerCase();
	hds.version = Titanium.App.version.toString();
	
	// for testing purposes tables can be cleared
	//Titanium.App.Properties.removeProperty('dropTables');
	Titanium.App.Properties.setString('paverID', 'paver123');
	
	
	//wunderlist.language.init();
	
	// Create the database structure
	hds.database.init();
	
	// initialise other settings
	settings.init();
	
	// see if there are any unsent entries in the database
	
	// initialise the load
	hds.loads.init();
	
	//wunderlist.sync.init();
		
	// Init some other necessary stuff
	// TODO: add the wunderlist prefix
	//wunderlist.account.init();
	//wunderlist.timer.init();
	//menu.initializeTrayIcon();
	//wunderlist.sharing.init();
	//wunderlist.notifications.init();
	//share.init();
	
	// Check for a new version
	//wunderlist.updater.checkVersion();	
	
	// Add the wunderlist object to the current window
	Titanium.UI.getCurrentWindow().hds = hds;
	
	// Enable shutdown fix
	Titanium.API.addEventListener(Titanium.EXIT, function() {
		Titanium.Platform.canShutdown();
	});
};

/**
 * Set the app title
 *
 * @author Daniel Marschner 
 */
hds.setTitle = function(title) {
	document.title = title;
};

function showMe(data) {
	Titanium.API.debug(data);
}

/*************************************************************************************/
// Start the wunderlist framework
$(function() {  hds.init(); });

