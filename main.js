$(document).ready(startApp);
let clock = new Clock();
let weather = new Weather();
let music = new MusicPlayer(apiKeys);

function startApp(){
    // SMOOTH SCROLLING 
    $('a').on('click', (event)=> {
        if (event.currentTarget.hash !== ''){
            const hash = event.currentTarget.hash;
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top - $('.header-container').height()
            }, 600)
        }
    })    
    addEventListeners();
    clock.init();
    weather.init();
}
function addEventListeners(){
    $('.mood-button-container').on('click', 'button', (event)=>{
        const moodText = event.currentTarget.firstChild.textContent;
        switchMood(moodText.toLowerCase());
        $('#main-page').fadeOut(700);
        $('#content-page').fadeIn(700);
    })
    $('.back-to-main').on('click', (event)=>{
        $('#main-page').fadeIn(700);
        $('#content-page').fadeOut(700);
    })
}
function switchMood (mood){
    generateHeaderText(mood);
    music.getMusic(mood);
}
function generateHeaderText(mood){
    const musicHeader = $('#music h1');
    const poemHeader = $('#poem h1');
    const newsHeader = $('#news h1');
    const gifHeader = $('#gif h1');

    switch(mood){
        case 'happy':
            musicHeader.text('Lift your spirit with a song');
            poemHeader.text('Think happy thoughts');
            newsHeader.text('Get some heartwarming news');
            gifHeader.text('Here\'s a GIF to put a smile on your face');
            break;
        case 'sad':
            musicHeader.text('Let the floodgates open..');
            poemHeader.text('Let\'s go deep into the burrows of your heart');
            newsHeader.text('Some stories sure to tug the heartstrings');
            gifHeader.text('And a lonely GIF');
            break;
        case 'chill':
            musicHeader.text('Relax your mind with some smooth beats');
            poemHeader.text('Grab a cup o\' joe and have a seat');
            newsHeader.text('Some casual reading for you');
            gifHeader.text('How about a GIF from us to you, friend. -_o');
            break;
        case 'hype':
            musicHeader.text('Let\'s get the party started..');
            poemHeader.text('Legit poems to check out. Cop it, yo');
            newsHeader.text('What\'s poppin\' in the news');
            gifHeader.text('');
            break;
        case 'romantic':
            musicHeader.text('Set the mood right with a song');
            poemHeader.text('My cherie, amour');
            newsHeader.text('Love is in the air. Check out these stories');
            gifHeader.text('');
            break;
        case 'motivated':
            musicHeader.text('Get pumped up');
            poemHeader.text('Find inspiration from your soul');
            newsHeader.text('Some articles to get you motivated');
            gifHeader.text('');
            break;
        default:
            break;
    }
}