// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = document.querySelector(".menu-icon");
const exitIcon = document.querySelector(".exit-icon");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("translate-x-full");
  mobileMenu.classList.toggle("translate-x-0");

  if (exitIcon.classList.contains("hidden")) {
    exitIcon.classList.remove("hidden");
    exitIcon.classList.add("block");

    menuIcon.classList.add("hidden");
    menuIcon.classList.remove("block");
  } else {
    exitIcon.classList.add("hidden");
    exitIcon.classList.remove("block");

    menuIcon.classList.remove("hidden");
    menuIcon.classList.add("block");
  }
});

// Form Modal
const registerBtns = document.querySelectorAll(".register-btn");
const loginModal = document.querySelector(".login-modal");
const loginExitBtn = document.querySelector(".login-exit__btn");
const modalContainer = document.querySelector(".modal-container");
const body = document.body; // body elementini tanlaymiz

// Register button clicks to show the modal
registerBtns.forEach((button) => {
  button.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
    loginModal.classList.add("flex");
    modalContainer.classList.remove("translate-y-[120%]");
    modalContainer.classList.add("translate-y-0");
    body.classList.add("overflow-hidden"); // body'ga overflow-hidden qo'shildi
  });
});

// Exit button clicks to hide the modal
loginExitBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
  loginModal.classList.remove("flex");
  modalContainer.classList.add("translate-y-[120%]");
  modalContainer.classList.remove("translate-y-0");
  body.classList.remove("overflow-hidden"); // body'dan overflow-hidden olib tashlandi
});

// Clicking outside the modal container resets everything
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    loginModal.classList.add("hidden");
    loginModal.classList.remove("flex");
    modalContainer.classList.add("translate-y-[120%]");
    modalContainer.classList.remove("translate-y-0");
    body.classList.remove("overflow-hidden"); // body'dan overflow-hidden olib tashlandi
  }
});

// Active Link Func
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    let fromTop = window.scrollY + 100;
    let activeFound = false;

    navLinks.forEach((link) => {
      let section = document.querySelector(link.getAttribute("href"));
      let underline = link.querySelector(".one");

      if (!section) return;

      let isActive =
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop;

      if (isActive) {
        activeFound = true;
      }

      link.classList.toggle("text-active-menu", isActive);
      if (underline) {
        underline.classList.toggle("opacity-100", isActive);
      }
    });

    // On initial load, if no section is in view, activate the first link
    if (!activeFound && window.scrollY === 0) {
      const firstLink = navLinks[0];
      firstLink.classList.add("text-active-menu");
      firstLink.querySelector(".one").classList.add("opacity-100");
    }
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // Run once on page load
});

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn-media");
  const tabContents = document.querySelectorAll(".tab-content-media");

  if (!tabButtons.length || !tabContents.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabType = this.getAttribute("data-tab-media");

      // Update active tab button
      tabButtons.forEach((btn) => btn.classList.remove("active-media-tab"));
      this.classList.add("active-media-tab");

      // Show relevant tab content
      tabContents.forEach((content) => {
        content.classList.toggle(
          "hidden",
          content.getAttribute("data-content-media") !== tabType
        );
      });
    });
  });
});

// Classes Tabs
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");
  const videoElement = document.querySelector(".tab-video"); // Common video element

  // Ensure the first tab's content is visible and animated properly
  const firstTab = document.querySelector(".tab-button[data-tab='tab1']");
  const firstContent = document.getElementById("tab1");

  if (firstTab) {
    firstTab.classList.add("bg-brand-black", "text-white", "active");
  }
  if (firstContent) {
    firstContent.classList.remove("hidden");

    firstContent
      .querySelector(".info-section")
      ?.classList.remove("opacity-0", "-translate-x-full");
    firstContent
      .querySelector(".image-section")
      ?.classList.remove("opacity-0", "translate-x-full");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active state from all tabs
      tabs.forEach((t) =>
        t.classList.remove("bg-brand-black", "text-white", "active")
      );
      tab.classList.add("bg-brand-black", "text-white", "active");

      // Hide all content
      contents.forEach((content) => {
        content.classList.add("hidden");
        content
          .querySelector(".info-section")
          ?.classList.add("opacity-0", "-translate-x-full");
        content
          .querySelector(".image-section")
          ?.classList.add("opacity-0", "translate-x-full");
      });

      // Show active content
      const target = document.getElementById(tab.dataset.tab);
      if (!target) return;
      target.classList.remove("hidden");

      // Animate elements after a slight delay
      setTimeout(() => {
        target
          .querySelector(".info-section")
          ?.classList.remove("opacity-0", "-translate-x-full");
        target
          .querySelector(".image-section")
          ?.classList.remove("opacity-0", "translate-x-full");
      }, 100);

      // Play corresponding video
      const videoSrc = tab.dataset.video;
      if (videoElement && videoSrc) {
        videoElement.pause(); // Stop any currently playing video
        videoElement.querySelector("source").src = videoSrc;
        videoElement.load(); // Reload video source
        videoElement.play(); // Play new video
      }
    });
  });
});

// About Swiper
var swiper = new Swiper(".swiper-about", {
  spaceBetween: 30,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: ".swiper-about-next",
    prevEl: ".swiper-about-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    // Update custom pagination on slide change
    slideChange: function () {
      const totalSlides = this.slides.length;
      const currentSlide = this.activeIndex + 1; // Swiper uses 0-based index
      const paginationElement = document.querySelector(
        ".about-images-pagination"
      );

      if (paginationElement) {
        paginationElement.innerHTML = `${currentSlide}/<span class="text-base-blue-200">${totalSlides}</span>`;
      }
    },
    init: function () {
      // Initialize custom pagination on load
      const totalSlides = this.slides.length;
      const currentSlide = this.activeIndex + 1;
      const paginationElement = document.querySelector(
        ".about-images-pagination"
      );

      if (paginationElement) {
        paginationElement.innerHTML = `${currentSlide}/<span class="text-base-blue-200">${totalSlides}</span>`;
      }
    },
  },
});

// Reusable function to initialize Videos/Images Swiper instances
function initializeSwiper(selector, paginationClass, nextButton, prevButton) {
  return new Swiper(selector, {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 6,
    grid: {
      rows: 2,
      fill: "row",
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      el: paginationClass,
      type: "fraction",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
        slidesPerGroup: 1,
        grid: {
          rows: 3,
        },
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 32,
        slidesPerGroup: 2,
        grid: {
          rows: 3,
        },
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
        },
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 3,
        grid: {
          rows: 2,
        },
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 60,
        slidesPerGroup: 3,
        grid: {
          rows: 2,
        },
      },
    },
    on: {
      init: function () {
        updateCustomPagination(this, paginationClass);
      },
      slideChange: function () {
        updateCustomPagination(this, paginationClass);
      },
      resize: function () {
        updateCustomPagination(this, paginationClass);
      },
      breakpoint: function () {
        updateCustomPagination(this, paginationClass);
      },
    },
  });
}

// Function to update custom pagination
function updateCustomPagination(swiper, paginationClass) {
  // Ensure correct slide count in loop mode
  const totalSlides = swiper.params.loop
    ? swiper.slides.length - swiper.loopedSlides * 2
    : swiper.slides.length;

  // Get active breakpoint settings dynamically
  const activeBreakpoint =
    swiper.currentBreakpoint || getActiveBreakpoint(swiper);
  const breakpointSettings =
    swiper.params.breakpoints[activeBreakpoint] || swiper.params;

  // Extract values dynamically for the active breakpoint
  const slidesPerView = breakpointSettings.slidesPerView || 1;
  const slidesPerGroup = breakpointSettings.slidesPerGroup || slidesPerView;
  const rows = breakpointSettings.grid?.rows || 1;

  // Calculate the total number of pages dynamically per breakpoint
  const slidesPerPage = slidesPerGroup * rows;
  const totalPages = Math.ceil(totalSlides / slidesPerPage);

  // Determine current page based on how many groups have been passed
  const currentPage = Math.ceil(swiper.activeIndex / slidesPerGroup) + 1;

  // Select pagination element
  const paginationElement = document.querySelector(paginationClass);
  if (!paginationElement) {
    console.error(`Pagination element not found: ${paginationClass}`);
    return;
  }

  // Update pagination text dynamically for each breakpoint
  paginationElement.innerHTML = `${currentPage}/<span class="${
    currentPage === totalPages ? "" : "text-base-blue-200"
  }">${totalPages}</span>`;
}

// Helper function to determine active breakpoint
function getActiveBreakpoint(swiper) {
  const breakpoints = Object.keys(swiper.params.breakpoints)
    .map(Number)
    .sort((a, b) => a - b);
  return breakpoints.reverse().find((bp) => window.innerWidth >= bp) || 0;
}

// Initialize Swiper instances
const swiperImages = initializeSwiper(
  ".images-swiper",
  ".images-pagination",
  ".images-button-next",
  ".images-button-prev"
);
const swiperVideos = initializeSwiper(
  ".videos-swiper",
  ".videos-pagination",
  ".videos-button-next",
  ".videos-button-prev"
);

// Function to update pagination dynamically for any Swiper instance
function updatePagination(swiper, paginationClass) {
  if (!swiper || !paginationClass) return;

  const totalSlides = swiper.params.loop
    ? swiper.originalSlides.length
    : swiper.slides.length;
  const currentSlide = swiper.params.loop
    ? swiper.realIndex + 1
    : swiper.activeIndex + 1;

  // Get the pagination element
  const paginationElement = document.querySelector(paginationClass);
  if (!paginationElement) {
    console.error(`Pagination element not found: ${paginationClass}`);
    return;
  }

  // Update pagination text dynamically
  paginationElement.innerHTML = `${currentSlide}/${totalSlides}`;
}

// Function to initialize Swiper with pagination updates
function initSwiper(selector, paginationSelector, nextBtn, prevBtn) {
  const swiper = new Swiper(selector, {
    slidesPerView: 1,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    pagination: {
      el: paginationSelector,
      type: "fraction",
    },
    on: {
      init: function () {
        updatePagination(this, paginationSelector);
      },
      slideChange: function () {
        updatePagination(this, paginationSelector);
      },
    },
  });

  return swiper;
}

// Initialize Swiper instances dynamically
const swiperImagesSingle = initSwiper(
  ".images-single-swiper",
  ".images-single-pagination",
  ".images-single-button-next",
  ".images-single-button-prev"
);

const swiperVideosSingle = initSwiper(
  ".videos-single-swiper",
  ".videos-single-pagination",
  ".videos-single-button-next",
  ".videos-single-button-prev"
);

// Function to update pagination dynamically
function updateSinglePagination(swiper, paginationClass) {
  const totalSlides = swiper.params.loop
    ? swiper.originalSlides.length
    : swiper.slides.length;
  const currentSlide = swiper.params.loop
    ? swiper.realIndex + 1
    : swiper.activeIndex + 1;

  // Get the pagination element
  const paginationElement = document.querySelector(paginationClass);
  if (!paginationElement) {
    console.error(`Pagination element not found: ${paginationClass}`);
    return;
  }

  // Update pagination text
  paginationElement.innerHTML = `${currentSlide}/${totalSlides}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("[data-tab]");
  const contents = document.querySelectorAll("[data-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active state from all tabs and hide all content
      tabs.forEach((t) => t.classList.remove("active-tab__btn"));
      contents.forEach((c) => c.classList.add("hidden"));

      // Add active state to the clicked tab and show corresponding content
      this.classList.add("active-tab__btn");
      document
        .querySelector(`[data-content="${this.dataset.tab}"]`)
        .classList.remove("hidden");
    });
  });
});

function toggleModal(
  modalSelector,
  overlaySelector,
  closeBtnSelector,
  triggerSelector
) {
  const modalOverlay = document.querySelector(overlaySelector);
  const modal = document.querySelector(modalSelector);
  const closeBtn = document.querySelector(closeBtnSelector);

  // Open modal when clicking on the trigger elements (e.g., images, video thumbnails)
  document.querySelectorAll(triggerSelector).forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      modalOverlay.classList.remove("translate-y-full");
      modal.classList.remove("translate-y-full");
      document.body.classList.add("overflow-hidden");
      console.log("click");
    });
  });

  // Close modal when clicking on the close button
  closeBtn.addEventListener("click", function () {
    modalOverlay.classList.add("translate-y-full");
    modal.classList.add("translate-y-full");
    document.body.classList.remove("overflow-hidden");
  });
}

// Usage for Image Modal
toggleModal(
  ".image-slider-modal",
  ".image-slider-modal-overlay",
  ".image-slider-modal-close-btn",
  ".images-swiper .swiper-slide"
);

// Usage for Video Modal (assuming you have similar structure for video modal)
toggleModal(
  ".video-slider-modal",
  ".video-slider-modal-overlay",
  ".video-slider-modal-close-btn",
  ".videos-swiper .swiper-slide"
);

// Vidoe playing func for Media vidoes
document.addEventListener("DOMContentLoaded", () => {
  const videoButtons = document.querySelectorAll(".videoPlay-btn");
  const closeButton = document.querySelector(".video-slider-modal-close-btn");
  const prevButton = document.querySelector(".videos-single-button-prev");
  const nextButton = document.querySelector(".videos-single-button-next");

  let currentVideo = null; // To track the currently playing video

  // Play video function
  videoButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const parent = this.closest(".image-video__product");
      if (!parent) return;

      const video = parent.querySelector(".video-media");
      const thumbnail = parent.querySelector(".video-thumbnail");
      const playButtonContainer = this.closest(".absolute");

      if (video && thumbnail && playButtonContainer) {
        if (currentVideo && currentVideo !== video) {
          currentVideo.pause();
          currentVideo.currentTime = 0;
          currentVideo
            .closest(".image-video__product")
            .querySelector(".video-thumbnail")
            .classList.remove("hidden");
          currentVideo
            .closest(".image-video__product")
            .querySelector(".absolute")
            .classList.remove("hidden");
          currentVideo.classList.add("hidden");
        }

        // Set new playing video
        currentVideo = video;

        // Hide thumbnail and play button
        thumbnail.classList.add("hidden");
        playButtonContainer.classList.add("hidden");

        // Show and play video
        video.classList.remove("hidden");
        video.play();
      }
    });
  });

  // Function to stop and reset video
  function stopVideo() {
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
      currentVideo.classList.add("hidden");

      // Show thumbnail and play button again
      const parent = currentVideo.closest(".image-video__product");
      parent.querySelector(".video-thumbnail").classList.remove("hidden");
      parent.querySelector(".absolute").classList.remove("hidden");

      currentVideo = null;
    }
  }

  // Stop video when clicking close, prev, or next buttons
  if (closeButton) closeButton.addEventListener("click", stopVideo);
  if (prevButton) prevButton.addEventListener("click", stopVideo);
  if (nextButton) nextButton.addEventListener("click", stopVideo);
});

// Hero Video
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".hero-vid-modal");
  const closeModal = document.querySelector(".hero-vid-modal-close");
  const video = document.querySelector(".horo-vid");
  const openButtons = document.querySelectorAll(".hero-vid-btn");

  // Function to open modal and play video
  function openVideoModal() {
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.add("fade-in"), 10); // Ensure smooth fade-in
    video.play();
  }

  // Function to close modal and pause video
  function closeVideoModal() {
    modal.classList.remove("fade-in");
    setTimeout(() => {
      modal.classList.add("hidden");
      video.pause();
      video.currentTime = 0; // Reset video
    }, 200);
  }

  // Attach click events to all hero-vid-btn buttons
  openButtons.forEach((btn) => btn.addEventListener("click", openVideoModal));

  // Close modal when clicking the close button or outside the video
  closeModal.addEventListener("click", closeVideoModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVideoModal();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const topupModal = document.querySelector(".topup-modal");
  const infoModal = document.querySelector(".info-modal");

  if (!topupModal || !infoModal) return;

  const toggleModal = (modal, show) => {
    if (modal) {
      modal.classList.toggle("hidden", !show);
    }
  };

  document.querySelectorAll(".topup-modal-open").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggleModal(topupModal, true);
    });
  });

  document.querySelectorAll(".topup-modal-close").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggleModal(topupModal, false);
    });
  });

  document.querySelectorAll(".info-modal-open").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggleModal(topupModal, false);
      toggleModal(infoModal, true);
    });
  });

  document.querySelectorAll(".info-modal-close").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggleModal(infoModal, false);
    });
  });
});

// Initialize select functionality
document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".select");

  selects.forEach((select) => {
    const button = select.querySelector(".select-button");
    const list = select.querySelector(".select-list");
    const icon = select.querySelector(".select-icon");
    const label = select.querySelector(".select-label");

    // Toggle select
    button.addEventListener("click", (e) => {
      e.preventDefault();
      list.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });

    // Select option
    list.addEventListener("click", (e) => {
      const target = e.target.closest("li");
      if (!target) return;

      list.querySelectorAll("li").forEach((item) => {
        item.classList.remove("text-white");
      });

      label.textContent = target.dataset.value;
      label.classList.remove("text-white/60");
      label.classList.add("text-white");
      target.classList.add("text-white");

      list.classList.add("hidden");
      icon.classList.remove("rotate-180");
    });

    // Close select when clicking outside
    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        list.classList.add("hidden");
        icon.classList.remove("rotate-180");
      }
    });
  });

  // Open modal and copy data
  const openModalButton = document.querySelector(".info-modal-open");
  const modal = document.querySelector(".info-modal");
  const serverName = document.querySelector(".select-label");
  const userIdInput = document.getElementById("userIdInput");
  const characterIdInput = document.getElementById("characterIdInput");

  const modalServerName = document.querySelector("#modalServerName");
  const modalUserId = document.querySelector("#modalUserId");
  const modalCharacterId = document.querySelector("#modalCharacterId");

  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Сохраняем данные в localStorage
    localStorage.setItem("serverName", serverName.textContent);
    localStorage.setItem("userId", userIdInput.value);
    localStorage.setItem("characterId", characterIdInput.value);

    console.log("Данные сохранены в localStorage:");
    console.log("Сервер:", serverName.textContent);
    console.log("ID Пользователя:", userIdInput.value);
    console.log("ID Персонажа:", characterIdInput.value);

    modalServerName.textContent = serverName.textContent;
    modalUserId.textContent = userIdInput.value;
    modalCharacterId.textContent = characterIdInput.value;

    // Показываем модальное окно
    modal.classList.remove("hidden");
  });

  // Close modal
  const closeModalButtons = document.querySelectorAll(".info-modal-close");
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Страница загружена, скрипт выполняется.");

  // Получаем данные из localStorage
  const serverName = localStorage.getItem("serverName");
  const userId = localStorage.getItem("userId");
  const characterId = localStorage.getItem("characterId");

  const serverNameMobile = document.querySelector(
    ".text-white\\/65 div:nth-child(1) .block.sm\\:hidden"
  );
  const userIdMobile = document.querySelector(
    ".text-white\\/65 div:nth-child(2) .block.sm\\:hidden"
  );
  const characterIdMobile = document.querySelector(
    ".text-white\\/65 div:nth-child(3) .block.sm\\:hidden"
  );

  const serverNameDesktop = document.querySelector(
    ".hidden.sm\\:block p:nth-child(1)"
  );
  const userIdDesktop = document.querySelector(
    ".hidden.sm\\:block p:nth-child(2)"
  );
  const characterIdDesktop = document.querySelector(
    ".hidden.sm\\:block p:nth-child(3)"
  );

  if (serverName && userId && characterId) {
    console.log("Данные найдены, вставляем в блоки.");

    serverNameMobile.textContent = serverName;
    userIdMobile.textContent = userId;
    characterIdMobile.textContent = characterId;

    serverNameDesktop.textContent = serverName;
    userIdDesktop.textContent = userId;
    characterIdDesktop.textContent = characterId;
  } else {
    console.log("Данные не найдены в localStorage.");

    serverNameMobile.textContent = "Данные не найдены";
    userIdMobile.textContent = "Данные не найдены";
    characterIdMobile.textContent = "Данные не найдены";

    serverNameDesktop.textContent = "Данные не найдены";
    userIdDesktop.textContent = "Данные не найдены";
    characterIdDesktop.textContent = "Данные не найдены";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector(".info-modal-close");

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "/store.html";
  });
});
