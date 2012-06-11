/**
 * Default configuration values for use on first install
 * 
 * @author Steve Winter
 * 
 * @date 2012-06-08 
 */
 var config = config || {}

 config.defaultWindowHeight 		= '400';
 config.defaultWindowWidth 			= '760';
 config.defaultRemoteServer			= 'http://hds.msdev.co.uk';
 
 config.securitySalt				= 'SHw4r5qYWEGehv65aw^&&whg354w5u';
 
 config.syncCodes					= {'success' : 100, 'denied' : 101, 'failure' : 102, 'incomplete' : 103, 'timeout' : 104, 'noNetwork' : 105};