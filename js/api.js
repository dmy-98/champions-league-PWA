const base_url = "https://api.football-data.org/v2/";
const standings_url = `${base_url}competitions/2021/standings?standingType=TOTAL`
const team_url = `${base_url}teams/`;
const player_url = `${base_url}players/`;
// 031cb13ff0274b41bf48afd7b3513c90
// 3d522eafe5a74c2a8fd8f2064ea7bba0
const fetchApi = (url) => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '031cb13ff0274b41bf48afd7b3513c90'
        }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
const getStandings = () => {
    if ("caches" in window) {
        caches.match(standings_url).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    standingDOM(data);
                });
            }
        });
    }

    fetchApi(standings_url)
        .then(status)
        .then(json)
        .then(function(data) {
            standingDOM(data)
        })
        .catch(function() {
            caches.match(standings_url).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        standingDOM(data);
                    });
                }
            });
        });
}

const getTeamById = () => {
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = Number(urlParams.get("id"));

        if ("caches" in window) {
            caches.match(team_url + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        teamDOM(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(team_url + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                teamDOM(data);
                resolve(data);
            });
    });
}

function getSavedTeams() {
    getAll().then(function(team_fav) {
        savedTeamDOM(team_fav);
    });
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));
    getById(idParam).then(function(team) {
        teamDOM(team);
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("team_fav", "readonly");
                var store = tx.objectStore("team_fav");
                return store.get(id);
            })
            .then(function(team) {
                resolve(team);
            });
    });
};