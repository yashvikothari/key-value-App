## TEST CASES FOR THE APP

Test Case 1: Set Key-Value Pairs
Objective: Kuch key-value pairs ko set karna aur verify karna ki wo set ho gaye hain.

Set abc-1:

curl -X POST -H "Content-Type: application/json" -d '{"key":"abc-1", "value":"value1 for abc-1 added by yashviapp"}' http://localhost:3000/set

Expected outcome: "Key-Value pair added successfully"

Set abc-2:

curl -X POST -H "Content-Type: application/json" -d '{"key":"abc-2", "value":"value2 for abc-2 added by yashviapp"}' http://localhost:3000/set

Expected outcome: "Key-Value pair added successfully"

Set xyz-1:

curl -X POST -H "Content-Type: application/json" -d '{"key":"xyz-1", "value":"value3 for xyz-1 added by yashviapp"}' http://localhost:3000/set

Expected outcome: "Key-Value pair added successfully"

Set xyz-2:

curl -X POST -H "Content-Type: application/json" -d '{"key":"xyz-2", "value":"value4 for xyz-2 added by yashviapp"}' http://localhost:3000/set

Expected outcome: "Key-Value pair added successfully"

Test Case 2: Retrieve Set Values
Objective: Ab jab keys set kar di gayi hain, unhe retrieve karke verify karna ki correct values return ho rahi hain.

Get abc-1:

curl http://localhost:3000/get/abc-1

Expected outcome: {"abc-1":"value1 for abc-1 added by yashviapp"}

Get xyz-2:

curl http://localhost:3000/get/xyz-2

Expected outcome: {"xyz-2":"value4 for xyz-2 added by yashviapp"}

Test Case 3: Search by Prefix and Suffix
Objective: Prefix aur suffix ke based par keys search karna aur verify karna ki correct keys aur unki values return ho rahi hain.

Search with Prefix abc:

curl http://localhost:3000/search?prefix=abc

Expected outcome:

{
  "abc-1": "value1 for abc-1 added by yashviapp",
  "abc-2": "value2 for abc-2 added by yashviapp"
}

Yeh abc prefix wale sabhi keys ko return karega.

Search with Suffix -1:

curl http://localhost:3000/search?suffix=-1

Expected outcome:

{
  "abc-1": "value1 for abc-1 added by yashviapp",
  "xyz-1": "value3 for xyz-1 added by yashviapp"
}

Yeh -1 suffix wale sabhi keys ko return karega.

In test cases ko aap apne Ubuntu machine par run karke verify kar sakte hain ki aapka in-memory key-value store HTTP API service correctly implement ho chuka hai aur expected tarah se kaam kar raha hai.



## APP INTRODUCTION
KV Store
Problem Statement
Create an in-memory key-value store HTTP API Service which implements: 
/get/<key> → Return value of the
key/set → Post call which sets the key/value pair
/search → Search for keys using the following filters 
Assume you have keys: abc-1, abc-2, xyz-1, xyz-2
/search?prefix=abc would return abc-1 and abc-2 
/search?suffix=-1 would return abc-1 and xyz-1
You only need to implement prefix & suffix functionality for search
💡 Don’t use Redis or similar prebuilt KV store
Evaluation Points
The service should have proper test coverage and it should have a Dockerfile.
Assumptions & design decisions etc should be documented.
Deployment
If Kubernetes experience;
Write deployment spec with 0 downtime deployments, service spec
and ingress spec

I will let others be able to test this in local kind cluster
Otherwise, Docker swarm or similar
----


-----
curl https://54.234.94.168//get/abc-1

----

curl -X POST -H "Content-Type: application/json" -d '{"key":"abc-1", "value":"yashviapp give abc-1"}' http://54.234.94.168:3000/set