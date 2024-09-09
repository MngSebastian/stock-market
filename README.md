# Stock Market App


## Introduction
This Project was done with React and Tailwind and its purpose was so that I get more comfortable working with API’s.



## Usage

run npm start or go to https://stock-market-tau.vercel.app/ (DEPRECATED, Invalid APi Key)


## Features
Day and Night Toggle <br>
![Day and Night Toggle](https://github.com/MngSebastian/stock-market/assets/44436863/692b7187-50e5-4765-9212-c73f3ce163fc)


Real-time data about companies.
Chart with historical Data. (Daily, weekly, monthly, yearly) <br>
![ezgif-5-368e0fa2b9](https://github.com/MngSebastian/stock-market/assets/44436863/8a0a1265-b55d-491c-9afa-bc9d6f1f9a79)


Input AutoComplete (sort of, more about this in Challenges and Learnings)


## Fully Responsive
Tablet <br>
![ezgif-5-dc601fe643](https://github.com/MngSebastian/stock-market/assets/44436863/12072af9-e455-485d-8d17-1eeee290344b)


Phone <br>
![ezgif-5-0443bd0cea](https://github.com/MngSebastian/stock-market/assets/44436863/e0e86175-4796-462b-8a78-dae23259990e)


## Challenges, learnings and features that had to be sacrificed :)


Input Autocomplete:
	I have implemented a real-time autocomplete feature that queries the symbolLookup endpoint with each character input in the search field. However, this frequent querying has the potential to exceed the API's rate limit threshold, which it did 	many times.
	To reduce the frequency of autocomplete queries, I've chosen to initiate a query only after the third character is entered. This decision is based on the observation that most company tickers consist of four characters, making it impractical 	to generate an exhaustive list of suggestions from just the initial two characters.

 Features that I had to sacrifice entirely due to API Rate Limit.
	For each company (eg. Tesla) I made a component that displays company Cards from the same industry (GM, FORD, Rivian ) each with its own data and miniChart.
	This feature more than doubled the amount of request the app is sending, it worked for a while but if you query a few companies fast you will run into a 429 HIT RATE LIMIT REACHED.
