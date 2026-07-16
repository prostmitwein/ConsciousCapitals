// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Intersection Observer for scroll-driven reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements with the .reveal class
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));

  // Interactive Sourcing Map / Ledger logic
  const sourceNodes = document.querySelectorAll('.source-node');
  const detailsPanelTitle = document.getElementById('details-title');
  const detailsPanelContent = document.getElementById('details-content');
  const detailsPanelMetrics = document.getElementById('details-metrics');

  const sourceData = {
    'ashwagandha': {
      title: 'Ashwagandha (Karnataka)',
      content: 'Certified Organic Roots. NABL Laboratory Purity Certificate #IN-48291.',
      metrics: '+15% Fair-Price Premium paid directly to cooperative.'
    },
    'whey': {
      title: 'Whey (Local Farms)',
      content: 'Grass-fed, zero-hormone whey isolate. Audited supply chain.',
      metrics: '+12% Local Sourcing Premium.'
    }
  };

  sourceNodes.forEach(node => {
    node.addEventListener('click', () => {
      // Remove active state from all
      sourceNodes.forEach(n => n.classList.remove('ring-4', 'ring-sage', 'ring-opacity-50'));
      // Add active state to clicked
      node.classList.add('ring-4', 'ring-sage', 'ring-opacity-50');

      const id = node.dataset.id;
      if (sourceData[id] && detailsPanelTitle && detailsPanelContent && detailsPanelMetrics) {
        detailsPanelTitle.textContent = sourceData[id].title;
        detailsPanelContent.textContent = sourceData[id].content;
        detailsPanelMetrics.textContent = sourceData[id].metrics;
        
        // Brief pulse effect on the details panel
        const panel = document.getElementById('details-panel');
        if (panel) {
          panel.classList.remove('active'); // reset transition
          void panel.offsetWidth; // trigger reflow
          panel.classList.add('active');
        }
      }
    });
  });
});
