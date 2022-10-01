'use strict';

const axios = require('axios');
const baseUrl = 'https://www.parsehub.com/api/v2';

/**
 * Constructor - takes your ParseHub API key
 */
function ParseHub(api_key) {
	if (!api_key)
		throw Error('Please specify a ParseHub API key');

	this._api_key = api_key;
}

/**
 * Return a list of all jobs belonging to you
 *
 * Parameters:
 *
 * include_last_run (Optional) - If set to anything other than '0', each run object in the result includes a last_run property containing the run object for the last run that was initiated for this run. If no runs have been initiated for the run, the last_run property is not included. Defaults to '0'.
 *
 * On success, returns an object with:
 *
 * scrapejobs - A list of all your run objects. Each run object may have an additional last_run property, depending on the include_last_run parameter.
 */
ParseHub.prototype.getProjectList = function (callback) {
	var config = {
		method: 'get',
		url: `${baseUrl}/projects?api_key=${this._api_key}`,
		headers: {}
	};
	axios(config)
		.then(function (response) {
			// console.log(JSON.stringify(response.data).slice(1, 5));
			callback(response.data);
		})
		.catch(function (error) {
			callback(error);
		});
};

/**
 * Run an instance of a run that was previously created
 *
 * Parameters:
 *
 * token - The token of the run you'd like to run
 * start_url (Optional) - Run the run starting at this url rather than on the default starting url for the run
 * start_value_override (Optional) - Override the starting JSON value of the global scope. This can be used to pass parameters to your run. For example, you may pass {'query': 'San Francisco'} in order to use the query in an expression somewhere in your run.
 *
 * On success, returns an object with:
 *
 * run_token - The unique identifier of the run that was created
 */
ParseHub.prototype.runProject = function (projectToken, callback) {
	var config = {
		method: 'post',
		url: `${baseUrl}/projects/${projectToken}/run?api_key=${this._api_key}`,
		headers: {}
	};

	axios(config)
		.then(function (response) {
			// callback(response.data);
			callback(response.data);
		})
		.catch(function (error) {
			callback(error);
		});
};

/**
 * Return the status of a single run of one of your jobs
 *
 * Parameters:
 *
 * run_token - The unique identifier of the run that you'd like to get the status of
 *
 * On success, returns an object with:
 *
 * run - The run object corresponding to the run_token provided
 */
ParseHub.prototype.getRunStatus = function (runToken, callback) {
	var config = {
		method: 'get',
		url: `${baseUrl}/runs/${runToken}?api_key=${this._api_key}`,
		headers: {}
	};

	axios(config)
		.then(function (response) {
			callback(response.data);
		})
		.catch(function (error) {
			callback(error);
		});
};

/**
 * Cancel a single run
 *
 * Parameters:
 *
 * run_token	The unique identifier of the run you'd like to cancel
 *
 * On success, returns an object with:
 *
 * run_token	The unique identifier of the run that was cancelled
 */
ParseHub.prototype.cancelProjectRun = function (runToken, callback) {
	var config = {
		method: 'post',
		url: `${baseUrl}/runs/${runToken}/cancel?api_key=${this._api_key}`,
		headers: {}
	};

	axios(config)
		.then(function (response) {
			callback(response.data);
		})
		.catch(function (error) {
			callback(error);
		});

};

/**
* Get the result of a single run
*
* Parameters:
*
* run_token - The unique identifier of the run for which you'd like to download the data
* format (Optional) - If set to 'csv', results will be in a CSV format. Otherwise, they will be in a JSON format. Note that results will be zipped in either case unless the 'raw' parameter is set.
* raw (Optional) - If set to anything other than '0', returns a raw json response instead of a zip file containing a json file. Defaults to '0', and cannot be changed for responses which have an uncompressed size > 3 MB.
*
* On success, if raw is '0':
*
* Returns a zip file with a single json file inside it. The json file has the same name as the run_token.
*
* On success, if raw is not '0':
*
* Returns a json response which is the global scope of the run.
*/
ParseHub.prototype.getRunData = function (runToken, callback) {
	var config = {
		method: 'get',
		url: `${baseUrl}/runs/${runToken}/data?api_key=${this._api_key}`,
		headers: {}
	};

	axios(config)
		.then(function (response) {
			callback(response.data);
		})
		.catch(function (error) {
			callback(error);
		});

};

/**
 * Delete an existing run
 *
 * Parameters:
 *
 * token - The token of the run you'd like to delete
 *
 * On success, returns an object with:
 *
 * token - The token of the run that was deleted
 */
ParseHub.prototype.deleteProjectRun = function (runToken, callback) {

	var config = {
		method: 'delete',
		url: `${baseUrl}/runs/${runToken}?api_key=${this._api_key}`,
		headers: {}
	};

	axios(config)
		.then(function (response) {
			callback(response.data);
		})
		.catch(function (error) {
			callback(error);
		});


}

module.exports = ParseHub;