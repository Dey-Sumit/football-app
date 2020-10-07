# API
#### Get league id

https://v2.api-football.com/leagues/country/{country_name}/2020
``` 
name: "Premier League"
league_id: 2790
season: 2020
```
```
name: "Primera Division" (Laliga)
league_id: 2833
season: 2020
```
```
league_id: 2857
name: "Serie A"
type: "League"
country: "Italy"
country_code: "IT"
season: 2020
```
```
league_id: 2755
name: "Bundesliga 1"
type: "League"
country: "Germany"
country_code: "DE"
season: 2020
```
----
#### Get teams from league id
https://v2.api-football.com/teams/league/{league_id}

#### Team ids SPAIN
```
team_id: 532 teamName: "Valencia"
team_id: 541 teamName: "Real Madrid"
team_id: 529 teamName: "Barcelona"
team_id: 530 teamName: "Atletico Madrid"
```
#### Team ids ENGLAND
```
team_id: 49 teamName: "Chelsea"
team_id: 40 teamName: "Liverpool"
team_id: 50 teamName: "Manchester City"
team_id: 33 teamName: "Manchester United"
```


### get league id by team id and season
 GET : https://v2.api-football.com/leagues/team/541/2020
```
current laliga season id : 2833
```
#### League table
https://v2.api-football.com/leagueTable/{league_id}
```
name: "Primera Division"
type: "League"
country: "Spain"
country_code: "ES"
season: 2020
season_start: "2020-09-11"
season_end: "2021-05-23"
```
### timezone
get("https://api-football-v1.p.rapidapi.com/v2/timezone");
```
"Asia/Kolkata"
"Australia/Adelaide"
"America/Santiago"
"Africa/Accra"
"Europe/Berlin"
"Pacific/Wallis"
"Asia/Karachi"
"Asia/Singapore"
```



### squad
get("https://api-football-v1.p.rapidapi.com/v2/players/squad/{team_id}/{season}");

### predictions
get("https://api-football-v1.p.rapidapi.com/v2/predictions/{fixture_id}");


### next and previous fixtures
https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/next/{number}
https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/last/{number}

### statistics of a fixture
get("https://api-football-v1.p.rapidapi.com/v2/statistics/fixture/{fixture_id}");

### lineups
get("https://api-football-v1.p.rapidapi.com/v2/lineups/{fixture_id}");

### fixtures
get("https://api-football-v1.p.rapidapi.com/v2/fixtures/live/{league_id}-{league_id}-{league_id}");

### fixture id
get("https://api-football-v1.p.rapidapi.com/v2/fixtures/id/{fixture_id}")

https://media.api-sports.io/football/players/${player_id}.png


```
champions League 2020
league_id: 2771
name: "UEFA Champions League"

 https://v2.api-football.com/fixtures/league/524

 
```
### sportsmonk token
UcvpS12KU6Vn4Iw3lkvUAtJf5Mm09F4imQMLe8jJOCp3k9imSwfURdIphXPt



# REDUX setup

1. create a store (apply middle ware in needed , set up for chrome dev tools) in store.js
2. wrap the app with provider and pass the store (from react-redux)
### now my chrome devtools should work
3. create reducer file
5. create an initial state file
*** import this initial state file in store.js and set the initial state

4. **create types file(store all action types)

5.now to use redux store ,we need to connect the component with redux

let's do for auth
1. create two types : REGISTER SUCCESS and REGISTER FAIL
2. create a reducer file(auth.reducer.js)
 create initial state,switch,case.......

3. go to corresponding action file : auth.action.js
Here we will make the request using axios or make request to the firebase and based on the response fire a appropriate dispatch({}) 


4. now go to Auth component and connect with the redux
    import the action 
    dispatch the action wherever it needed





