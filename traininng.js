const pathToDigits = './digits/original';

const _ = require('lodash');
const brain = require('brain');
const fs = require('fs');
const Jimp = require('jimp');
const progressBar = require('cli-progress-bar');
const net = new brain.NeuralNetwork();
const bar = new progressBar();

bar.show("Started", 0);
bar.pulse("Scanning folder with images of digits");

let addrToDigits = _.map(fs.readdirSync(pathToDigits), filename => ({pathName: `${pathToDigits}/${filename}`, digitId: filename}));
let learningData = [];
let promises = [];

bar.show("Scanning was successfully", 0.2);
bar.pulse("Loading images, and preparing data for neural network");

_.map(addrToDigits, item => {

    promises.push(new Promise((resolve, reject) => {
        let trainingIteration = {input: [], output: {}};
        let digitId = item.digitId.split('|')[0];
        Jimp.read(item.pathName, (err, image) => {
            if (err) return reject(err);
            let matrix = {};
            for (let y = 0; y <= 30; y++) {
                for (let x = 0; x <= 30; x++) {
                    let summary = 0;
                    _.each(Jimp.intToRGBA(image.getPixelColor(x, y)), v => summary += v);
                    let isBlackPixel = summary > 900 ? 0 : 1;
                    if (isBlackPixel)
                        matrix[image.getPixelIndex(x, y)] = isBlackPixel;
                }
            }
            trainingIteration.input = matrix;
            trainingIteration.output[digitId] = 1;
            learningData.push(trainingIteration);
            resolve();
        });
    }));

});

let afterReadImages = () => {
    bar.show("Images was successfully loaded and parsed", 0.6);
    bar.pulse("Training neural network, wait few minutes");

    net.train(learningData);
    var json = net.toJSON();

    bar.show("Neural network was successfully trained", 0.9);
    bar.pulse("Saving model of neural network in JSON file");

    fs.writeFile("./model.json", JSON.stringify(json), err => {
        if (err) return console.log(err);
        bar.show("Model file was saved!", 1);
        return bar.hide();
    });
};

Promise.all(promises).then(afterReadImages).catch(console.error);

