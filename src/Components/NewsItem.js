import React, { Component } from 'react'
import newsImg from './news.jpg';

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, date, author, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: "flex-end", position: "absolute", right: 0 }}>
                        <span className=" badge rounded-pill text-bg-danger">
                            {source}
                        </span>
                    </div>
                    <img src={!imageUrl ? newsImg : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem