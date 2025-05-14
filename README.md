# CRUD application with Angular Signals V16

This app is a basic contacts app showing CRUD operations using the Angular Signals implementation - which has just been released in v16. Services are used to add artificial delay to mimic an API call - will be updating this to showcase more of signals and what they bring to the table with Angular.

Cheers :)

Extended the same code with mock api using `json-server`, and instead of using `Promise async / await`, the calls are wraped in `Observable`. The contacts array data is moved into the db.json file.
Install the JSON Server using

```bash
  npm install -g json-server
```

Start the JSON Server using the below command.

```bash
  json-server --watch db.json
```
