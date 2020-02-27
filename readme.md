1. Sklonuj repozytorium bezpośrednio do folderu z nowymi materiałami. 

2. `npm install`

3. W pliku `app.js` należy zmienić/nastawić folder który ma być przeszukany. 

```js
const options = {
  entry: "additional", // folder który będzie skanowany w celu zmiany nazw
  files: "html",
  prefix: "presentation"
};
```

Przy takim ustawieniu, zostanie przeszukany folder "additional" który jest o poziom wyżej niż repozytorium z tym skryptem.

4. `npm start`

Skrypt zmodyfikuje pliki podane w `options.files` i doda im odpowiedni prefix (`options.prefix`) pomiędzy wartością liczbową (`01`, `02` itd.) a właściwą nazwą prezentacji.

Zostanie również zmieniony wpis w pliku `.config.yml` z zachowaniem ID.

**Przed użyciem należy wykonać `git pull` aby pobrać wszystkie pliki `.config` stworzone przez system a także wykonać `commit` zmian (just in case).**
