# Marqeta Adapter
The __marqeta-adapter__ service connects to Marqeta and is used to issue and manage debit cards.

## Architecture Notes
Thoughts on how to handle multitenancy and multiple users.

- Each client will be considered a tenant and be assigned a tenant_id, which I've been calling the branch_id
- Each client will generate an Application Token and an Admin Access Token that are required for authentication
- If I'm using jwt then I can include the client's tenant_id in the jwt token otherwise, it will be required in the header of the API call to the API Gateway.
  * Look into using async local storage from the blog post to store the tenant_id
- Need to look at Marqeta to see how it handles users as each user must belong to a tenant_id and each client/tenant can create many users/customers.
- Need to differentiate between Admin and User API calls.

### Logging Notes
Each log message should include the tenant_id, trace_id, and customer_id if applicable. Also, I should look at creating another wrapper class that takes an object and writes the log message. Not exactly sure how it would look.
