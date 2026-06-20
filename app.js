function compileArchivePlatform() {
    // 1. Compile Prophets View
    const prophetsContainer = document.getElementById('prophets-injection-point');
    prophetsContainer.innerHTML = prophetsDatabase.map(p => `
        <div class="record-card">
            <div class="record-title">
                ${p.name}
                <div class="badge-container">
                    <span class="badge">Archival Verified</span>
                    <span class="badge gold">${p.titleBadge}</span>
                </div>
            </div>
            <div class="record-meta-callout">${p.metaCallout}</div>
            <div class="section-divider">Historical Narrative</div>
            <p class="record-narrative">${p.narrative}</p>
            <div class="section-divider">Chronological Milestones</div>
            <ul class="chronology-list">
                ${p.chronology.map(c => `<li class="chronology-step">${c}</li>`).join('')}
            </ul>
            <div class="insight-box">
                <div class="insight-box-title">Universal Ethical Wisdom</div>
                <ul>
                    ${p.lessons.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // 2. Compile Seerah View
    const seerahContainer = document.getElementById('seerah-injection-point');
    seerahContainer.innerHTML = seerahDatabase.map(s => `
        <div class="record-card">
            <div class="record-title">
                ${s.name}
                <div class="badge-container">
                    <span class="badge gold">${s.titleBadge}</span>
                </div>
            </div>
            <div class="record-meta-callout">${s.metaCallout}</div>
            <div class="section-divider">Historical Analysis</div>
            <p class="record-narrative">${s.narrative}</p>
            <div class="section-divider">Chronology & Infrastructure Events</div>
            <ul class="chronology-list">
                ${s.chronology.map(c => `<li class="chronology-step">${c}</li>`).join('')}
            </ul>
            <div class="insight-box">
                <div class="insight-box-title">Strategic System Takeaways</div>
                <ul>
                    ${s.lessons.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // 3. Compile Sahabah View
    const sahabahContainer = document.getElementById('sahabah-injection-point');
    sahabahContainer.innerHTML = sahabahDatabase.map(sa => `
        <div class="record-card">
            <div class="record-title">
                Hazrat ${sa.name}
                <div class="badge-container">
                    <span class="badge">Elite Companion</span>
                    <span class="badge gold">${sa.titleBadge}</span>
                </div>
            </div>
            <div class="record-meta-callout">${sa.metaCallout}</div>
            <div class="section-divider">Biographical Archive</div>
            <p class="record-narrative">${sa.narrative}</p>
            <div class="section-divider">Key Leadership Achievements</div>
            <ul class="chronology-list">
                ${sa.chronology.map(c => `<li class="chronology-step">${c}</li>`).join('')}
            </ul>
            <div class="insight-box">
                <div class="insight-box-title">Character Standard</div>
                <ul>
                    ${sa.lessons.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // 4. Compile Battles View
    const battlesContainer = document.getElementById('battles-injection-point');
    battlesContainer.innerHTML = battlesDatabase.map(b => `
        <div class="record-card">
            <div class="record-title">
                ${b.name}
                <div class="badge-container">
                    <span class="badge">Military Defense Record</span>
                    <span class="badge gold">${b.titleBadge}</span>
                </div>
            </div>
            <div class="record-meta-callout">${b.metaCallout}</div>
            <div class="section-divider">Tactical Engagement Record</div>
            <p class="record-narrative">${b.narrative}</p>
            <div class="section-divider">Battle Phase Timeline</div>
            <ul class="chronology-list">
                ${b.chronology.map(c => `<li class="chronology-step">${c}</li>`).join('')}
            </ul>
            <div class="insight-box">
                <div class="insight-box-title">Geopolitical & Tactical Takeaways</div>
                <ul>
                    ${b.lessons.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // 5. Compile Empires View
    const erasContainer = document.getElementById('eras-injection-point');
    erasContainer.innerHTML = empiresDatabase.map(e => `
        <div class="record-card">
            <div class="record-title">
                ${e.name}
                <div class="badge-container">
                    <span class="badge">Imperial Caliphate</span>
                    <span class="badge gold">${e.titleBadge}</span>
                </div>
            </div>
            <div class="record-meta-callout">${e.metaCallout}</div>
            <div class="section-divider">Socio-Economic & Historical Record</div>
            <p class="record-narrative">${e.narrative}</p>
            <div class="section-divider">Historical Timelines</div>
            <ul class="chronology-list">
                ${e.chronology.map(c => `<li class="chronology-step">${c}</li>`).join('')}
            </ul>
            <div class="section-divider">Golden Age Intellectual Polymaths</div>
            <div style="display:grid; grid-template-columns:1fr; gap:12px; margin-top:10px;">
                ${e.polymaths.map(po => `
                    <div style="background:rgba(17,94,89,0.02); border:1px solid var(--border-color); padding:14px; border-radius:8px;">
                        <strong style="color:var(--accent-gold);">${po.name}</strong>
                        <span style="font-size:0.8rem; background:var(--border-color); padding:2px 6px; border-radius:4px; margin-left:6px;">${po.field}</span>
                        <p style="font-size:0.9rem; margin-top:4px; color:var(--text-primary);">${po.contribution}</p>
                    </div>
                `).join('')}
            </div>
            <div class="insight-box">
                <div class="insight-box-title">Civilizational Growth Takeaways</div>
                <ul>
                    ${e.lessons.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // 6. Compile Opponents (Tyrants) View
    const opponentsContainer = document.getElementById('opponents-injection-point');
    opponentsContainer.innerHTML = tyrantsDatabase.map(t => `
        <div class="record-card adversary-card">
            <div class="record-title" style="color:var(--danger-text);">
                ${t.name}
                <div class="badge-container">
                    <span class="badge" style="background:var(--danger-bg); color:var(--danger-text); border-color:var(--danger-border);">${t.titleBadge}</span>
                </div>
            </div>
            <div class="record-meta-callout" style="border-left-color:var(--danger-text); color:var(--danger-text);">${t.metaCallout}</div>
            <div class="section-divider" style="color:var(--danger-text);">Historical Narrative</div>
            <p class="record-narrative">${t.narrative}</p>
            <div class="section-divider" style="color:var(--danger-text);">Collapse Milestones</div>
            <ul class="chronology-list">
                ${t.chronology.map(c => `<li class="chronology-step">${c}</li>`).join('')}
            </ul>
            <div class="verdict-container">
                <strong>ARCHIVAL ETHICAL VERDICT:</strong> ${t.verdict}
            </div>
        </div>
    `).join('');
}

function compileGeometricStarfield() {
    const canvasContainer = document.getElementById('starfield-canvas-container');
    if (!canvasContainer) return;
    canvasContainer.innerHTML = '';

    for (let idx = 0; idx < 45; idx++) {
        const starElement = document.createElement('div');
        const horizontalRandom = Math.floor(Math.random() * 100);
        const verticalRandom = Math.floor(Math.random() * 100);
        const scaleRandom = (Math.random() * 3 + 1).toFixed(1);

        starElement.style.position = 'absolute';
        starElement.style.left = `${horizontalRandom}%`;
        starElement.style.top = `${verticalRandom}%`;
        starElement.style.width = `${scaleRandom}px`;
        starElement.style.height = `${scaleRandom}px`;
        starElement.style.backgroundColor = 'rgba(255,255,255,0.7)';
        starElement.style.borderRadius = '50%';
        starElement.style.pointerEvents = 'none';

        canvasContainer.appendChild(starElement);
    }
}

// Bootstrap on page load
window.addEventListener('DOMContentLoaded', () => {
    const systemThemeCache = localStorage.getItem('dh-selected-theme');
    if (systemThemeCache === 'dark' || (!systemThemeCache && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    compileArchivePlatform();
    compileGeometricStarfield();
    runLoadingScreenEngine();
});
