# http locales

Simple package to manage translations in Node JS apps wyth AsyncLocalStorage api. 

# Installation 

This is a Node.js module available through the npm registry. Installation is done using the npm install command:

```sh
npm install http-locales
```

# API 

## HttpLocales.load()

Load the translations files inside the default folder `locales`. It can be changed using the env variable: process.env.HTTP_LOCALES_FOLDER.

```js
import { HttpLocales } from "http-locales" 

await HttpLocales.load()
```

## HttpLocalesContext.run(lang  callback)

Create the AsyncLocaleStorage containing a lang. 

```js
// Here we are using en language. It will take the translations from locales/en.json.  
HttpLocalesContext.run("en", function() {
    // ... 
})
```

## __(text,interpolations?)
```js
__("hello %s", "arnaud")
// Will print hello arnaud
```

## Full example for express 

```js
import express, { NextFunction } from "express"
import { HttpLocales, HttpLocalesContext, __ } from "http-locales"

await HttpLocales.load()

const app = express()

app.use((_, __, next: NextFunction) => {
	HttpLocalesContext.run("en", function() {
		next()
	})
})

app.get("/", (_, res) => {
	res.send(__("hello"))
})

app.listen(3000)
```
