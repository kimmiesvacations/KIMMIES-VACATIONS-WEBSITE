const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const audio = document.getElementById('caribbeanAudio');
const musicButton = document.getElementById('musicButton');
const musicNote = document.getElementById('musicNote');

musicButton?.addEventListener('click', async () => {
  if (!audio.querySelector('source')?.getAttribute('src')) return;
  try {
    if (audio.paused) {
      await audio.play();
      musicButton.textContent = '❚❚ Pause Tropical Music';
      musicButton.setAttribute('aria-pressed', 'true');
      musicNote.textContent = 'Music playing';
    } else {
      audio.pause();
      musicButton.textContent = '♫ Play Tropical Music';
      musicButton.setAttribute('aria-pressed', 'false');
      musicNote.textContent = 'Music paused';
    }
  } catch {
    musicNote.textContent = 'The music file is not available yet.';
  }
});

const form = document.getElementById('quoteForm');
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.getElementById('formMessage');
  const submitButton = form.querySelector('button[type="submit"]');
  if (!status || !submitButton) return;

  status.textContent = 'Sending your quote request…';
  submitButton.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      form.reset();
      status.textContent = "Thank you! Your vacation quote request has been sent. We'll be in touch soon.";
    } else {
      status.textContent = 'Your request could not be sent. Please try again in a moment.';
    }
  } catch {
    status.textContent = 'Unable to send your request. Please check your connection and try again.';
  } finally {
    submitButton.disabled = false;
  }
});

const printApplicationButton = document.getElementById('printApplication');
printApplicationButton?.addEventListener('click', () => {
  window.print();
});

const applicationForm = document.getElementById('travelApplication');
if (applicationForm) {
  const submitApplication = document.getElementById('submitApplication');
  const securityMessage = document.getElementById('applicationSecurityMessage');
  const applicationStatus = document.getElementById('applicationFormMessage');
  const applicationIsSecure = window.location.protocol === 'https:';

  if (applicationIsSecure && submitApplication) {
    submitApplication.disabled = false;
    if (securityMessage) securityMessage.hidden = true;
  }

  applicationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!applicationIsSecure || !submitApplication || !applicationStatus) {
      if (applicationStatus) applicationStatus.textContent = 'Please return when the website is secured with HTTPS before submitting personal information.';
      return;
    }

    applicationStatus.textContent = 'Sending your travel application…';
    submitApplication.disabled = true;

    try {
      const response = await fetch(applicationForm.action, {
        method: 'POST',
        body: new FormData(applicationForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        applicationForm.reset();
        applicationStatus.textContent = "Thank you! Your travel application was submitted successfully to Kimmie's Vacations. We'll be in touch soon.";
      } else {
        applicationStatus.textContent = 'Your application could not be sent. Please try again, or contact Kimmie’s Vacations.';
      }
    } catch {
      applicationStatus.textContent = 'Unable to send your application. Please check your connection and try again.';
    } finally {
      submitApplication.disabled = false;
    }
  });
}


// Customer reviews and credit-card authorization requests use separate forms.
// Only contact/booking information is sent; no payment-card data is collected.
function attachGuestForm(formId, statusId, messages) {
  const guestForm = document.getElementById(formId);
  if (!guestForm) return;
  guestForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = document.getElementById(statusId);
    const button = guestForm.querySelector('button[type="submit"]');
    if (!status || !button) return;
    status.textContent = messages.sending;
    button.disabled = true;
    try {
      const response = await fetch(guestForm.action, {
        method: 'POST',
        body: new FormData(guestForm),
        headers: { Accept: 'application/json' }
      });
      if (response.ok) {
        guestForm.reset();
        status.textContent = messages.success;
      } else {
        status.textContent = messages.failure;
      }
    } catch {
      status.textContent = messages.failure;
    } finally {
      button.disabled = false;
    }
  });
}
attachGuestForm('reviewForm', 'reviewFormMessage', {
  sending: 'Sending your review…',
  success: 'Thank you! Your review was sent to Kimmie\'s Vacations for review. It will not be published automatically.',
  failure: 'Your review could not be sent right now. Please try again in a moment.'
});
attachGuestForm('authorizationRequestForm', 'authorizationFormMessage', {
  sending: 'Sending your request…',
  success: 'Thank you! Your authorization form request was sent. Kimmie\'s Vacations will follow up with secure instructions.',
  failure: 'Your request could not be sent right now. Please try again in a moment.'
});
