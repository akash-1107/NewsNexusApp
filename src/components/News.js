import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const b = props.apiKey;
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 

  const loadNewsItems = async () => {
    let response = await fetch(`https://mernnewsnexus.onrender.com/api/auth/newsData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: currentPage }),
    });
    props.setProgress(30);
    response = await response.json();
    props.setProgress(70);
    setNewsItems(response[b]);
    props.setProgress(100);
    setLoader(false);
  };
  
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsNexus`;
    props.setProgress(10);
    loadNewsItems();
  },[]);


  const fetchMoreData = async () => {
    let response = await fetch(`https://mernnewsnexus.onrender.com/api/auth/newsData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: currentPage +1 }),
    });
    setCurrentPage(currentPage + 1);
    response = await response.json();
    setNewsItems(newsItems.concat(response[b]));
  }; 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsNexus - {capitalizeFirstLetter(props.category)}  Top Headlines</h1>
                
                {loading && <Spinner />}   
                {/* //agr loader true hai tb spinner dikhao bss first time yaha se */}
     <InfiniteScroll dataLength={newsItems.length} next={fetchMoreData} 
                                         hasMore={newsItems.length < 30} loader={<Spinner/>}> 
                                         {/* //phir loader yaha se */}
                    <div className="container">
                    <div className="row"> 
                    {/* //grids */}
                        {newsItems.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                {/* kitna column size lega ahr element batana hoga and primark key ke liye ek unique chij do */}
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                  </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
