const addDataWrapper = () => {

  const extractDataWrapperId = (url) => {
    const match = url.match(/datawrapper\.dwcdn\.net\/([^/]+)/);
    return match ? match[1] : null;
  };

  document.querySelectorAll('iframe[src*="datawrapper"]').forEach((iframe) => {
    const parent = iframe.parentNode;

    // Set Position relative to parent
    parent.style.position = 'relative';

    // Inject HTML
    parent.insertAdjacentHTML('afterbegin', `<a href="https://app.datawrapper.de/chart/${extractDataWrapperId(iframe.src)}/visualize" target="_blank" class="nzz_extension_edit" alt="Bearbeiten in DataWrapper"></a>`);
  })
}

const qItems = {
  "charts": {
    "selector": ".q-chart-container",
    "url": "https://qv2.st.nzz.ch/editor/chart/%id%"
  },
  "table": {
    "selector": ".q-table-container",
    "url": "https://qv2.st.nzz.ch/editor/table/%id%"
  },
  "choropleth": {
    "selector": ".q-choropleth-container",
    "url": "https://qv2.st.nzz.ch/editor/choropleth/%id%"
  },
  "electionVotes": {
    "selector": ".q-election_votes-container",
    "url": "https://qv2.st.nzz.ch/editor/coalition_calculation/%id%"
  },
  "electionSeats": {
    "selector": ".q-election_seats-container",
    "url": "https://qv2.st.nzz.ch/editor/election_seats/%id%"
  },
  "electionExecutive": {
    "selector": ".q-election_executive-container",
    "url": "https://qv2.st.nzz.ch/editor/election_executive/%id%"
  },
  "imageSlider": {
    "selector": ".q-imageslider-container",
    "url": "https://qv2.st.nzz.ch/editor/imageslider/%id%"
  },
  "infographic": {
    "selector": ".q-infographic-container",
    "url": "https://qv2.st.nzz.ch/editor/infographic/%id%"
  },
  "locatorMap": {
    "selector": ".q-locator_map-container",
    "url": "https://qv2.st.nzz.ch/editor/locator_map/%id%"
  },
  "partySlogan": {
    "selector": ".q-party_slogans-container",
    "url": "https://qv2.st.nzz.ch/editor/party_slogans/%id%"
  },
  "pollResult": {
    "selector": ".q-poll_result-container",
    "url": "https://qv2.st.nzz.ch/editor/poll_result/%id%"
  }
}


const addQ = (props) => {

  document.querySelectorAll(props.selector).forEach((chart) => {

    const parent = chart.parentNode.parentNode;

    // Set Position relative to parent
    parent.style.position = 'relative';

    // URL
    url = props.url.replace("%id%", chart.getAttribute("data-q-item-id"));

    // Add HTML Code
    parent.insertAdjacentHTML('afterbegin', `<a href="${url}" target="_blank" class="nzz_extension_edit" alt="Bearbeten in Q"></a>`);
  })
}

const init = () => {
  // Add DataWrapper
  addDataWrapper();

  // Add Q-Items
  addQ(qItems['charts']);
  addQ(qItems['table']);
  addQ(qItems['choropleth']);
  addQ(qItems['choropleth']);
  addQ(qItems['electionVotes']);
  addQ(qItems['electionSeats']);
  addQ(qItems['electionExecutive']);
  addQ(qItems['imageSlider']);
  addQ(qItems['infographic']);
  addQ(qItems['locatorMap']);
  addQ(qItems['partySlogan']);
  addQ(qItems['pollResult']);
}

/**
 * Main function when Extension is loaded
 */
setTimeout(() => {

  // Register event when site changes
  window.navigation.addEventListener("navigate", () => {

    // When location change, remove everything and add it again
    document.querySelectorAll('.nzz_extension_edit').forEach((el) => el.remove());

    setTimeout(init, 500);
  })

  // Init Exteion
  init();

}, 500)

