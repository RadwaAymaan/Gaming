export default class Details{
    constructor(id){
    document.getElementById('btnClose').addEventListener('click',()=>{
        document.getElementById('games').classList.replace('d-none','d-block');
        document.getElementById('details').classList.replace('d-block','d-none');
    })
      this.getDetails(id);
    }    
    async getDetails(id){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '874f153148msh72f8b67485146c3p120251jsn84b9727b1413',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
            
        };   
    let apiResponse  = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    let finalResult = await apiResponse.json();
    this.displayDetails(finalResult);
    console.log(finalResult);
    }
    displayDetails(result){
        let box = 
            `<div class="col-md-4">
            <img src="${result.thumbnail}" class="w-100" alt="image details">
         </div>
         <div class="col-md-8">
            <h3>Title: ${result.title}</h3>
            <p>Category: <span class="badge text-bg-info"> ${result.genre}</span> </p>
            <p>Platform: <span class="badge text-bg-info"> ${result.platform}</span> </p>
            <p>Status: <span class="badge text-bg-info">${result.status}</span> </p>
            <p class="small">${result.description}</p>
            <a class="btn btn-outline-warning" target="_blank" href="${result.game_url}">Show Game</a>
         </div>`

        document.getElementById("detailsContent").innerHTML = box;
}
}
