$(document).ready(startApp);
let clock = new Clock();

function startApp(){
    $('a').on('click', (event)=> {
        if (event.currentTarget.hash !== ''){
            const hash = event.currentTarget.hash;
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top - $('.header-container').height()
            }, 600)
        }
    })
    clock.init();
}
