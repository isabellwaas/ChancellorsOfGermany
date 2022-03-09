//Adress the HTML element the timeline is to be inserted in
let container = document.getElementById('timeline-container');

//Create and add the elements
let items = new vis.DataSet([
    {id: 1, className: 'container black', content: createItemContent(1, 'Konrad Adenauer', '15 September 1949 -',' 16 October 1963', ['cdu', 'fdp', 'others'],'../resources/images/konrad_adenauer.jpg'), start: '1949-09-15', end: '1963-10-16'},
    {id: 2, className: 'container black', content: createItemContent(2, 'Ludwig Erhard', '16 October 1963 -',' 01 December 1966', ['cdu', 'fdp'],'../resources/images/ludwig_erhard.jpg'), start: '1963-10-16', end: '1966-12-01'},
    {id: 3, className: 'container black', content: createItemContent(3, 'Kurt Georg Kiesinger', '01 December 1966 -',' 21 October 1969',['cdu', 'spd'], '../resources/images/kurt_georg_kiesinger.jpg'), start: '1966-12-01', end: '1969-10-21'},
    {id: 4, className: 'container red', content: createItemContent(4, 'Willy Brandt', '21 October 1969 -',' 07 May 1974', ['spd', 'fdp'],'../resources/images/willy_brandt.jpg'), start: '1969-10-21', end: '1974-05-07'},
    {id: 5, className: 'container red', content: createItemContent(5, 'Helmut Schmidt', '16 May 1974 -', '01 October 1982', ['spd', 'fdp'],'../resources/images/helmut_schmidt.jpg'), start: '1974-05-16', end: '1982-10-01'},
    {id: 6, className: 'container black', content: createItemContent(6, 'Helmut Kohl', '01 October 1982 -', '27 October 1998', ['cdu', 'fdp'],'../resources/images/helmut_kohl.jpg'), start: '1982-10-01', end: '1998-10-27'},
    {id: 7, className: 'container red', content: createItemContent(7, 'Gerhard Schr\u00F6der', '27 October 1998 -','22 November 2005', ['spd', 'gruene'],'../resources/images/gerhard_schroeder.jpg'), start: '1998-10-27', end: '2005-11-22'},
    {id: 8, className: 'container black', content: createItemContent(8, 'Angela Merkel', '22 November 2005 -','08 December 2021', ['cdu', 'spd', 'fdp'],'../resources/images/angela_merkel.jpg'), start: '2005-11-22', end: '2021-12-08'},
    {id: 9, className: 'container red', content: createItemContent(9, 'Olaf Scholz', '08 December 2021 -','Today', ['spd', 'gruene', 'fdp'],'../resources/images/olaf_scholz.jpg'), start: '2021-12-08', end: '2025-12-08'}
]);

//Create some options for the timeline
let options =
{
    height: '800px',
    width: '100%',
    margin:
    {
        item: {horizontal:100, vertical:50},
        axis: 200
    },
    min: new Date(1948, 0, 1),
    max: new Date(2025, 0, 1),
    zoomMin: 1000 * 60 * 60 * 24 * 31 * 80,
    zoomMax: 1000 * 60 * 60 * 24 * 31 * 200,
    moveable: false,
    onInitialDrawComplete: function()
    {
        timeline.moveTo(new Date(1948, 0, 1)), {}
    },
    showCurrentTime: false,
    type: 'box'
};

//Generate the timeline
let timeline = new vis.Timeline(container, items, options);

//Add a hover effect where detailed information about the element is displayed in the hover state
let selectedId=null;
timeline.on("itemover", function (properties)
{
    if(selectedId==properties.item) return;

    if(selectedId!=null)
    {
        document.getElementById("detailInformation "+selectedId).style.display="none";
        document.getElementById("image "+selectedId).style.height="280px";
    }

    selectedId=properties.item;

    document.getElementById("detailInformation "+selectedId).style.display="block";
    document.getElementById("image "+selectedId).style.height="320px";
});

timeline.on("itemout", function (properties)
{
    if(selectedId==properties.item)
    {
        document.getElementById("detailInformation "+selectedId).style.display="none";
        document.getElementById("image "+selectedId).style.height="280px";
    }

    selectedId=null;
});


//Function for generating the elements by specifying various parameters
function createItemContent(id, name, beginningOfTerm, endOfTerm, parties, imageSource)
{
    let nameElement=document.createElement('p');
    nameElement.innerHTML=name;
    nameElement.className="name";

    let beginningOfTermElement=document.createElement('p');
    beginningOfTermElement.innerHTML=beginningOfTerm;
    beginningOfTermElement.className="governorship beginningOfTerm";

    let endOfTermElement=document.createElement('p');
    endOfTermElement.innerHTML=endOfTerm;
    endOfTermElement.className="governorship endOfTerm";

    let detailInformationElement=document.createElement('div');
    parties.forEach(party=>detailInformationElement.appendChild(createPartyElement(party)));
    detailInformationElement.id="detailInformation "+id;
    detailInformationElement.style.display="none";

    let imageElement=document.createElement('img');
    imageElement.src=imageSource;
    imageElement.id="image "+id;
    imageElement.className="image";

    let container=document.createElement('div');
    container.appendChild(nameElement);
    container.appendChild(document.createElement('br'));
    container.appendChild(beginningOfTermElement);
    container.appendChild(document.createElement('br'));
    container.appendChild(endOfTermElement);
    container.appendChild(document.createElement('br'));
    container.appendChild(detailInformationElement)
    container.appendChild(document.createElement('br'));
    container.appendChild(imageElement);

    return container
}

//Function for generating the correct party icon depending on the passed party name
function createPartyElement(party)
{
    let partyElement=document.createElement('img');
    partyElement.className="party";

    switch(party)
    {
        case 'cdu': partyElement.src="../resources/icons/cdu.png"; break;
        case 'spd': partyElement.src="../resources/icons/spd.png"; break;
        case 'fdp': partyElement.src="../resources/icons/fdp.png"; break;
        case 'gruene': partyElement.src="../resources/icons/gruene.png"; break;
        case 'others': partyElement.src="../resources/icons/others.png"; break;
    }

    return partyElement;
}

//Function for zooming in the graphic by the specified percentage
function zoomIn(percentage)
{
    timeline.zoomIn(percentage)
}

//Function for zooming out of the graphic by the specified percentage
function zoomOut(percentage)
{
    timeline.zoomOut(percentage)
}

//Function for moving the visible timeline range by the specified percentage
function moveWindow (percentage)
{
    let window=timeline.getWindow();
    let movementRange=(window.end-window.start)*percentage;
    timeline.setWindow(window.start.valueOf()-movementRange, window.end.valueOf()-movementRange);
}