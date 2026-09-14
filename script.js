// Form handler for Custom Pest Control Scottsboro
// Posts form data to https://custompestscottsboro.com/submit (routed to custompest-form Worker)

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var status = document.getElementById('status');
    var btn = document.getElementById('submitBtn');

    // Honeypot check — if filled, it's a bot. Pretend success silently.
    var honeypot = document.getElementById('website').value;
    if (honeypot) {
      window.location.href = '/thanks.html';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'status';

    // Collect form data
    var formData = new FormData(form);

    fetch('https://custompestscottsboro.com/submit', {
      method: 'POST',
      body: formData
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Server returned ' + response.status);
        }
      })
      .then(function (data) {
        if (data && data.success) {
          window.location.href = '/thanks.html';
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(function (err) {
        btn.disabled = false;
        btn.textContent = 'Send request';
        status.textContent = 'Sorry, something went wrong. Please call us instead.';
        status.className = 'status error';
        console.error('Form submission error:', err);
      });
  });
});
