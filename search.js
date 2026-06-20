function handleSearchEngineInput(query) {
    const autocompletePanel = document.getElementById('search-autocomplete-panel');
    if (!query.trim()) {
        autocompletePanel.style.display = 'none';
        return;
    }

    const searchTokens = query.toLowerCase().split(/\s+/);
    let matches = [];

    function scanDataset(array, categoryName, panelTarget) {
        array.forEach(item => {
            const matchedName = searchTokens.every(t => item.name.toLowerCase().includes(t));
            const matchedNarrative = searchTokens.every(t => item.narrative.toLowerCase().includes(t));
            if (matchedName || matchedNarrative) {
                matches.push({
                    name: item.name,
                    category: categoryName,
                    targetPanel: panelTarget,
                    rawObject: item
                });
            }
        });
    }

    scanDataset(prophetsDatabase, "Prophet", "panel-prophets");
    scanDataset(seerahDatabase, "Seerah Phase", "panel-seerah");
    scanDataset(sahabahDatabase, "Companion", "panel-sahabah");
    scanDataset(battlesDatabase, "Battle", "panel-battles");
    scanDataset(empiresDatabase, "Empire", "panel-eras");
    scanDataset(tyrantsDatabase, "Tyrant / Broken Empire", "panel-opponents");

    if (matches.length === 0) {
        autocompletePanel.innerHTML = `<div class="autocomplete-item" style="cursor:default; color:var(--text-secondary);">No historical records discoverable</div>`;
    } else {
        autocompletePanel.innerHTML = `
            <div class="autocomplete-group-label">Matching Discoveries (${matches.length})</div>
            ${matches.slice(0, 6).map(m => `
                <div class="autocomplete-item" onmousedown="executeSearchDiscovery('${m.name.replace(/'/g, "\\'")}')">
                    <span>${m.name.substring(0, 45)}</span>
                    <span class="item-type">${m.category}</span>
                </div>
            `).join('')}
            <div class="autocomplete-item" onmousedown="triggerFullSearchExecution('${query.replace(/'/g, "\\'")}')}" style="background:rgba(17,94,89,0.03); font-weight:bold; justify-content:center; color:var(--accent-primary);">
                Execute Full Analytical Search
            </div>
        `;
    }
    autocompletePanel.style.display = 'block';
}

function executeSearchDiscovery(itemName) {
    let itemData = null;
    let isTyrant = false;

    itemData = prophetsDatabase.find(p => p.name === itemName) ||
               seerahDatabase.find(s => s.name === itemName) ||
               sahabahDatabase.find(sa => sa.name === itemName) ||
               battlesDatabase.find(b => b.name === itemName) ||
               empiresDatabase.find(e => e.name === itemName);

    if (!itemData) {
        itemData = tyrantsDatabase.find(t => t.name === itemName);
        if (itemData) isTyrant = true;
    }

    if (!itemData) return;

    const injectionPoint = document.getElementById('search-results-injection-point');
    document.getElementById('search-results-count').innerText = `1 specific match isolated`;

    if (!isTyrant) {
        injectionPoint.innerHTML = `
            <div class="record-card">
                <div class="record-title">
                    ${itemData.name}
                    <div class="badge-container">
                        <span class="badge gold">${itemData.titleBadge || 'Historical Record'}</span>
                    </div>
                </div>
                <div class="record-meta-callout">${itemData.metaCallout}</div>
                <div class="section-divider">Isolated Narrative Content</div>
                <p class="record-narrative">${itemData.narrative}</p>
                ${itemData.chronology ? `
                    <div class="section-divider">Chronological Tracking</div>
                    <ul class="chronology-list">${itemData.chronology.map(c => `<li class="chronology-step">${c}</li>`).join('')}</ul>
                ` : ''}
            </div>
        `;
    } else {
        injectionPoint.innerHTML = `
            <div class="record-card adversary-card">
                <div class="record-title" style="color:var(--danger-text);">
                    ${itemData.name}
                    <div class="badge-container">
                        <span class="badge" style="background:var(--danger-bg); color:var(--danger-text); border-color:var(--danger-border);">${itemData.titleBadge}</span>
                    </div>
                </div>
                <div class="record-meta-callout" style="border-left-color:var(--danger-text); color:var(--danger-text);">${itemData.metaCallout}</div>
                <div class="section-divider" style="color:var(--danger-text);">Historical Documented Overthrow</div>
                <p class="record-narrative">${itemData.narrative}</p>
                <div class="verdict-container"><strong>ETHICAL VERDICT:</strong> ${itemData.verdict}</div>
            </div>
        `;
    }

    switchArchiveTab('panel-search-results', null);
}

function triggerFullSearchExecution(query) {
    const searchTokens = query.toLowerCase().split(/\s+/);
    let unifiedResults = [];

    function collectMatches(database, isAdversary) {
        database.forEach(item => {
            if (searchTokens.some(t => item.name.toLowerCase().includes(t) || item.narrative.toLowerCase().includes(t))) {
                unifiedResults.push({ data: item, adversary: isAdversary });
            }
        });
    }

    collectMatches(prophetsDatabase, false);
    collectMatches(seerahDatabase, false);
    collectMatches(sahabahDatabase, false);
    collectMatches(battlesDatabase, false);
    collectMatches(empiresDatabase, false);
    collectMatches(tyrantsDatabase, true);

    document.getElementById('search-results-count').innerText = `${unifiedResults.length} archival items cataloged for "${query}"`;
    const injectionPoint = document.getElementById('search-results-injection-point');

    if (unifiedResults.length === 0) {
        injectionPoint.innerHTML = `<div class="record-card"><p class="record-narrative">Zero absolute matches discoverable within system memory blocks.</p></div>`;
    } else {
        injectionPoint.innerHTML = unifiedResults.map(res => {
            const item = res.data;
            if (!res.adversary) {
                return `
                    <div class="record-card" style="margin-bottom:20px;">
                        <div class="record-title">${item.name} <span class="badge gold">${item.titleBadge || 'System Record'}</span></div>
                        <div class="record-meta-callout">${item.metaCallout}</div>
                        <p class="record-narrative">${item.narrative.substring(0, 300)}...</p>
                        <button class="btn-action" style="margin-top:10px; width:max-content;" onclick="executeSearchDiscovery('${item.name.replace(/'/g, "\\'")}')">Expand Complete Content File</button>
                    </div>
                `;
            } else {
                return `
                    <div class="record-card adversary-card" style="margin-bottom:20px;">
                        <div class="record-title" style="color:var(--danger-text);">${item.name} <span class="badge" style="background:var(--danger-bg); color:var(--danger-text);">${item.titleBadge}</span></div>
                        <div class="record-meta-callout" style="border-left-color:var(--danger-text); color:var(--danger-text);">${item.metaCallout}</div>
                        <p class="record-narrative">${item.narrative.substring(0, 300)}...</p>
                        <button class="btn-action" style="margin-top:10px; width:max-content; border-color:var(--danger-border); color:var(--danger-text);" onclick="executeSearchDiscovery('${item.name.replace(/'/g, "\\'")}')">Expand Overthrow File</button>
                    </div>
                `;
            }
        }).join('');
    }

    switchArchiveTab('panel-search-results', null);
}

function clearSearchAndReturn() {
    document.getElementById('global-search-bar').value = '';
    switchArchiveTab('panel-landing', document.getElementById('nav-landing'));
}

function showAutocompletePanel() {
    const val = document.getElementById('global-search-bar').value;
    if (val.trim()) document.getElementById('search-autocomplete-panel').style.display = 'block';
}

function hideAutocompletePanelDelayed() {
    setTimeout(() => {
        document.getElementById('search-autocomplete-panel').style.display = 'none';
    }, 250);
}
