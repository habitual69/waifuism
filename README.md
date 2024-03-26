# Waifuism API Documentation

## Overview

The Waifuism API, an unofficial hanime.tv API, allows you to fetch content from hanime.tv to use with IPTV clients for seamless entertainment. This documentation outlines how to interact with the API to retrieve M3U8 playlist files for streaming.

<a href="https://www.buymeacoffee.com/habitual69" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## Endpoints

### 1. Trending Playlist

- **Description:** Generate a playlist based on trending content, with support for pagination.
- **Endpoint:** `GET /playlist/trending/:time/:page`
- **Example:** `http://localhost:3000/playlist/trending/1`
- **Parameters:**
  - `time`: The time frame for trending content (e.g., daily, weekly).
  - `page`: Page number for pagination.

### 2. Tag-Based Playlist

- **Description:** Create a playlist based on a specific tag, also supporting pagination.
- **Endpoint:** `GET /playlist/tags/:tag/:page`
- **Example:** `http://localhost:3000/playlist/tags/3d/1`
- **Parameters:**
  - `tag`: The tag to filter content by.
  - `page`: Page number for pagination.
- **Available tags:** See the list [here](./tags).

## Using This API

To use this API, make a GET request to the desired endpoint with the appropriate parameters. The response will be an M3U8 playlist file that you can use directly in compatible IPTV clients for streaming content.

## Node.js Backend

The API's backend is built with Express.js and utilizes Axios for HTTP requests, and `crypto` and `fake-useragent` for security and request headers manipulation. It features several endpoints to browse videos by tags, trending content, and generate playlist files dynamically.

For detailed implementation, refer to the provided Node.js code snippet.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

license
MIT License
```
Copyright (c) 2012-2024 Scott Chacon and others

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```