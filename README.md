# ProjectJumga
Sample Project created as a solution to the 2021 FlutterWave Dev Challenge  
The project is hosted at [pure-crag-32381.herokuapp.com](https://pure-crag-32381.herokuapp.com/)

Jumga operates in these countries;
- Nigeria
- Ghana
- Kenya
- United Kingdom

Jumga performs transactions in US Dollars but it can pay sellers, riders in its target countries and accept payments from its target countries using Flutterwave. 

**[The PaymentService file](https://github.com/Eunovo/ProjectJumga/blob/main/server/src/services/payment/PaymentService.ts) houses all the Flutterwave related logic.**

## Features
This project supports the following features;

### User Classes
The app supports three types of users. Jumga comes with user accounts for each of this classes.


#### user
This class represents the buyers.
Login to a sample user account [here](https://pure-crag-32381.herokuapp.com/login) using these details.  
> email: user@email.com  
> password: password



#### rider
This class represents the dispatch riders. Only `admins` can add new riders.  
They get paid when they deliver orders assigned to them.  
They can **withdraw** their earnings at any time.
Login to sample rider accounts [here](https://pure-crag-32381.herokuapp.com/login/rider) using these details.  
Nigeria
> email: rider@email.com  
> password: password

Ghana
> email: ridergh@email.com  
> password: password

Kenya
> email: riderke@email.com  
> password: password

United Kingdom
> email: rideruk@email.com  
> password: password


#### seller
This class represents the sellers. They have to pay a **one-time fee** set by admins
after registration before their store becomes active.  
They can **withdraw** their earnings at any time.
Login to sample seller accounts [here](https://pure-crag-32381.herokuapp.com/login/store) using these details.  
Nigeria
> email: seller@email.com  
> password: password

Ghana
> email: sellergh@email.com  
> password: password

Kenya
> email: sellerke@email.com  
> password: password

United Kingdom
> email: selleruk@email.com  
> password: password

#### admin
This class of users can create riders, **review refund requests** and sets the **app's commssions and fees**.  
Login to a sample user account [here](https://pure-crag-32381.herokuapp.com/login/admin) using these details.
> email: admin@email.com  
> password: password


### One-time Store Fee payment
Sellers pay a one-time fee to approve their store after registration.  
Find the code for this [here](https://github.com/Eunovo/ProjectJumga/blob/main/server/src/services/users/ApproveSellerService.ts);

### Order Payment
Users can create an order and pay using Flutterwave gateway. Jumga holds this money paid until the order is delivered.
When the order is delivered **Jumga allocates seller and rider earnings and it's own commissions too**.  
You can see this [here](https://github.com/Eunovo/ProjectJumga/blob/2488dd9a643953368155c67aa82288dbaaa56378/server/src/controllers/orders/OrderController.ts#L114-L138).  
The purchase and delivery commissions are calculated on [Order creation](https://github.com/Eunovo/ProjectJumga/blob/2488dd9a643953368155c67aa82288dbaaa56378/server/src/backend.ts#L59-L95) and saved for later use when paying all entities involved.  
Riders can mark orders found on the [Orders page](https://pure-crag-32381.herokuapp.com/dashboard/orders) as "delivered". Simply, select an Order and click the "Mark Delivered" button on its page.

>Note that the delivery process has been greatly simplified for demonstration purposes,  
>Riders only need mark an Order as 'delivered' and the Order will be considered fulfilled.

### Order Cancellation and Refund
User can vist [the purchases page](https://pure-crag-32381.herokuapp.com/purchases) and cancel their orders that have not been completed.  
Upon [order cancellation](https://github.com/Eunovo/ProjectJumga/blob/2488dd9a643953368155c67aa82288dbaaa56378/server/src/controllers/orders/OrderController.ts#L140-L153), a **Refund Request** is created for `admins` to review.  
Admins armed with the transaction reference of the payment can fufill these refunds manually through the FlutterWave dashboard.

### Withdrawals
Riders and Sellers can withdraw from their earnings at anytime by visiting [the wallet page](https://pure-crag-32381.herokuapp.com/dashboard/wallet).
**Jumga uses FlutterWave's Transfer** api to make transfers to user bank accounts.  
See how I do this [here](https://github.com/Eunovo/ProjectJumga/blob/2488dd9a643953368155c67aa82288dbaaa56378/server/src/controllers/payouts/PayoutController.ts#L20-L24) and [here](https://github.com/Eunovo/ProjectJumga/blob/main/server/src/services/payouts/requestPayout.ts)

Also, the Jumga server listens for `transfer.complete` events, if the transfer fails, the user's money is returned. See [here](https://github.com/Eunovo/ProjectJumga/blob/main/server/src/controllers/events/EventController.ts)
