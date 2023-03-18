import Details from "../details.js";
export class Home{
    constructor(){
           this.loading = document.querySelector('.loading');
           this.getGame('mmorpg');
            this.links = document.querySelectorAll('.navbar-nav a');
             this.links.forEach((item)=>{
              item.addEventListener('click', (eventInfo)=>{ 
              console.log(item);
                document.querySelector('.navbar-nav .active').classList.remove("active");
                eventInfo.target.classList.add("active");
              let category = eventInfo.target.dataset.category   
              this.getGame(category);
            });   
          })                 
      }
    async getGame(category){
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '874f153148msh72f8b67485146c3p120251jsn84b9727b1413',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
        this.loading.classList.remove('d-none');
        let apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        let finalResult = await apiResponse.json();
        this.displayGames(finalResult);
        console.log(finalResult);
        this.currentCard();
        this.loading.classList.add('d-none');
    }
      displayGames(games){
     let container = `` ;
     for (let i = 0; i < games.length; i++) {
       container += `
       <div class="col">
       <div class="card-group">
         <div class="card bg-transparent h-100" id="${games[i].id}">
           <img src="${games[i].thumbnail}" class="card-img-top w-100 object-fit-cover h-100" alt="">
           <div class="card-body d-flex justify-content-between align-items-center">
             <h3>${games[i].title}</h3>
            <span class="p-2 text-bg-primary type">Free</span>
           </div>
           <p class="text-center opacity-50 para">${games[i].short_description.split(" ",10)}</p>
           <div class="card-footer d-flex justify-content-between">
            <span class="text-uppercase">${games[i].genre}</span>
            <span>${games[i].platform}</span>
           </div>
         </div>
       </div>
     </div>`  
     }
     document.getElementById('gameData').innerHTML = container;
    }

   currentCard(){
    let game  = document.querySelectorAll('.card');
    // console.log(game);
    for(let i= 0;i<game.length;i++){
      game[i].addEventListener('click',()=>{
            this.displayDetails(game[i].id)
      })
    }

  }
  displayDetails(id){
    let nextPage = new Details(id);
    document.getElementById('games').classList.add('d-none');
    document.getElementById('details').classList.replace('d-none','d-block');
  };

}
