import React, { Component } from 'react';
// import { movies } from './getMovies';
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
        hover:'',
        parr:[1],
        currPage:1,
        movies:[],
        }
    }
    async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=39d99d2987a787b6846b33042ea3f66c&language=en-US&page=${this.state.currPage}`);
        let data=res.data
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovies=async()=>{
        const res=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=39d99d2987a787b6846b33042ea3f66c&language=en-US&page=${this.state.currPage}`);
        let data=res.data
        this.setState({
            movies:[...data.results]
        })

    }
    handleRight=()=>{
        let temparr=[]
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i)
        }
        this.setState({
            parr:[...temparr],
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
    render() {
        // let movie = movie.results;
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div>
                        <h3 className='text-center'><strong>Trending</strong></h3>
                        <div className='movies-list'>
                            {
                                this.state.movies.map((movieObj) => (
                                    <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className='card-img-top movies-img ' />
                                        {/* <div className="card-body"> */}
                                        <h3 className="card-title movies-title">{movieObj.original_title}</h3>
                                        {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                                        <div className='button-wrapper' style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                            
                                            {
                                                this.state.hover==movieObj.id &&
                                                <a className='btn btn-primary movies-button'>Add to Farvourite</a>
                                            }
                                            
                                        </div>

                                        {/*     </div> */}
                                    </div>

                                ))

                            }
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                    {
                                        this.state.parr.map((value)=>(
                                            <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                }
            </>
        )
    }
}
