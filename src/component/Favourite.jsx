import React, { Component } from 'react'
import '../style/Favourite.css'
import { movies } from './getMovies'

export default class extends Component {

  constructor(){
    super();
    this.state={
      genres:[],
      currGen:'All Genres',
      movies:[],
      currText:'',
      limit:5,
      currPage:1
    }
  }

  componentDidMount(){
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
   
    

    let data=JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp=[];
    data.forEach((movieObj)=>{
      if(!temp.includes(genreids[movieObj.genre_ids[0]])){
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
  })
  temp.unshift("All Genres");
  this.setState({
    genres:[...temp],
    movies:[...data]
  })
  }

  handleGenreChange=(genre)=>{
    this.setState({
      currGen:genre
    })
  }

  sortPopularityDesc=()=>{
     let temp=this.state.movies;
     temp.sort(function(a,b){
      return a.popularity-b.popularity
     })
     this.setState({
      movies:[...temp]
     })
  }


  sortRatingDesc=()=>{
    let temp=this.state.movies;
    temp.sort(function(a,b){
     return a.vote_average-b.vote_average
    })
    this.setState({
     movies:[...temp]
    })
  }

  sortPopularityAsc=()=>{
    let temp=this.state.movies;
    temp.sort(function(a,b){
     return b.popularity-a.popularity
    })
    this.setState({
     movies:[...temp]
    })
 }


 sortRatingAsc=()=>{
   let temp=this.state.movies;
   temp.sort(function(a,b){
    return b.vote_average-a.vote_average
   })
   this.setState({
    movies:[...temp]
   })
 }


 handlePageChange=(page)=>{
    this.setState({
      currPage:page
    })
 }

 handleDelete=(id)=>{
  let newarr = [];
  newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
  this.setState({
      movies:[...newarr]
  })
  localStorage.setItem("movies-app",JSON.stringify(newarr))
}

  render() {

    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let filterArr=[];

    if(this.state.currText==''){
      filterArr=this.state.movies;
    }else{
      filterArr=this.state.movies.filter((movieObj)=>{
        let title=movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())
      });
    }

    if(this.state.currGen!="All Genres"){
      filterArr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currGen);
    }

    let pages=Math.ceil(filterArr.length/this.state.limit);
    console.log(pages)
    let pageArr=[];
    for(let i=1;i<pages;i++){
      pageArr.push(i);
    }

    let starIndex=(this.state.currPage-1)*this.state.limit;
    let endIndex=starIndex+this.state.limit;
    filterArr=filterArr.slice(starIndex,endIndex);
  
    return (
      
      <div className='main'>

          <div className='row'>

              <div className='col-md-3'>

              <ul class="list-group favourites-genres">
                {
                  this.state.genres.map((genre)=>(
                    this.state.currGen==genre?
                      <li class="list-group-item" style={{backgroundColor:'#3f51b5',fontWeight:'bolder',color:'white'}}>{genre}</li>
                      :
                      <li class="list-group-item" style={{backgroundColor:'white',color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                  ))
                }
              </ul>
                
              </div>
              <div className='col-md-9'>

              <div className='row'>
              <div className="input-group flex-nowrap col">
                  <span className="input-group-text" id="addon-wrapping">Search</span>
                  <input type="text" className="form-control" placeholder="Enter Movies Name" aria-label="Username" aria-describedby="addon-wrapping" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})} />
              </div>

              <div className="input-group flex-nowrap col">
                  <span className="input-group-text" id="addon-wrapping" >Total Favourite Movies</span>
                  <input type="number" className="form-control" aria-label="Username" aria-describedby="addon-wrapping" value={this.state.limit} onChange={(e)=>this.setState({
                    limit:e.target.value
                  })}/>
              </div>
              </div>
              
              <div className='row container-fluid main-table'>

              <table class="table table-striped col">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}/>Popularity <i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}/></th>
                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}/>Rating <i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}/></th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterArr.map((movieObj)=>{
                      return (
                  <tr>
                    <td><img style={{height:'50px',width:'50px',borderRadius:'50%'}} src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} />{movieObj.original_title}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average}</td>
                    <td><button className='btn btn-danger' onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                  </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              </div>
              <div className='row'>
                   <nav aria-label="Page navigation example" style={{display:'flex',justifyContent:'center'}}>
                      <ul class="pagination">
                        {
                          pageArr.map((page)=>(
                            <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                          ))
                        }
                      </ul>
                    </nav>
              </div>
            </div>

          </div>
  

      </div>
      
    )
  }
}
