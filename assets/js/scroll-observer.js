document.addEventListener("DOMContentLoaded", () => {
  // 1. Identification: We look for the element with the specific ID you choose.
  // You can add id="header-trigger" to any element on any page to activate this behavior.
  const triggerElement = document.getElementById("header-trigger");
  const stateTarget = document.body;
  const activeClass = "is-scrolled-past-trigger";

  // Safety check: if the element isn't on this page, don't run the observer.
  if (!triggerElement || !stateTarget) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 2. Behavior: Trigger when the element is no longer intersecting AND has scrolled up (is above the viewport).
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          stateTarget.classList.add(activeClass);
        } else {
          // It's either still in view, or we've scrolled back to the very top above it.
          stateTarget.classList.remove(activeClass);
        }
      });
    },
    {
      root: null, // Use the viewport as the root
      threshold: 0, // Trigger as soon as even 1px of the element is out of view (effectively when it's fully gone with 0)
      rootMargin: "0px 0px 0px 0px" // Adjust the first value (e.g. "-80px") if you want it to trigger sooner, allowing for header height.
    }
  );

  observer.observe(triggerElement);
});
