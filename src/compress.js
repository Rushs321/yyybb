const sharp = require('sharp');
const redirect = require('./redirect');

function compress(req, res, input) {
  const format = req.params.webp ? 'webp' : 'jpeg';

  const transform = sharp()
    .grayscale(req.params.grayscale)
    .toFormat(format, {
      quality: req.params.quality,
      progressive: true,
      optimizeScans: true
    });

  input.pipe(transform)
    .on('info', info => {
      res.header('content-type', `image/${format}`);
      res.header('x-original-size', req.params.originSize);
      res.header('x-bytes-saved', req.params.originSize - info.size);
      res.status(200);
    })
    .on('error', () => redirect(req, res))
    .pipe(res);
}

module.exports = compress;
