import * as WebTorrent from 'webtorrent'

export function downloadTorrentFile(torrentId, path, callback) {
  if (!torrentId) return callback('torrentId is null')

  console.log('create web torrent client')
  const client = new WebTorrent()

  client.add(torrentId, { path }, function(torrent) {
    torrent.on('download', function() {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      const downloaded = torrent.downloaded
      var i = parseInt(Math.floor(Math.log(downloaded) / Math.log(1024)))
      const total = `${Math.round(downloaded / Math.pow(1024, i), 2)} ${sizes[i]}`
      callback(null, { progress: torrent.progress, name: torrent.name, total })
    })

    var file = torrent.files.find(function(file) {
      return file.name.endsWith('.warp')
    })
    console.log('file', file)
    callback(null, file)
  })
}