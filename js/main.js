$(document).ready(startApp);

function startApp(){
    // Smooth Scrolling
    $('a').on('click', (event)=> {
        if (event.currentTarget.hash !== ''){
            const hash = event.currentTarget.hash;
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top - $('.header-container').height()
            }, 600)
        }
    });
    
    // Instantiate the App
    const app = new App(apiKeys);
    app.init();
}