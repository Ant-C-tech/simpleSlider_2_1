'use strict'

const imgCollection = {
    slide1: ['https://picsum.photos/800', '#'],
    slide2: ['https://picsum.photos/801', '#'],
    slide3: ['https://picsum.photos/802', '#'],
    slide4: ['https://picsum.photos/703', '#'],
    slide5: ['https://picsum.photos/804', '#'],
}

const imgCollection2 = {
    slide1: ['https://picsum.photos/750', '#'],
    slide2: ['https://picsum.photos/751', '#'],
    slide3: ['https://picsum.photos/652', '#'],
    slide4: ['https://picsum.photos/753', '#'],
    slide5: ['https://picsum.photos/754', '#'],
}



let slider = new Slider({
    container: '.galery',
})

let slider2 = new Slider({
        container: '.galery2',
        auto: true,
        autoplayInterval: 3000,
        animationType: 'carousel',
        animationTime: 1500,
    },
    imgCollection)

let slider3 = new Slider({
        container: '.galery3',
        auto: false,
        autoplayInterval: 2000,
        animationType: 'fly',
        animationTime: 2000,
    },
    imgCollection2)