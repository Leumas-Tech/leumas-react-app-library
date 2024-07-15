# Leumas API Documentation

This documentation provides an overview of the available - **Method**: GET
 routes in the Leumas API.

## Base URL

The base URL for all endpoints is:

```
https://leumas-api-63700dc8135b.herokuapp.com
```


## Endpoints
======================================================================
### Get All Folders
    Retrieve a list of all folders in the ReactLibrary directory.

- **Endpoint**: `/react-apps/get-all-folders`
- **Method**: GET

- **Description**: This endpoint returns a JSON array containing the names of all folders in the ReactLibrary directory.

**Example Request**
```
 https://leumas-api-63700dc8135b.herokuapp.com/react-apps/get-all-folders
```

**Example Response** 

```
[  "Folder1",  "Folder2",  "Folder3"]
```

======================================================================


### Get A Folder
    Retrieve all apps within a specific folder.

- **Endpoint**: /react-apps/apps-in-folder/:folderName
- **Method**: GET    
- **Description**: This endpoint returns a JSON object with the folder name, the number of apps, and a list of all apps within the specified folder.

- **Example Request**:

```
 https://leumas-api-63700dc8135b.herokuapp.com/react-apps/apps-in-folder/Folder1
```

- **Example Response** 
```
{
  "folder": "Folder1",
  "numberOfApps": 3,
  "apps": [
    "Folder1/App1.jsx",
    "Folder1/App2.jsx",
    "Folder1/App3.jsx"
  ]
}
```










### Get All Apps
    Retrieve a list of all apps with their paths and counts.

- **Endpoint**: /react-apps/list-apps
- **Method**:  GET

- **Description**: This endpoint returns a JSON object with the total number of apps, the number of apps in each folder, and a list of all app paths.

- **Example Request**:
```
 https://leumas-api-63700dc8135b.herokuapp.com/react-apps/list-apps
```

- **Example Response** 
```
{
  "numberOfApps": 6,
  "appsInEachFolder": {
    "Folder1": 3,
    "Folder2": 2,
    "Root": 1
  },
  "files": [
    "Folder1/App1.jsx",
    "Folder1/App2.jsx",
    "Folder1/App3.jsx",
    "Folder2/App1.jsx",
    "Folder2/App2.jsx",
    "App1.jsx"
  ]
}
```



======================================================================







### Get Specific App
    Retrieve the code for a specific JSX app, including its dependencies.

- **Endpoint**: /get-app/react-apps/*
- **Method**: GET

- **Description**: This endpoint returns a JSON object containing the main code of the specified app and its dependencies.

- **Example Request**:
```
 https://leumas-api-63700dc8135b.herokuapp.com/get-app/react-apps/Folder1/App1.jsx
```


- **Example Response** 
{
  "mainCode": "import React, { useState } from 'react';\n\nconst App1 = () => { ... };\n\nexport default App1;",
  "dependencies": {
    "./Dependency1.jsx": "import React from 'react';\n\nconst Dependency1 = () => { ... };\n\nexport default Dependency1;",
    "./Dependency2.jsx": "import React from 'react';\n\nconst Dependency2 = () => { ... };\n\nexport default Dependency2;"
  }
}

======================================================================












### Get Embed URL
- **Coming Soon**: This endpoint is not currently functional but will be available in a future update.

- **Endpoint**: /embed/react-apps/*
- **Method**: - **Method**: GET

- **Description**: This endpoint will return an iframe HTML snippet for embedding a specific JSX app.

- **Example Request**:
```
 https://leumas-api-63700dc8135b.herokuapp.com/embed/react-apps/Folder1/App1.jsx
```

- **Example Response** 
```
<iframe src="https://leumas-api-63700dc8135b.herokuapp.com/react-apps/Folder1/App1.jsx" width="100%" height="600px" style="border: none;"></iframe>
```


