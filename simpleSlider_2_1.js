function Slider(objSettings, objSource) {

    //Default settings
    const settings = {
        auto: false,
        autoplayInterval: 0,
        animationType: 'fade',
        animationTime: 1500,
    }

    //Default source
    const imgCollectionDefault = {
        slide1: ['https://picsum.photos/900', '#'],
        slide2: ['https://picsum.photos/901', '#'],
        slide3: ['https://picsum.photos/902', '#'],
        slide4: ['https://picsum.photos/903', '#'],
        slide5: ['https://picsum.photos/904', '#'],
    }

    //Constructor
    this.slidesCollection = objSource || imgCollectionDefault
    this.auto = objSettings.auto || settings.auto
    this.autoplayInterval = objSettings.autoplayInterval || settings.autoplayInterval
    this.animationType = objSettings.animationType || settings.animationType
    this.animationTime = objSettings.animationTime || settings.animationTime

    // Main variables:
    let counter = 0

    let slideshowInterval
    let startSlidShowInterval

    const $container = $(objSettings.container)

    let $images
    let $btnGroup
    let $btnPrev
    let $btnNext

    let slideName = `${objSettings.container.slice(1)}-slide`
    let btnPrevName = `${objSettings.container.slice(1)}-btnPrev`
    let btnNextName = `${objSettings.container.slice(1)}-btnNext`
    let btnGroupName = `${objSettings.container.slice(1)}-btnGroup`

    //Service variables
    let currentSlideHeight = 0
    let currentslideWidth = 0
    let nextFlag = false
    let prevFlag = false

    $(document).ready(() => {
        this.createContent()

        $images = $(`.${slideName}`)
        $btnGroup = $(`.${btnGroupName}`)
        $btnPrev = $(`.${btnPrevName}`)
        $btnNext = $(`.${btnNextName}`)

        this.addStyles()

        $images.eq(0).on('load', () => {
            this.resizeContainer()
            currentSlideHeight = this.getContainerHeight() // for correct container resize  
            currentslideWidth = this.getContainerWidth() // for animate  
        })

        this.startSlideShow()

        $btnNext.on('click', () => {
            clearInterval(slideshowInterval)
            clearInterval(startSlidShowInterval)

            startSlidShowInterval = setTimeout(() => {
                this.startSlideShow()
            }, 5000)

            this.next()
        })

        $btnPrev.on('click', () => {
            clearInterval(slideshowInterval)
            clearInterval(startSlidShowInterval)

            startSlidShowInterval = setTimeout(() => {
                this.startSlideShow()
            }, 5000)

            this.prev()
        })
    })

    $(window).resize(() => {
        this.resizeContainer()
    })


    this.createContent = function () {
        let content = ''
        Object.keys(this.slidesCollection).forEach((key) => {
            content += `<img class="img-fluid ${slideName} rounded" src="${this.slidesCollection[key][0]}" alt="${this.slidesCollection[key][1]}">`
        })
        content += `<div class="btn-group ${btnGroupName} text-center d-block" role="group" aria-label="Button group">
                        <button class="btn btn-secondary ${btnPrevName}" type="button">Prev</button>
                        <button class="btn btn-secondary ${btnNextName}" type="button">Next</button>
                    </div>`
        $container.html(content)
    }

    this.addStyles = function () {
        $container.css('position', 'relative').css('overflow', 'hidden')
        $images.css('position', 'absolute').css('top', 0).css('left', '50%')
            .css('transform', 'translateX(-50%)').css('opacity', 0)
        $images.eq(0).css('opacity', 1)
        $btnGroup.css('position', 'absolute').css('bottom', '15px').css('left', '50%')
            .css('transform', 'translateX(-50%)')
    }

    this.resizeContainer = function () {
        $container.css('height', this.getContainerHeight() + 'px')
    }

    this.startSlideShow = function () {
        if (this.auto) {
            slideshowInterval = setInterval(() => this.next(), this.autoplayInterval)
        }
    }

    this.next = function () {
        nextFlag = true
        this.getCurrentAnimationFunction()
        counter++
        if (counter >= $images.length) {
            counter = 0
        }
        this.setResizeMoment()
        this.getNextAnimationFunction()
    }

    this.prev = function () {
        prevFlag = true
        this.getCurrentAnimationFunction()
        counter--
        if (counter < 0) {
            counter = $images.length - 1
        }
        this.setResizeMoment()
        this.getNextAnimationFunction()
    }

    this.setResizeMoment = function () {
        if (this.getContainerHeight() > currentSlideHeight) {
            this.resizeContainer()
        }
        currentSlideHeight = this.getContainerHeight()
    }

    this.getContainerWidth = function () {
        return $images.eq(counter).outerWidth()
    }

    this.getContainerHeight = function () {
        return $images.eq(counter).outerHeight()
    }

    this.getCurrentAnimationFunction = function () {
        switch (true) {
            case (this.animationType === 'fade'):
                return this.currentSlideFade()
            case (this.animationType === 'carousel' && nextFlag):
                return this.currentSlideСarouselLeft()
            case (this.animationType === 'carousel' && prevFlag):
                return this.currentSlideСarouselRight()
            case (this.animationType === 'fly'):
                return this.currentSlideFly()
        }
    }

    this.getNextAnimationFunction = function () {
        switch (true) {
            case (this.animationType === 'fade'):
                return this.nextSlideFade()
            case (this.animationType === 'carousel' && nextFlag):
                return this.nextSlideСarouselLeft()
            case (this.animationType === 'carousel' && prevFlag):
                return this.nextSlideСarouselRight()
            case (this.animationType === 'fly'):
                return this.nextSlideFly()
        }
    }


    //Fade
    this.currentSlideFade = function () {
        $images.eq(counter).animate({
            opacity: 0,
        }, this.animationTime, () => {
            this.resizeContainer()
        })
    }

    this.nextSlideFade = function () {
        $images.eq(counter).animate({
            opacity: 1,
        }, this.animationTime, () => {
            this.resizeContainer()
        })
    }

    //Carousel
    this.currentSlideСarouselLeft = function () {
        $images.eq(counter).animate({
            left: -currentslideWidth * 2 + 'px',
        }, this.animationTime, () => {
            this.resizeContainer()
        }).animate({
            opacity: 0,
        }, 0).animate({
            left: '50%',
        }, 0)
    }

    this.nextSlideСarouselLeft = function () {
        $images.eq(counter).animate({
            left: currentslideWidth * 2 + 'px',
        }, 0).animate({
            opacity: 1,
        }, 0)
        $images.eq(counter).animate({
            left: '50%',
        }, this.animationTime, () => {
            this.resizeContainer()
        })
        nextFlag = false
    }

    this.currentSlideСarouselRight = function () {
        $images.eq(counter).animate({
            left: currentslideWidth * 2 + 'px',
        }, this.animationTime, () => {
            this.resizeContainer()
        }).animate({
            opacity: 0,
        }, 0).animate({
            left: '50%',
        }, 0)
    }

    this.nextSlideСarouselRight = function () {
        $images.eq(counter).animate({
            left: -currentslideWidth * 2 + 'px',
        }, 0).animate({
            opacity: 1,
        }, 0)
        $images.eq(counter).animate({
            left: '50%',
        }, this.animationTime, () => {
            this.resizeContainer()
        })
        prevFlag = false
    }

    //Fly
    this.currentSlideFly = function () {
        $images.eq(counter).animate({
            opacity: 0,
            width: 0,
        }, this.animationTime, () => {
            this.resizeContainer()
        })
    }

    this.nextSlideFly = function () {
        $images.eq(counter).animate({
            width: 0,
        }, 0).animate({
            opacity: 1,
            width: currentslideWidth + 'px',
        }, this.animationTime, () => {
            this.resizeContainer()
        })
    }


}