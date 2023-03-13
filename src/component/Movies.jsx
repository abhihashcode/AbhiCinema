import React, { Component } from 'react'
// import { movies } from './getMovies'
import '../style/Movie.css'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }

    }

    changeMovies=async()=>{
        // console.log("changemovies called");
        // console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=async()=>{
        let tempArr=[];
        for(let i=1;i<=this.state.parr.length+1;i++){
            tempArr.push(i);
        }

        this.setState({
            parr:[...tempArr],
            currPage:this.state.currPage+1
        },this.changeMovies)
    }

    handleLeft=()=>{
        if(this.currPage!=1){
              this.setState({
                currPage:this.state.currPage-1
              },this.changeMovies)
        }
    }

    handleClick=(value)=>{
        if(value!=this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }

    handleFavourite=(movie)=>{
          let oldData=JSON.parse(localStorage.getItem('movies-app') || "[]");
          if(this.state.favourites.includes(movie.id)){
              oldData=oldData.filter((m)=>(
                m.id!=movie.id
              ))
          }else{
            oldData.push(movie);
          }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouriteState();
    }

    handleFavouriteState=()=>{
        let oldData=JSON.parse(localStorage.getItem('movies-app') || "[]");
        let temp=oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

    async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=hi-IN&page=${this.state.currPage}`);
        let data=res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }

    render() {
    //   let movie=movies.results;
      console.log("Render")
    return (
      <>
      {this.state.movies.length===0?
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            
      :
      <div>
        <h3 className='text-center' style={{fontWeight:'900',color:'black',marginBottom:'20px'}}>Trending Movies</h3>
        <div className='movie-container'>
            {
                this.state.movies.map((movieObj)=>(
                    <div className="card movie-card">
                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-image" alt="..."/>
                        <div className='movie-details'>
                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                            {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                            <a className='btn btn-primary' style={{fontSize:'9.5px'}} onClick={()=>{this.handleFavourite(movieObj)}}>{this.state.favourites.includes(movieObj.id)?"Remove From Favourite":"Add To Favourite"}</a>
                        </div>
                    </div>
                ))
            }
        </div>
                <div className="movie-pagination">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                ))
                            }
                            <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
      </div>
      }
      </>
    )
  }
}
