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


### DynamoDB functions:

- **dynmTypeOf**: returns the corresponding DynamoDB type given a js element

- **dynmToJson**: converts from dynamoDB style to common json acording to the rule above

- **jsonToDynm**: converts a json following the rule above to a dynamoDB json