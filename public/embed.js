(function () {
  const script = document.currentScript;
  const wishlistId = script.getAttribute("data-wishlist-id");
  const baseUrl =
    script.getAttribute("data-base-url") || "https://theposter.xyz"; // Fallback URL

  const container = document.createElement("div");
  container.id = "wishlist-container";
  container.style.width = "100%";
  container.style.minHeight = "400px"; // Adjust as needed
  container.style.height = "400px";

  const iframe = document.createElement("iframe");
  iframe.src = `${baseUrl}/w/${wishlistId}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";

  container.appendChild(iframe);
  script.parentNode.insertBefore(container, script);

  // Optional: Adjust iframe height based on content
  window.addEventListener(
    "message",
    function (event) {
      if (event.origin !== baseUrl) return;
      if (event.data.type === "setHeight") {
        iframe.style.height = `${event.data.height}px`;
      }
    },
    false
  );
})();
