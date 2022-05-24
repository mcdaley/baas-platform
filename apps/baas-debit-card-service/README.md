# BaaS Debit Card Service
The __baas-debit-card-service__ provides Rest APIs to issue and manage debit cards. The APIs will support issuing debit cards linked to a checking/savings account and prepaid cards. __Note__ for a prepaid card the customer must load money into an account created when the card is issued.

## Debit Card Properties
Compare the debit card properties for Treasury Prime, Column Bank, and Synctera to define a basic set of properties. For now, I am going to ignore business cards and only deal with personal cards.

| Treasury Prime   | Open Platform      | Synctera      | BaaS Service       |
|------------------|--------------------|---------------|--------------------|
| id               | id                 |               | id
| account_id       |                    |               | account_id   
|                  | name_on_card       |               | name_on_card
| card_product_id  |                    |               | card_product_id
| card_controls    |                    |               | (marqeta specific controls, e.g., Brex)
| cvv              | cvv                |               | cvv
| expiration       | expiration_date    |               | expiration_date
| fulfillment      |                    |               |
| last4            |                    |               | last4
| pan              | card_number        |               | pan
| customer_id      | customer_id        |               | customer_id
| pin              | pin                |               | pin
| pin_is_set       |                    |               |
| status           | card_status        |               | card_status
| userdata         |                    |               |
|                  | credit_limit       |               |
|                  | available_balance  |               |
|                  | posted_balance     |               |
|                  | atm_daily          |               | limits.atm_daily
|                  | pos_daily          |               | limits.pos_daily
|                  | daily_transactions |               | limits.daily_transactions
|                  | phone_number       |               |
|                  | mailing_address    |               |
|                  |                    | created_at    |
|                  |                    | updated_at    |
|                  |                    | card_network  | card_network (mastervard vs. visa)
|                  | card_type (P vs V) |               | card_type (physical vs. virtual)
