# minesweeper-app

```
mvn
yarn start
mvn package
java -jar target/minesweeper-app-1.0.0-SNAPSHOT.jar
```

```
curl -i -X POST '127.0.0.1:3000/game' -d '{"name": "teste", "rows": 10, "cols": 8, "mines": 20}'
curl -i -X POST '127.0.0.1:3000/game/teste/start'
curl -i -X POST '127.0.0.1:3000/game/teste/click' -d '{"row": 1,"col":1}'
```