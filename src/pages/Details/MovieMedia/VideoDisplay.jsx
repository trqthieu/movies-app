import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import formatDate from 'src/common/formatDate';
import TrailerPopup from 'src/components/TrailerPopup/TrailerPopup';

function VideoDisplay({ videoList }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState();
  const handleShowVideo = videoId => {
    setShowVideo(true);
    setVideoId(videoId);
  };
  return (
    <div className='video_list'>
      {videoList.map(video => (
        <div key={video.id} className='video_item'>
          <div
            style={{
              backgroundImage: `url(https://i.ytimg.com/vi/${video.key}/hqdefault.jpg)`,
            }}
            className='video_item_background'
          >
            <div
              onClick={() => handleShowVideo(video.id)}
              className='play_icon'
            >
              <FontAwesomeIcon icon={faPlay} />
            </div>
            {showVideo && videoId === video.id && (
              <TrailerPopup
                videoPath={video.key}
                setShowVideo={setShowVideo}
                id={video.id}
              />
            )}
          </div>
          <div className='video_info'>
            <h3 className='video_info_name'>{video.name}</h3>
            <p className='video_info_time'>
              {video.type} • {formatDate(video.published_at)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoDisplay;
