# ParseHub Node.js Client

![ParseHub icon](https://www.parsehub.com/static/images/parsehub_logo2.svg)

## Overview

This is the **unofficial** Node.js client for [ParseHub](https://www.parsehub.com/), a platform for scraping websites and creating APIs out of the extracted data.

### Install

    npm install parsehub-api --save

### Usage

Require the module and initialize an instance using your ParseHub API key.

    var ParseHub = require('parsehub-api'),
    var api = new ParseHub(yourApiKey);

**Return a list of all jobs belonging to you**

```
api.getProjectList(function(err, ProjectList)
{
	console.log(ProjectList);
});
```

*On success, returns an object with*

* scrapejobs - A list of all your job objects. Each job object may have an additional last_run property, depending on the include_last_run parameter.

**Delete an existing job**

```
api.deleteProjectRun({runToken}, function(err, deletedJobToken)
{
	console.log(deletedJobToken);
});
```
*Parameters*

* token - The token of the job you'd like to delete

*On success, returns an object with*

* token - The token of the job that was deleted

**Return the status of a single run of one of your jobs**

```
api.getRunStatus({runToken}, function(err, run)
{
	console.log(run);
});
```
*Parameters*

* run_token - The unique identifier of the run that you'd like to get the status of

*On success, returns an object with*

* run - The run object corresponding to the run_token provided

**Cancel a single run**

```
api.cancelProjectRun({runToken}, function(err, cancelledRunToken)
{
	console.log(cancelledRunToken);
});
```
*Parameters*

* run_token	The unique identifier of the run you'd like to cancel

*On success, returns an object with*

* run_token	The unique identifier of the run that was cancelled

**Get the result of a single run**

```
api.getRunData({runToken}, function(err, results)
{
	console.log(results);
});
```
*Parameters*

* run_token - The unique identifier of the run for which you'd like to download the data
* format (Optional) - If set to 'csv', results will be in a CSV format. Otherwise, they will be in a JSON format. Note that results will be zipped in either case unless the 'raw' parameter is set.
* raw (Optional) - If set to anything other than '0', returns a raw json response instead of a zip file containing a json file. Defaults to '0', and cannot be changed for responses which have an uncompressed size > 3 MB. **This parameter has not been implemented.**

*On success, if raw is '0'*

* Returns a zip file with a single json file inside it. The json file has the same name as the run_token. **Not implemented**

*On success, if raw is not '0'*

* Returns a json response which is the global scope of the run.
