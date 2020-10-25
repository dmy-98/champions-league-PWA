function teamDOM(data) {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
    let articleHTML = `
    <div class="row">
        <div class="col s4">
            <img class="responsive-img" src="${data.crestUrl}" align="center" width="200px" height="200px" vspace="25">
        </div>
        <div class="col s8">
            <div class="card">
                <div class="card-content">
                    <h4>${data.name}</h4>
                    <hr size=12px>
                    <table class="responsive-table striped">
                        <tr>
                            <td>Short Name :</td>
                            <td>${data.shortName}</td>
                        </tr>
                        <tr>
                            <td>Address :</td>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <td>Phone :</td>
                            <td>${data.phone}</td>
                        </tr>
                        <tr>
                            <td>Website :</td>
                            <td>${data.website}</td>
                        </tr>
                        <tr>
                            <td>Email :</td>
                            <td>${data.email}</td>
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
                    </table>
                </div>
            </div>
        </div>    
    </div>
    <div class="card>
        <div class="card-content">
            
        </div>
    </div>
    `;
    document.getElementById("body-content").innerHTML = articleHTML;
}