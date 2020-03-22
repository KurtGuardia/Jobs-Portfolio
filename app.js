function init(){
    const slides = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const backgrounds = [`radial-gradient(#2B3760, #0B1023)`, `radial-gradient(#4E3022, #161616)`, `radial-gradient(#4E4342, #161616)`];
    //Tracker
    let current = 0;
    let scrollSlide = 0;

    /*---when you click on a dot (master function)---*/
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function(){
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
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
        const nextLeft = nextPage.querySelector('.model-left');
        const nextRight = nextPage.querySelector('.model-right');
        const currentLeft = currentPage.querySelector('.hero .model-left');
        const currentRight = currentPage.querySelector('.hero .model-right');
        const nextText = nextPage.querySelector('.details');
        const portfolio = document.querySelector('.portfolio');
        
        const tl = new TimelineMax({                //para que no se pueda hacer scroll o click en slide como loco, sino que espere a que la animacion termine
            onStart: function() {
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'none';
                })
            },
            onComplete: function() {
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'all';
                })
            }
        });

        tl.fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' })
        .fromTo(currentRight, 0.3, { y: '10%' }, { y: '-100%' }, '-=0.2')       //El -=0.2 es un opuesto al delay, lo apresura
        .to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
        .fromTo(currentPage, 0.3, { opacity: 1, pointerEvents: 'all' }, { opacity: 0, pointerEvents: 'none' })
        .fromTo(nextPage, 0.3, { opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'all' })
        .fromTo(nextLeft, 0.3, { y: "-100%"}, { y: "-10%" }, "-=0.6")
        .fromTo(nextRight, 0.3, { y: "-100" }, { y: "10%" }, "-=0.8")
        .fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
        .set(nextLeft, {clearProps: 'all'})                //Estos obj clearPorps que se fijan con .set sirven debido a que luego de hacer la animacion se jode el efecto hover que tenia al princpio
        .set(nextRight, {clearProps: 'all'})

        
    current = pageNumber;

    }   

    document.addEventListener('wheel', throttle(scrollChange, 1500));     //Para que cuando hagamos scroll con la rueda del mouse solo detecte una vez cada 1.5s
    document.addEventListener('touchmove', throttle(scrollChange, 1500));       //Para que sirva el efecto en moviles

    function switchDots(dotNumber){
        const activeDot = document.querySelectorAll('.slide')[dotNumber]
        slides.forEach(slide => {
            slide.classList.remove('active');
        })
        activeDot.classList.add('active');
    }

    function scrollChange(e){               
        if(e.deltaY > 0){               //deltaY detecta si es un scroll hacia arriba o hacia abajo si es positivo o negativo, es algo que se verifica con el console.lo
            scrollSlide += 1;           
        } else {    
            scrollSlide -= 1;
        }

        if(scrollSlide > 2){
            scrollSlide = 0;
        }

        if(scrollSlide < 0){
            scrollSlide = 2;
        }

        nextSlide(scrollSlide);
        switchDots(scrollSlide);  
    }

    const habmburger = document.querySelector('.menu');
    const habmburgerLines = document.querySelectorAll('.menu line');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');

    const tl = new TimelineMax({paused: true, reversed: true});

    tl.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y:10 }, {opacity: 1, y:0 }, '-=0.1')
    .fromTo(social, 0.5, { opacity: 0, y:10 }, {opacity: 1, y:0 }, '-=0.5')
    .fromTo(logo, 0.2, {color: 'white'}, {color: 'black'}, '-=1')
    .fromTo(habmburgerLines, 0.2, {stroke: 'white'}, {stroke: 'black'}, '-=1');

    habmburger.addEventListener('click', () => {
        tl.reversed() ? tl.play() : tl.reverse();           //sirve para devolver los valores y de esa manera click en menu despliega y click de nuevo lo retrae
    });



}




function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
}




init();