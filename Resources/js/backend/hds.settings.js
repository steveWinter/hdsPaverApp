/**
 * hds.settings.js
 * 
 * Manages settings for the application
 * 
 * @author Steve Winter
 * 
 * @date 2012-06-08
 */

var settings = settings || {}

settings.init = function() {
	settings.shortcutkey           = (Titanium.Platform.name.toLowerCase() == 'darwin') ? 'command' : 'Ctrl';
	
	// The timeout for sending a request e.g. with AJAX
	settings.requestTimeout = 100 * 1000 *10000;	
	
	// Count how often the program has been started
	var runtime = Titanium.App.Properties.getString('runtime', '1');
	runtimeInt  = parseInt(runtime);
	runtime++;
	Titanium.App.Properties.setString('runtime', runtime.toString());
	
	settings.os = Titanium.Platform.name.toLowerCase();
	
	if (Titanium.App.Properties.hasProperty('firstRun') == false) {
		Titanium.App.Properties.setString('firstRun', '0');
		Titanium.App.Properties.setString('userHeight', config.defaultWindowHeight);
		Titanium.App.Properties.setString('userWidth', config.defaultWindowWidth);
		Titanium.App.Properties.setString('runtime', '1');
		Titanium.App.Properties.setString('remoteServer', config.defaultRemoteServer);
		Titanium.App.Properties.setString('installationID', md5(new Date().getTime()));
		// TODO get them to provide the plantID number of the piece of kit - this needs to be done in a dialog, then saved
		Titanium.App.Properties.setString('paverID', 'paver123');
	} else {
		// Load Window Size and Position
		var currentWindow = Titanium.UI.getMainWindow();
		
		if (Titanium.App.Properties.getString('maximized', 'false') == 'true') {
			currentWindow.maximize();
		} else {
			currentWindow.height = parseInt(Titanium.App.Properties.getString('userHeight', config.defaultWindowHeight));
			currentWindow.width  = parseInt(Titanium.App.Properties.getString('userWidth',  config.defaultWindowWidth));
			var userX = Titanium.App.Properties.getString('userX', 'none');
			var userY = Titanium.App.Properties.getString('userY', 'none');

			if(userX != 'none') currentWindow.x = parseInt(userX);
			if(userY != 'none') currentWindow.y = parseInt(userY);
		}
	}
	
	settings.positionSaved = false;
	
	Titanium.API.addEventListener(Titanium.CLOSE, settings.saveWindowPosition);
	Titanium.API.addEventListener(Titanium.EXIT,  settings.saveWindowPosition);
	
	// Change the top header color on blur
	Titanium.API.addEventListener(Titanium.UNFOCUSED, function() {
		$("body").css("border-top", "1px solid #b9b9b9");
	});
	
	// Change the top header color on blur
	Titanium.API.addEventListener(Titanium.FOCUSED, function() {
		$("body").css("border-top", "1px solid #666");
	
	});
	
};

// get the remote server address
settings.getRemoteServer = function() {
	return Titanium.App.Properties.getString('remoteServer', config.defaultRemoteServer);
};

// get the paverID
settings.getPaverID = function() {
	return Titanium.App.Properties.getString('paverID', '');
};

// get the installationID
settings.getInstallationID = function() {
	return Titanium.App.Properties.getString('installationID', '');
}

/**
 * Save Window Size and Position on exit
 *
 * @author Christian Reber
 */
settings.saveWindowPosition = function() {
	var currentWindow = Titanium.UI.getMainWindow();
Titanium.API.debug('Saving window position');
	if (settings.positionSaved == false && currentWindow.isMinimized() == false) {
		Titanium.App.Properties.setString('maximized',   	currentWindow.isMaximized().toString());
		Titanium.App.Properties.setString('userHeight', 	currentWindow.height.toString());
		Titanium.App.Properties.setString('userWidth',  	currentWindow.width.toString());
		Titanium.App.Properties.setString('userX',      	currentWindow.x.toString());
		Titanium.App.Properties.setString('userY',      	currentWindow.y.toString());
		settings.positionSaved = true;
	}
};
