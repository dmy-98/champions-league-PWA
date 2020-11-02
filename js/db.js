let dbPromised = idb.open("premierLeagueDB", 1, function(upgradeDb) {
    let indexTimFav = upgradeDb.createObjectStore("team_fav", { keyPath: "id" });
    indexTimFav.createIndex("name", "name", { unique: false });
});


function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                const tx = db.transaction("team_fav", "readonly");
                const store = tx.objectStore("team_fav");
                return store.getAll();
            })
            .then(function(team_fav) {
                resolve(team_fav);
            });
    });
};

function saveForLater(team) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("team_fav", "readwrite");
            var store = tx.objectStore("team_fav");
            store.put(team);
            return tx.complete;
        })
        .then(function() {
            console.log("Team berhasil disimpan.");
            M.toast({
                html: 'Successfully saved team!'
            });
        });
};

function deleteTeam(team) {
    dbPromised.then(function(db) {
        console.log(team);
        const tx = db.transaction('team_fav', 'readwrite');
        const store = tx.objectStore('team_fav');
        store.delete(team);
        return tx.complete;
    }).then(function() {
        console.log("Team berhasil dihapus.");
        M.toast({
            html: 'Successfully delete team!'
        });
    });
}