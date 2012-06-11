
hds.database = hds.database || {};

/**
 * Do the necessary initial database stuff
 *
 * @author Daniel Marschner
 */
hds.database.init = function() {
	hds.database.path = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(), 'hds.db');
	hds.database.db   = Titanium.Database.openFile(hds.database.path);
	Titanium.API.debug('Initialising use of database: '+hds.database.path);

	hds.database.create();
};

/**
 * Creates the database and all tables
 *
 * @author Dennis Schneider, Daniel Marschner, Christian Reber
 */
hds.database.create = function() {
	if (Titanium.App.Properties.hasProperty('dropTables') == false) {
		var sql 	= "DROP TABLE IF EXISTS loads";
		Titanium.API.debug('About to run command: '+sql);
		hds.database.db.execute(sql);
		Titanium.App.Properties.setString('dropTables', '1');
	}
	
	var sql 		= "CREATE TABLE IF NOT EXISTS loads (id INTEGER PRIMARY KEY AUTOINCREMENT, truck TEXT, action TEXT, sent INTEGER DEFAULT 0, creation DATETIME DEFAULT CURRENT_TIMESTAMP)";
	Titanium.API.debug('About to run command: '+sql);
	hds.database.db.execute(sql);
};


hds.database.addLoad = function(load) {
	var sql			= "INSERT into loads (truck, action) VALUES ('"+load.truck+"', '"+load.action+"')";
	Titanium.API.debug('About to run command: '+sql);
	hds.database.db.execute(sql);
	idRes			= hds.database.db.execute("select last_insert_rowid();");

	return hds.database.fetchID(idRes);
};


hds.database.syncLoad = function(load) {
	var sql			= "UPDATE loads SET sent = "+load.sent+" WHERE id = "+load.id;
	Titanium.API.debug('About to run command: '+sql);
	hds.database.db.execute(sql);
}

/**
 * Truncates the whole database
 *
 * @author Dennis Schneider
 */
hds.database.truncate = function() {
	hds.database.db.execute("DELETE FROM loads");
	hds.database.db.execute("DELETE FROM sqlite_sequence WHERE name = 'loads'");
};

/**
 * Removes HTML tags and escapes single quotes
 *
 * @author Daniel Marschner
 */
hds.database.convertString = function(string, length) { 
	string = string.split('<').join(escape('<'));
	string = string.split('>').join(escape('>'));
	string = string.split("'").join(escape("'"));
	
	if (length != undefined && length > 0)
		string = string.substr(0, length);
	
	return string;
};

/**
 * Fetch the data from a result set to array with objects
 *
 * @author Dennis Schneider
 */
hds.database.fetchData = function(resultSet) {
	var result = [];
	
	while(resultSet.isValidRow()) {
		var item = {};
		for(var i = 0; i < resultSet.fieldCount(); i++) {
			item[resultSet.fieldName(i)] = resultSet.field(i);
		}
		result.push(item);
		resultSet.next();
	}

	return result;
};

/**
 * Return the id for a provided last insert select
 *
 * @author Steve Winter
 *  
 * @param {Object} idRes
 */
 hds.database.fetchID = function(idRes) {
	return idRes.field(0);
};


 hds.database.todaysLoads = function() {
	var sql			= "SELECT id, truck, action, sent, datetime(creation) as creation FROM loads WHERE date(creation) = date('now')";
	Titanium.API.debug('About to run command: '+sql);
	res				= hds.database.db.execute(sql);

	return hds.database.fetchData(res);
};
