# ParkingDataAnalysis

This is the web application built using React. The dashboard shows the predictions of the parking bookings given for a zone for a particular time period.
Predictions are done using the RandomForestRegressor algorithm.

Steps for installation:

`npm install`

Run the project:

`npm start`

Using the application:
1. Load the csv file 'Predictions_parkingdata_rfr_depth8_oobesti.csv' file from dist folder while loading from browse option
2. You can give the zone number on the right search input box to view the dashboard for the given zone
3. Charts will be updated according to the selection for the given zone
4. Heatmap chart is updated for all zones in the given city where the searched zone exists

