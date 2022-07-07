# Core Bank Simulator
The Core Bank Simulator will handle requests from the Baas Microservices and generate the proper response.

## TypeORM
Things to figure out w/ TypeORM

- How do I updated embedded resources? The update w/ cascades option does not update the physical_address when I send an update request to the Customer. I probably have to wrap in a transaction and use __upsert__ to insert/update the address separately and insure that it is linked to the customer. May want to look at the "Active Record" interface.

- Figure out how to return the object after an update.

- Figure out how to handle query options with the TypeORM

## Things to Try
- [c] Merge the Physical and Mailing addresses into a single table and see what
      the schema looks like and see how easy it is to insert new customers. I
      think that I'll need to flatten the incoming JSON request.
       - This will not work for what I'm trying.
- [] Use the RelationsQueryBuilder to update the physical and mailing addresses.
     I'll need to test if request contains address and then update/upsert the
     address and save it to the customer. Not sure how it will handle case when
     the mailing address is not created in DB.
- [] Look at using upsert to update physical/mailing addresses

## To Do
- [x] Core bank simulator framework (i.e. Logging, ConfigService, Server)
- [ ] Customer APIs (w/ FakerJS)
- [ ] Load fake initialization data from a file
- [ ] Account APIs
- [ ] Debit Card APIs
- [ ] Fake Ledger

