function savedTeamDOM(team_fav) {
    let teamsHtml = ``;
    team_fav.forEach(team => {
        teamsHtml += `
        <div class="col s12 m6 l6">
            <div class="card">
                <div class="center-align">
                    <a href="./team.html?id=${team.id}&saved=true">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${team.crestUrl}" alt="${team.name}-logo" align="center" width="200px" height="200px">
                        </div>
                        <div class="card-content">
                            <h4 class="flow-text">${team.name}</h4>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        `;
    });
    let savedTeamsHtml = `
    <div class="row">
        ${teamsHtml}
    </div>
    `;

    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = savedTeamsHtml;
}