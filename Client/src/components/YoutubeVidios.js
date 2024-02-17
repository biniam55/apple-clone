import React, {useState, useEffect} from 'react'
import './youtube.css'
function YoutubeVidios() {
    const [youtubeVidios, setvideos]=useState([])
    useEffect(() =>{
        fetch(
            " https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=9&key=AIzaSyDejhTWiKIcTue-qMca8oFedBHoABzMrMI"
        )
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setvideos(data.items)
        })
    },[])

    console.log(youtubeVidios)
  return (
    <div className='allvidioswrapper'>
        <div className='container'>
            <div className='row justify-content-center text-center' >
                <div className='col-12'>
                    <div className='title-wraper'>
                        Latest Videos<br/>
                        <br/>
                    </div>
                </div>
                {youtubeVidios?.map((singlevideo, i) => {
                let VidId = singlevideo.id.videoId;
                let VidLink = `https://www.youtube.com/watch?v=${VidId}`;
                    
                    return (
                        <div className='col-sm-12 col-md-6 col-lg-4' key={i}>
                            <div className='SingleVidioWrapper'>
                                <div className='VidioThumbnail'>
                                    <a href={VidLink} target='_blank' rel='noopener noreferrer'>
                                        <img src={singlevideo.snippet.thumbnails.high.url} alt='Video Thumbnail' />
                                    </a>
                                </div>
                                <div className='VidioInfoWrapper'>
                                    <div className='VidioTitle'>
                                        <a href={VidLink} target='_blank' rel='noopener noreferrer'>
                                            {singlevideo.snippet.title}
                                        </a>
                                    </div>
                                    <div className='VidioDesc'>{singlevideo.snippet.description}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

        </div>
    </div>
  )
}

export default YoutubeVidios