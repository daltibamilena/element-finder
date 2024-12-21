# element-finder

You can run with docker using this command:
```
docker compose up -build 
```

Or you can run with npm

```
npm install
npm run build
npm run start:dev
``` 

## Routes

To know about what is your scrap possibilities 
```
/help
```

The scrap route
```
/scrap?url=<URL>&element=<ELEMENT>
```

Example:
``` 
curl --location --globoff 'http://localhost:3000/scrap?url=https%3A%2F%2Fquotes.toscrape.com%2F&element=span.text[itemprop%3D%22text%22]'
``` 

## To-do
Tests
