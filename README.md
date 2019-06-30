click-tracker-project


docker-compose exec server npm run db:migrate
docker-compose restart server

Things i'd do:

– Improved security when requesting the API – currently CORS allows all.
– Setup production/deployment workflow
– Use UUID or basic Auth for session slugs for improved security
– Make API requests more robust and catch errors
