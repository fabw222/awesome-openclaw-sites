const state = {
  items: [],
  query: '',
  category: 'all',
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

async function init() {
  const res = await fetch('data/sites.json');
  state.items = await res.json();
  state.items.sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));

  $('#totalCount').textContent = `${state.items.length} sites`;
  buildCategoryFilters();
  bindEvents();
  render();
}

function buildCategoryFilters() {
  const container = $('#categoryFilters');
  const categories = [...new Set(state.items.map((s) => s.category))].sort();

  container.innerHTML = '';
  const allBtn = createChip('All', 'all', true);
  container.appendChild(allBtn);

  for (const cat of categories) {
    container.appendChild(createChip(cat, cat, false));
  }
}

function createChip(label, value, active) {
  const btn = document.createElement('button');
  btn.className = 'chip';
  btn.textContent = label;
  btn.dataset.value = value;
  btn.setAttribute('aria-pressed', active);
  return btn;
}

function bindEvents() {
  $('#searchInput').addEventListener('input', (e) => {
    state.query = e.target.value.trim().toLowerCase();
    render();
  });

  $('#clearBtn').addEventListener('click', () => {
    state.query = '';
    state.category = 'all';
    $('#searchInput').value = '';
    updateChips($('#categoryFilters'), 'all');
    render();
  });

  $('#categoryFilters').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.category = chip.dataset.value;
    updateChips($('#categoryFilters'), state.category);
    render();
  });
}

function updateChips(container, active) {
  for (const chip of container.querySelectorAll('.chip')) {
    chip.setAttribute('aria-pressed', chip.dataset.value === active);
  }
}

function filter() {
  return state.items.filter((item) => {
    if (state.category !== 'all' && item.category !== state.category) return false;

    if (state.query) {
      const q = state.query;
      const searchable = [
        item.title,
        item.description,
        item.category,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });
}

function render() {
  const filtered = filter();
  const grid = $('#grid');
  const empty = $('#emptyState');
  const info = $('#resultsInfo');
  const tmpl = $('#cardTemplate');

  const total = state.items.length;
  if (filtered.length === total) {
    info.textContent = `Showing all ${total} sites`;
  } else {
    info.textContent = `Showing ${filtered.length} of ${total} sites`;
  }

  grid.innerHTML = '';
  empty.hidden = filtered.length > 0;

  const frag = document.createDocumentFragment();
  for (const item of filtered) {
    const clone = tmpl.content.cloneNode(true);
    const card = clone.querySelector('.card');

    card.querySelector('.category-badge').textContent = item.category;
    card.querySelector('.card-title').textContent = item.title;
    card.querySelector('.card-desc').textContent = item.description;

    const tagsEl = card.querySelector('.card-tags');
    for (const tag of item.tags) {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = `#${tag}`;
      tagsEl.appendChild(span);
    }

    const date = new Date(item.submitted_at);
    card.querySelector('.card-date').textContent = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    card.querySelector('.card-date').setAttribute('datetime', item.submitted_at);

    const link = card.querySelector('.card-link');
    link.href = item.url;

    frag.appendChild(clone);
  }
  grid.appendChild(frag);
}

init();
