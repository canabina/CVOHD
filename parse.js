const fs = require('fs');
const Jimp = require('jimp');
const brain = require('brain');
const net = new brain.NeuralNetwork();
const _ = require('lodash');

let digitImagePath = './numbers/test/digit.png';

Jimp.read(digitImagePath, (err, image) => {
    let matrix = {};
    image.resize(30, 30);
    for (let y = 0; y <= 30; y++) {
        for (let x = 0; x <= 30; x++) {
            let summary = 0;
            _.each(Jimp.intToRGBA(image.getPixelColor(x, y)), v => summary += v);
            let isBlackPixel = summary > 900 ? 0 : 1;
            if (isBlackPixel)
                matrix[image.getPixelIndex(x, y)] = isBlackPixel;
        }
    }
    net.fromJSON(JSON.parse(fs.readFileSync('./model.json').toString('UTF-8')));

    let results = net.run(matrix);
    let toShowResults = _.orderBy(_.map(results, (v, k) => ({
        digit: k,
        accuracy: _.round(v, 5)
    })), 'accuracy', 'desc');

    console.log(toShowResults);
});

