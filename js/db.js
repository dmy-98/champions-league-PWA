let dbPromised = idb.open("premierLeagueDB", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("team_fav")) {
        let indexTimFav = upgradeDb.createObjectStore("team_fav", {
            keyPath: "id"
        });
        indexTimFav.createIndex("name", "name", {
            unique: false
        });
    }

    if (!upgradeDb.objectStoreNames.contains("player_fav")) {
        let indexPlayerFav = upgradeDb.createObjectStore("player_fav", {
            keyPath: "id"
        });
        indexPlayerFav.createIndex("name", "name", {
            unique: false
        });
    }

    if (!upgradeDb.objectStoreNames.contains("match_fav")) {
        let indexMatchFav = upgradeDb.createObjectStore("match_fav", {
            keyPath: "id"
        });
        indexMatchFav.createIndex("home", "home", {
            unique: false
        });
        indexMatchFav.createIndex("away", "away", {
            unique: false
        });
    }
});

function saveForLater(article) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("articles", "readwrite");
            var store = tx.objectStore("articles");
            console.log(article);
            store.add(article.result);
            return tx.complete;
        })
        .then(function() {
            console.log("Artikel berhasil di simpan.");
        });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.getAll();
            })
            .then(function(articles) {
                resolve(articles);
            });
    });
}