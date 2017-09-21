# CVOHD
Computer vision of handwritten digits

## What doing this neural network ?

> This network does training with images which have handwritten digits. After that, you can run network by created model, and guess handwritten digit, by the image. Result will be JSON file like that:
```json
[ { "digit": '6', "accuracy": 0.99942 },
  { "digit": '8', "accuracy": 0.83699 },
  { "digit": '0', "accuracy": 0.00608 },
  { "digit": '1', "accuracy": 0.00179 },
  { "digit": '7', "accuracy": 0.00012 },
  { "digit": '2', "accuracy": 0.00002 },
  { "digit": '3', "accuracy": 0.00001 },
  { "digit": '4', "accuracy": 0 },
  { "digit": '5', "accuracy": 0 },
  { "digit": '9', "accuracy": 0 } ]
```
## How to traininng netwok ?

>	Data for training to present in **digits** folder. And you just should run one command
```sh
	$ npm run traininng
```
## How to parse image ?

>	Just change reference to image in **parse.js** file, variable name is **digitImagePath**, after run command
```sh
	$ npm run parse
```
## How it works:
> To be .....
#### Required modules

* Lodash
* JIMP
* Brain.JS
* progressBar