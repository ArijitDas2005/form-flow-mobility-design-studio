(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = $('#toast');
  let toastTimer;
  const notify = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  };

  const views = ['studio', 'brief', 'insights', 'playbook'];
  const openView = (name) => {
    if (!views.includes(name)) return;
    $$('.view').forEach((view) => view.classList.toggle('active-view', view.id === `view-${name}`));
    $$('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === name));
    if (name === 'brief') $('#brief-challenge').value = localStorage.getItem('formflow-brief') || $('#brief-challenge').value;
  };

  $$('.nav-item,[data-view]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.view)));
  $$('.project-link').forEach((button) => button.addEventListener('click', () => {
    $$('.project-link').forEach((item) => item.classList.toggle('selected', item === button));
    const name = button.dataset.project;
    $('#crumb-project').textContent = name;
    $('#project-title').innerHTML = name.startsWith('AERA') ? 'A more human <em>way</em> to move.' : name.startsWith('Kite') ? 'A little more <em>city</em> in every ride.' : 'Material stories for <em>everyday</em> motion.';
    notify(`Opened ${name}`);
  }));

  $('#new-project').addEventListener('click', () => {
    const name = `New design study ${String($$('.project-link').length + 1).padStart(2, '0')}`;
    const button = document.createElement('button');
    button.className = 'project-link'; button.dataset.project = name;
    button.innerHTML = '<i class="project-bullet"></i><span></span><small>Now</small>';
    $('span', button).textContent = name;
    $('.sidebar-projects').append(button);
    button.addEventListener('click', () => {
      $$('.project-link').forEach((item) => item.classList.toggle('selected', item === button));
      $('#crumb-project').textContent = name; $('#project-title').textContent = 'A new design study.'; notify(`Opened ${name}`);
    });
    button.click();
  });

  const stageViews = {
    discover: ['01 — DISCOVER', 'The signal behind the brief'],
    explore: ['02 — EXPLORE', 'Concept directions'],
    refine: ['03 — REFINE', 'Details make the difference'],
    deliver: ['04 — DELIVER', 'Ready for the next team']
  };
  $$('.stage').forEach((button, index) => button.addEventListener('click', () => {
    $$('.stage').forEach((stage, i) => { stage.classList.toggle('active', stage === button); stage.classList.toggle('done', i < index); });
    const [kicker, title] = stageViews[button.dataset.stage];
    $('.work-column > .section-top .section-kicker').textContent = kicker;
    $('.work-column > .section-top h2').textContent = title;
    notify(`${button.querySelector('strong').textContent} stage selected`);
  }));

  $$('.concept-card').forEach((card) => card.addEventListener('click', (event) => {
    if (event.target.closest('.bookmark-button')) return;
    $$('.concept-card').forEach((item) => item.classList.toggle('selected-concept', item === card));
    notify(`Direction ${card.dataset.concept} selected`);
  }));
  $$('.bookmark-button').forEach((button) => button.addEventListener('click', () => {
    button.classList.toggle('saved'); button.textContent = button.classList.contains('saved') ? '♥' : '♡';
    notify(button.classList.contains('saved') ? 'Direction saved to your collection' : 'Direction removed from your collection');
  }));

  const modal = $('#modal');
  const showModal = (title, html) => {
    $('#modal-title').textContent = title;
    $('#modal-content').innerHTML = html;
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); $('#modal-close').focus();
  };
  const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-done').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

  $('#apply-suggestion').addEventListener('click', () => showModal('A signal to explore', '<p><strong>Working hypothesis</strong><br>First-time riders may need a calmer, more glanceable way to understand remaining range.</p><ul><li>Talk with 3–5 riders about range confidence.</li><li>Review the current dashboard hierarchy with UI/UX.</li><li>Sketch two range-display treatments and compare in context.</li></ul><p>Keep this as a question until research supports it.</p>'));
  $('#edit-brief').addEventListener('click', () => openView('brief'));
  $('#brief-save').addEventListener('click', () => {
    localStorage.setItem('formflow-brief', $('#brief-challenge').value);
    $('.brief-copy > p').textContent = $('#brief-challenge').value;
    $('#save-label').textContent = 'Saved just now'; notify('Brief saved in this browser');
  });
  $('#share-button').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); notify('Workspace link copied'); }
    catch { showModal('Share this workspace', '<p>Copy this local address from your browser to share the prototype: <strong>' + location.href.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) + '</strong></p>'); }
  });
  $('#export-button').addEventListener('click', () => {
    const payload = { project: $('#crumb-project').textContent, brief: $('#brief-challenge').value, principles: ['Confidence first', 'Quiet utility', 'Warm precision'], concepts: $$('.concept-card').map((card) => ({ number: card.dataset.concept, title: $('.concept-title h3', card).textContent })), note: 'Portfolio prototype. Illustrative concepts and synthetic process data; no external AI service is connected.' };
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })); link.download = 'form-flow-concept.json'; link.click(); URL.revokeObjectURL(link.href); notify('Concept summary exported');
  });
  $('#open-ux').addEventListener('click', () => showModal('Ride, at a glance', '<p><strong>UI/UX exploration · range confidence</strong></p><ul><li>Primary: remaining range, given high visual priority.</li><li>Secondary: next destination and estimated arrival.</li><li>Keep the screen calm; test legibility in a real riding context.</li></ul><p>This small dashboard preview is a discussion prompt, not a validated interface.</p>'));

  const localResponse = (prompt) => {
    const lower = prompt.toLowerCase();
    if (lower.includes('risk') || lower.includes('question')) return ['Keep rider confidence as a hypothesis until you hear from riders.', 'Check whether the dashboard preview is legible across riding conditions.', 'Ask engineering which storage and range constraints shape the form.', 'Separate visual preference from usability evidence during review.'];
    if (lower.includes('checklist') || lower.includes('handoff')) return ['Confirm the chosen direction and its open questions.', 'Attach CMF intent, reference imagery and material assumptions.', 'Record interface states and interaction priority with UI/UX.', 'Invite engineering to review packaging and feasibility constraints.', 'Name the owner for each unresolved decision.'];
    if (lower.includes('theme') || lower.includes('visual')) return ['Quiet confidence — soft geometry, warm neutrals, precise details.', 'Playful utility — adaptable storage and a confident colour accent.', 'Flow state — reduced visual noise and a clear information hierarchy.', 'Use these as prompts for a designer-led sketch and critique session.'];
    return ['Start with the rider and the moment of friction.', 'Keep suggestions editable and easy to dismiss.', 'Make the next experiment small enough to review together.', 'What decision should the team feel more confident making?'];
  };
  const sendPrompt = (prompt) => {
    const escaped = prompt.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const points = localResponse(prompt).map((item) => `<li>${item}</li>`).join('');
    showModal('A starting point', `<p><strong>Your prompt:</strong> “${escaped}”</p><ul>${points}</ul><p>Local demo only. Review, change or discard every suggestion; no AI service is connected.</p>`);
  };
  $('#send-prompt').addEventListener('click', () => { const input = $('#assistant-input'); if (input.value.trim()) sendPrompt(input.value.trim()); else input.focus(); });
  $('#assistant-input').addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); $('#send-prompt').click(); } });
  $$('.quick-action').forEach((button) => button.addEventListener('click', () => sendPrompt(button.dataset.prompt)));
  $('#generate-button').addEventListener('click', () => {
    const count = $$('.concept-card').length + 1;
    const source = $('.concept-card'); const clone = source.cloneNode(true);
    clone.dataset.concept = String(count).padStart(2, '0'); clone.classList.remove('selected-concept');
    $('.image-index', clone).textContent = `${String(count).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
    $('.image-label', clone).textContent = 'NEW DIRECTION'; $('.concept-title h3', clone).textContent = 'Open exploration'; $('.concept-title p', clone).textContent = 'A prompt for the next sketch.';
    $('.concept-tags span:last-child', clone).textContent = `${String(count).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
    clone.addEventListener('click', (event) => { if (event.target.closest('.bookmark-button')) return; $$('.concept-card').forEach((card) => card.classList.toggle('selected-concept', card === clone)); notify('New exploration selected'); });
    $('.bookmark-button', clone).addEventListener('click', (event) => { event.stopPropagation(); const button = event.currentTarget; button.classList.toggle('saved'); button.textContent = button.classList.contains('saved') ? '♥' : '♡'; });
    $('#concept-grid').append(clone);
    notify('Sketch prompt added. Use it to start a designer-led exploration.');
  });
  $('#filter-button').addEventListener('click', () => {
    const cards = $$('.concept-card'); const onlySelected = $('#filter-button').dataset.filter !== 'selected';
    $('#filter-button').dataset.filter = onlySelected ? 'selected' : 'all';
    $('#filter-button').innerHTML = onlySelected ? 'Selected direction <span>⌄</span>' : 'All directions <span>⌄</span>';
    cards.forEach((card) => card.style.display = !onlySelected || card.classList.contains('selected-concept') ? '' : 'none');
  });
})();

