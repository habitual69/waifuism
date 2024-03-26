const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const UserAgent = require('fake-useragent');
const path = require('path');

const app = express();

const jsongen = async (url) => {
  try {
    const headers = {
      'X-Signature-Version': 'web2',
      'X-Signature': crypto.randomBytes(32).toString('hex'),
      'User-Agent': new UserAgent().random,
    };
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const getVideoUrl = async (id) => {
  const videoApiUrl = 'https://hanime.tv/api/v8/video?id=';
  const videoDataUrl = videoApiUrl + id;
  const videoData = await jsongen(videoDataUrl);
  const stream720p = videoData.videos_manifest.servers[0].streams.find(s => s.height === "720") || videoData.videos_manifest.servers[0].streams[0];
  const streamUrl = stream720p.url;
  const firstTag = videoData.hentai_tags[0] ? videoData.hentai_tags[0].text : 'No Tag';
  return {
    streamUrl,
    firstTag
  };
};

const getBrowse = async () => {
    const browseUrl = 'https://hanime.tv/api/v8/browse';
    const data = await jsongen(browseUrl);
    return data.hentai_tags.map(x => ({
        text: x.text,
        url: `/playlist/tags/${x.text}/1`,
    }));
};

const getBrowseVideos = async (type, tagOrTime, page) => {
    let browseUrl = '';
    if (type === 'hentai-tags') {
        browseUrl = `https://hanime.tv/api/v8/browse/hentai-tags/${tagOrTime}?page=${page}&order_by=views&ordering=desc`;
    }
    else if (type === 'trending') {
        browseUrl = `https://hanime.tv/api/v8/browse-trending?time=${tagOrTime}&page=${page}&order_by=views&ordering=desc`;
    }
    console.log(browseUrl);
    const browsedata = await jsongen(browseUrl);
    return browsedata.hentai_videos.map(x => ({
        id: x.id,
        name: x.name,
        cover_url: x.cover_url,
    }));
};



const generatePlaylist = async (videos) => {
  let playlist = '#EXTM3U\n';
  for (const video of videos) {
    const { streamUrl, firstTag } = await getVideoUrl(video.id);
    if (streamUrl) {
      playlist += `#EXTINF:-1 tvg-id="${video.id}" tvg-name="${video.name}" tvg-logo="${video.cover_url}" tvg-language="English" tvg-type="${firstTag}" group-title="${video.name}",${video.name}\n${streamUrl}\n`;
    }
  }
  return playlist;
};

app.get('/playlist/trending/:time/:page', async (req, res, next) => {
    try {
      const { time, page } = req.params;
      const videos = await getBrowseVideos('trending', time, page);
      const playlist = await generatePlaylist(videos);
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.setHeader('Content-Disposition', `attachment; filename="trending_playlist_${time}_${page}.m3u8"`);
      res.send(playlist);
    } catch (error) {
      next(error);
    }
  });
  

app.get('/playlist/tags/:tag/:page', async (req, res, next) => {
    try {
      const { tag, page } = req.params;
      const videos = await getBrowseVideos('hentai-tags', tag, page); // Fixed function name and parameters
      const playlist = await generatePlaylist(videos);
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.setHeader('Content-Disposition', `attachment; filename="playlist_${tag}_${page}.m3u8"`);
      res.send(playlist);
    } catch (error) {
      next(error);
    }
  });

  app.get('/tags', async (req, res, next) => {
    try {
      const tags = await getBrowse();
      res.json(tags);
    } catch (error) {
      next(error);
    }
  });
  
  
  app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
  });

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log(`Server is running on port ${port}`);
});
