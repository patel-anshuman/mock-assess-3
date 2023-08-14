# Routes

| METHOD |  ENDPOINT  | Payload |
|:-------|:----------------------------:|:--------|
| POST   | _/api/register_ |  (**body** : name, email, password) |
| POST   |  _/api/login_  |  (**body** : email, password)  |
| GET    | _/api/flights_ |   (**headers** : token)  |
| GET    | _/api/flights/:id_ |   (**headers** : token)  |
| | | (**params** : flight_id) |
| POST    | _/api/flights_ | (**headers** : token)   |
| | | (**body** : airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price) |
| PUT    | _/api/flights/:id_ |  (**headers** : token)  |
| | | (**params** : flight_id) |
| | | (**body** : airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price) |
| DELETE    | _/api/flights/:id_ |  (**headers** : token) |
| | | (**body** : flight_id) |
| POST    | _/api/booking_ |  (**headers** : token)  |
| | | (**body** : flight_id) |
| GET    | _/api/dashboard_ |  (**headers** : token)   |
| PUT    | _/api/dashboard/:id_ |  (**headers** : token) |
| | | (**params** : booking_id) |
| | | (**body**: flight_id) |
| DELETE    | _/api/dashboard/:id_ |  (**params** : booking_id)   |

