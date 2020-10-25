function teamDOM(data) {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

    let squads = data.squad;
    let coach = squads.find(squad => squad.role == 'COACH');
    let players = squads.filter(squad => squad.role != 'COACH');
    let dataPlayer = '';

    players.forEach(player => {
        dataPlayer += `
        <tr>
            <td>${player.name}</td>
            <td>${player.position}</td>
            <td>${(new Date(player.dateOfBirth)).toLocaleDateString()}</td>
            <td>${player.nationality}</td>
        </tr>`;
    });

    let articleHTML = `
    <div class="row">
        <div class="col s12 l4">
            <img class="responsive-img" src="${data.crestUrl}" align="center" width="200px" height="200px" vspace="25">
        </div>
        <div class="col s12 l8">
            <div class="card">
                <div class="card-content">
                    <h4>${data.name}</h4>
                    <hr size=12px>
                    <table class="striped">
                        <tr>
                            <td>Short Name :</td>
                            <td>${data.shortName}</td>
                        </tr>
                        <tr>
                            <td>Website :</td>
                            <td>${data.website}</td>
                        </tr>
                        <tr>
                            <td>Founded :</td>
                            <td>${data.founded}</td>
                        </tr>
                        <tr>
                            <td>Club Colors :</td>
                            <td>${data.clubColors}</td>
                        </tr>
                        <tr>
                            <td>Venue :</td>
                            <td>${data.venue}</td>
                        </tr>
                        <tr>
                            <td>Coach :</td>
                            <td>${coach.name}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>    
    </div>
    
    <div class="card">
        <div class="card-content">
            <h5 class="headers">Players</h5>
            <table class="striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Birth Date</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody>${dataPlayer}</tbody>
            </table>
        </div>
    </div>
    `;
    document.getElementById("body-content").innerHTML = articleHTML;
}