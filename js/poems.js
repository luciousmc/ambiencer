class PoemsAPI{
  constructor(){
    this.endpoint = 'https://poetrydb.org/lines,linecount/';
    this.moodVariations = {
      happy: ['happy', 'cheerful', 'laugh', 'smile'],
      sad: ['sad', 'gloomy', 'sorrow'],
      romantic: ['love', 'roses', 'sappy', 'romantic'],
      hype: ['exciting', 'hype', 'party', 'rave'],
      chill: ['lo-fi', 'bonfire', 'fireplace', 'cozy'],
      motivated: ['confident', 'motivational']
    }
  }
  getPoems(mood){
    // Select the section where the poem will be inserted
    const sectionContainer = $('.section-2');

    // Loading text. Displayed before poem loads
    const loadingText = $('<h1>').addClass('loading-text');
    loadingText.text('Loading Poem...');
    sectionContainer.append(loadingText);

    // GET request using search term returned by makeQuery()
    const searchTerm = this.makeQuery(this.moodVariations[mood]) + ';30:abs';
    $.getJSON(this.endpoint + searchTerm)
        .done((result)=>{
            // Remove the loading text so the poem can be displayed
            $(loadingText).fadeOut(300);
            const poemToDisplay = shared.randomize(result);

            // Send poem to render() to be displayed on the DOM
            this.render(poemToDisplay);
        })
        .fail((err)=>{
            console.log('sorry there was an error: ', err);
        })
  }
  makeQuery(mood){
    // Uses shared randomize function to pick a random word from the list
    const output = shared.randomize(mood);
    return output;
  }
  render(poem){
    // Select the section where the poem will be added
    const titleContainer = $('.section-2');
    const container = $('#poem-content-container');

    // Creates an element for the title of the poem
    const poemTitleContainer = $('<div>').addClass('poem-title-container');
    const poemTitle = $('<h3>').addClass('poem-title').text(poem.title);
    poemTitle.after(`<p>by: ${poem.author}</p>`);
    poemTitleContainer.append(poemTitle);
    titleContainer.append(poemTitleContainer);

    // Creates an element for the poem content
    const poemTextContainer = $('<div>').addClass('poem-text-container');
    const arrLen = poem.lines.length;
    for (let line = 0; line < arrLen; line++){
      let poemText = $('<p>').addClass('poem-text').text(poem.lines[line]);
      poemTextContainer.append(poemText);
    }

    // Append the poem to the DOM using fadeIn()
    container.append(poemTextContainer);
    poemTitleContainer.fadeIn(600)
    container.fadeIn(600);
  }
}