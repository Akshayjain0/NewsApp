import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import InfiniteScroll from "react-infinite-scroll-component";

// import PropTypes from 'prop-types'

export class News extends Component {
  // static defaultProps = {
  //   country: 'in',
  //   pageSize: 8,
  //   category: "general"
  // }
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string
  // }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 0,
      totalResults: 0
    }
    // let category = this.props.category;
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page: this.state.page + 1
    })
    this.props.setProgress(100);
    
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5b5858a2f40497ca535cb7509577183&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }
  // handlePreviousClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5b5858a2f40497ca535cb7509577183&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading: true})
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseData.articles,
  //   //   loading: false
  //   // })
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews();
  // }
  // handleNextClick = async () => {
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5b5858a2f40497ca535cb7509577183&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading: true})
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parseData.articles,
  //   //     loading: false
  //   //   })
  //   // }
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }

  fetchData = async () => {
    // this.setState({ page: this.State.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5b5858a2f40497ca535cb7509577183&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    let parseData = await data.json();

    setTimeout(() => {
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
        page: this.state.page+1,
        loading: true,
      })
    }, 100)

  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines in</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        // scrollableTarget="scrollableDiv"

        >
          <div className="container">

            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                </div>
              })}

            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>	&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}


      </>
    )
  }
}

export default News