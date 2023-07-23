# Checkbox FE

This project is created by using the latest `node` and `npm` with the latest `nextjs` using page route structure.

## How to run

1. Copy `.env.dev` to `.env.local`. ps: adjust BE url
1. Run `npm install`
2. Run `npm run dev` 

## Deploy

There are 2 possible ways to deploy this applications. 
1. Using default vercel config that executed every push on `main` branch (it's being turned off for now)
2. Using GCP that executed on every push on `gcp` branch, this using github actions and it only deploy the image to GCR and Artifact Registry (to showcase my ability to build CI/CD pipeline), the github actions can be enhanced further to immediately deploy it in GCE, GKE or Cloud Run. The version of the app will be automatically updated on the GCP by file scripts/git_update.sh.

ps: the GCP push should adjust the SERVICE_ACCOUNT_KEY in order to make it works

## Test

To run test coverage run `npm run test` this will run test for the whole project. please be advised that the test does not cover all the files. This test just to show case that I am capable of creating unit test

## Project Plan

For further implementaion discussion can go to this [link](https://giant-heaven-ea6.notion.site/Checkbox-9c503033aba845a6909e0b9a5dbc418b?pvs=4)