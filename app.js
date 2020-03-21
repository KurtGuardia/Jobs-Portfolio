function init(){
    const slides = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const backgrounds = [`radial-gradient(#2B3760, #0B1023)`, `radial-gradient(#4E3022, #161616)`, `radial-gradient(#4E4342, #161616)`];
    //Tracker
    let current = 0;


    /*---when you click on a dot (master function)---*/
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function(){
            changeDots(this);
            nextSlide(index);
        })
    });

    /*----to toogle the white dot to the correspondant dot----*/
    function changeDots(dot){
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dot.classList.add('active');
    };

    /*-----to switch to the other page-----*/
    function nextSlide(pageNumber){
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector('.hero .model-left');
        const nextRight = nextPage.querySelector('.hero .model-right');
        const currentLeft = currentPage.querySelector('.hero .model-left');
        const currentRight = currentPage.querySelector('.hero .model-right');
        const nextText = nextPage.querySelector('.details');
        const portfolio = document.querySelector('.portfolio');
        
        const tl = new TimelineMax();

        tl.fromTo(currentLeft, 0.3, {y: '-10'}, {y: '-100%'})
        .fromTo(currentRight, 0.3, {y: '10'}, {y: '-100%'}, '-=0.5')        //ese -=0.5 es el opuesto a delay, es decir aparece rapido
        .to(portfolio, 0.3, {backgroundImage: backgrounds[pageNumber] })
        .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: 'all'}, {opacity: 0, pointerEvents: 'none'})
        .fromTo(nextPage, 0.3, {opacity:0, pointerEvents: 'none'}, {opacity:1, pointerEvents: 'all'}, '-=0.6')
        .fromTo(nextLeft, 0.3, { y: '-100%' }, { y: '-10%' }, '-=0.6')
        .fromTo(nextRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.8')
        
    
    current = pageNumber;

    }   




}

init();