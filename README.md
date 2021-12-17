# aws-util
some aws utility functions

## DynamoDB
For Dynamo (refered as **dynm** from here on out and inside the lib itself) format conversion the following rule is used:

### Dynm - js
- String - string
- Number - int
- Boolean - boolean
- Null - null
- String set - Set(string)
- Number set - Set(int)
- List - array
- Map - object

**Obs.:** For js->dynm conversion of sets, the type of the first element will be used
