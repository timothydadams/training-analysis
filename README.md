# training-analysis & data tracker

localhost Requirements prior to installing/running:
  1. mongodb (community@5 recommended)
  2. postgresql@14
  3. node@14+
  4. Okta account (see 'set up okta dev account' for references/how-to)


Starting the App:

  1. ```git clone git@github.com:timothydadams/training-analysis.git```
  2. ```cd training-analysis```
  3. ```cp .env-sample .env``` (update .env with your environment variables as appropriate)
  4. ```npm install```

Set up Okta Developer Account
  1. Install Okta CLI [https://cli.okta.com/manual/](Okta Docs)
  2. ```okta register```
  3. ```okta login```
  4. ```okta apps create service```
  5. Add ```ISSUER=https://{yourOktaDomain}/oauth2/default``` to .env


For API Development (runs node.js+express on port 9000):
```npm run serve```


For Front End React Development (MUST also run node/express api):
```npm run react-start```


To build for production:
```npm run build```


