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

**Return a list of all projects belonging to you**

```
api.getProjectList(function(ProjectList)
{
	console.log(ProjectList);
});
```

*On success, returns an object with*

* scrapeProjects - A list of all your projects objects. Each projectRun object may have an additional last_run property, depending on the include_last_run parameter.

**Delete an existing projectRun**

```
api.deleteProjectRun({runToken}, function(deletedRunToken)
{
	console.log(deletedRunToken);
});
```
*Parameters*

* runToken - The token of the projectRun you'd like to delete

*On success, returns an object with*

* runToken - The token of the projectRun that was deleted

**Return the status of a single run of one of your projects**

```
api.getRunStatus({runToken}, function(run)
{
	console.log(run);
});
```
*Parameters*

* runToken - The unique identifier of the run that you'd like to get the status of

*On success, returns an object with*

* run - The run object corresponding to the run_token provided

**Cancel a single run**

```
api.cancelProjectRun({runToken}, function(cancelledRunToken)
{
	console.log(cancelledRunToken);
});
```
*Parameters*

* runToken	The unique identifier of the run you'd like to cancel

*On success, returns an object with*

* runToken	The unique identifier of the run that was cancelled

**Get the result of a single run**

```
api.getRunData({runToken}, function(results)
{
	console.log(results);
});
```
*Parameters*

* runToken - The unique identifier of the run for which you'd like to download the data

*On success,*

* Returns a json response which is the global scope of the run.
