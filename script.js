// Email signup — currently a front-end demo.
// When you're ready to collect real signups, point this at a provider
// (Mailchimp, Klaviyo, Buttondown, or a simple form service like Formspree).
const notifyForm = document.querySelector('.notify-form');

if (notifyForm) {
  notifyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formStatus = notifyForm.querySelector('.form-status');
    const email = new FormData(notifyForm).get('email');
    formStatus.textContent = `Thanks — we'll be in touch at ${email} when the first bottles are ready.`;
    notifyForm.reset();
  });
}
