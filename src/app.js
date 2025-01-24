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
    parent.insertAdjacentHTML('afterbegin', `<div class="nzz_extension_edit"><a href="https://app.datawrapper.de/chart/${extractDataWrapperId(iframe.src)}/visualize" target="_blank" class="icon" alt="Bearbeiten in DataWrapper"></a></div>`);
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
  },
  "coalitionCalculation": {
    "selector": ".q-coalition_calculation-container",
    "url": "https://qv2.st.nzz.ch/editor/coalition_calculation/%id%"
  },
  "customCode": {
    "url": "https://qv2.st.nzz.ch/editor/custom_code/%id%"
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
    parent.insertAdjacentHTML('afterbegin', `<div class="nzz_extension_edit"><a href="${url}" target="_blank" class="icon" alt="Bearbeten in Q"></a></div>`);
  })
}

const addCustomCodeWidget = () => {
  let items = "";
  const containers = document.querySelectorAll('.q-custom_code-container');
  const uniqueIds = new Set();
  containers.forEach((el) => {
    const id = el.getAttribute("data-q-item-id");
    if (!uniqueIds.has(id)) {
      uniqueIds.add(id);
      url = qItems['customCode'].url.replace("%id%", id);
      items += `<li><a href="${url}" target="_blank" alt="Bearbeten in Q">${id}</a></li>`;
    }
  });

  // Insert overlay
  if(containers.length > 0)
  {
    document.body.insertAdjacentHTML('afterbegin', `<div class="nzz_extension_customcode_overlay"><ul>${items}</ul></div>`);
  }

  // Add onHover Hook
  document.querySelectorAll('.nzz_extension_customcode_overlay a').forEach((link) => {

    // Add highlight
    link.addEventListener('mouseover', () => {
      document.querySelectorAll(`.q-custom_code-container[data-q-item-id="${link.textContent}"]`).forEach((container) => {
        container.classList.add("nzz_extension_customcode_highlight")
      });
    });

    // Remove highlight
    link.addEventListener('mouseout', () => {
      document.querySelectorAll(`.q-custom_code-container[data-q-item-id="${link.textContent}"]`).forEach((container) => {
        container.classList.remove("nzz_extension_customcode_highlight")
      });
    });    
  });
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
  addQ(qItems['coalitionCalculation']);

  addCustomCodeWidget();
}

/**
 * Main function when Extension is loaded
 */
setTimeout(() => {

  // Register event when site changes
  window.navigation.addEventListener("navigate", () => {

    // When location change, remove everything and add it again
    document.querySelectorAll('.nzz_extension_edit').forEach((el) => el.remove());
    document.querySelectorAll('.nzz_extension_customcode_overlay').forEach((el) => el.remove());

    setTimeout(init, 500);
  })

  // Init Exteion
  init();

}, 500)

