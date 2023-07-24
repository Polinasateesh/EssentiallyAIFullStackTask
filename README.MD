# Frontend Task Essentially AI

## Steps to complete the task
1. Create a clone of this repo
2. Complete the tasks given below
3. Create your own public repo on github and push your code there
4. Share the repo link as a reply to the mail

## Overview
The task is to build a webpage to display the trade statistics (Open, High, Low, Close, Volume) of a particular stock for a particular day. You should use Polygon free tier API for this task (https://polygon.io/)

## Individual tasks
1. The given codebase has two parts, client and server.
2. Go to server folder, you'll see in app.js that a POST route is exposed at /api/fetchStockData. Implement this API to fetch the trade statistics of a particular stock for a particular day using the Polygon API.
3. Return only the required fields in the response in a json format. Handle various edge cases here along with relevant response codes.
4. Go to client folder and run the react app. You'll see just a hello world screen for now.
5. Create a form for the user to input the symbol of the stock and select a date and add a submit button.
6. On submitting the form, send a request to the api route which is exposed and once the data is back, display the required details in the frontend (Open, High, Low, Close, Volume).

## Evaluation criteria
1. The logical correctness of all individual tasks mentioned above
2. Tackling of edge cases
3. Efficiency of the code
4. Naming conventions (No need to follow any standard pattern, just describe the pattern and make sure the code is consistent with it)
5. Project structure (Again, no need to follow a standard pattern. Just make sure the structuring is logical and describe it)
6. Documentation (This can just be a readme file with bullet points, as long as it explains what you've implemented, you're good to go).
7. Bonus points for interesting UI (This obviously won't be considered if the core functionality isn't present).

## Optional tasks
1. Imagine this is a real world scenario which thousands of users use to get the historic data of a stock for a particular day, how would this product change in order to improve the UX.
2. What new features would you add in this product to increase it's utility for the end user.