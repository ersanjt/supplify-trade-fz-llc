document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll effect
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile menu toggle
  function openMenu() {
    navMenu.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('show');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', openMenu);
  navClose.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Active nav link on scroll
  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // RFQ / contact form handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      const attachmentInput = contactForm.querySelector('#attachment');
      const attachmentName = attachmentInput && attachmentInput.files && attachmentInput.files[0]
        ? attachmentInput.files[0].name
        : 'None selected';

      const subject = encodeURIComponent(`[Supplify Trade RFQ] ${data.subject || 'Inquiry'} — ${data.product || data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || 'N/A'}\n` +
        `Company: ${data.company || 'N/A'}\n` +
        `Inquiry Type: ${data.subject}\n\n` +
        `Product: ${data.product}\n` +
        `Quantity: ${data.quantity}\n` +
        `Specifications:\n${data.specifications}\n\n` +
        `Destination Country / Port: ${data.destination}\n` +
        `Preferred Incoterm: ${data.incoterm || 'To advise'}\n` +
        `Specification File: ${attachmentName}\n\n` +
        `Additional Notes:\n${data.message || 'N/A'}\n\n` +
        `Note: If a specification file was selected, please attach "${attachmentName}" to this email before sending.`
      );

      window.location.href = `mailto:info@supplifytrade.com?subject=${subject}&body=${body}`;

      contactForm.reset();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      btn.textContent = 'Opening email client...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      }, 3000);
    });
  }
});
