## build

> npx web-ext build

## initial publish

> export $(cat .env | xargs) && npx web-ext sign --api-key=$API_KEY --api-secret=$API_SECRET
