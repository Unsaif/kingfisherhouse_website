const variantDetails = {
  vinegar: {
    title: 'Coastal Hedge Vinegar',
    note: 'Wild Hawthorn, sea buckthorn, charred lemon leaf, and Atlantic salt for layered acidity.',
    finish: 'Spruce resin and pink pepper',
    pairing: 'Raw oyster, roasted beet, smoked fish'
  },
  shrub: {
    title: 'Midnight Hedge Shrub',
    note: 'Hedgerow berry, burnt honey, and spruce tip bitters for spritz or zero-proof service.',
    finish: 'Velvet fizz with spruce sap',
    pairing: 'Stone fruit highball, Collins, or spritz builds'
  },
  collab: {
    title: 'Residency Barrel',
    note: 'Custom ferments with chefs exploring meadowsweet, elderflower pollen, or sea purslane.',
    finish: 'Tailored to chef brief',
    pairing: 'Menu-specific application notes'
  }
};

const feature = {
  title: document.querySelector('[data-variant-title]'),
  note: document.querySelector('[data-variant-note]'),
  finish: document.querySelector('[data-variant-finish]'),
  pairing: document.querySelector('[data-variant-pairing]')
};

function updateFeature(key) {
  const next = variantDetails[key];
  if (!next || !feature.title) return;
  feature.title.textContent = next.title;
  feature.note.textContent = next.note;
  feature.finish.textContent = next.finish;
  feature.pairing.textContent = next.pairing;
}

let activeVariant = 'vinegar';
updateFeature(activeVariant);

document.querySelectorAll('[data-variant]').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    activeVariant = card.dataset.variant;
    updateFeature(activeVariant);
  });
  card.addEventListener('focusin', () => {
    activeVariant = card.dataset.variant;
    updateFeature(activeVariant);
  });
});

function handleCommerceClick(event) {
  const btn = event.currentTarget;
  const product = btn.closest('[data-product]')?.dataset.product || btn.dataset.product || 'vinegar';
  const platform = btn.dataset.platform || 'custom';
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = `Ready to connect ${product} with ${platform}.`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => toast.classList.remove('show'), 2100);
  setTimeout(() => toast.remove(), 2500);
}

document.querySelectorAll('[data-platform]').forEach((btn) => {
  btn.addEventListener('click', handleCommerceClick);
});

const notifyForm = document.querySelector('.notify-form');
if (notifyForm) {
  notifyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formStatus = notifyForm.querySelector('.form-status');
    const formData = new FormData(notifyForm);
    const email = formData.get('email');
    const role = formData.get('role');
    formStatus.textContent = `Added ${email} as ${role}. Hook this endpoint up to Klaviyo, Mailchimp, or your CRM when ready.`;
    notifyForm.reset();
  });
}
