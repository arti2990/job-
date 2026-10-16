
"use strict";

const $ = (selector) => document.querySelector(selector);

const JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "PixelCraft Technologies",
    category: "Technology",
    type: "Full-time",
    experience: "Entry level",
    location: "Gurgaon, India",
    salary: "₹4–8 LPA",
    description: "Build responsive user interfaces with HTML, CSS, JavaScript, and modern frontend tools.",
    posted: "Recently posted",
    logo: "P"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    category: "Design",
    type: "Full-time",
    experience: "Mid level",
    location: "Remote",
    salary: "₹6–12 LPA",
    description: "Design intuitive digital experiences, create prototypes, and improve product usability.",
    posted: "Recently posted",
    logo: "C"
  },
  {
    id: 3,
    title: "Digital Marketing Intern",
    company: "GrowthWave Media",
    category: "Marketing",
    type: "Internship",
    experience: "Fresher",
    location: "Delhi, India",
    salary: "₹10–18K/month",
    description: "Support SEO, social media campaigns, content planning, and marketing analytics.",
    posted: "Recently posted",
    logo: "G"
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Insight Analytics",
    category: "Data",
    type: "Full-time",
    experience: "Mid level",
    location: "Bengaluru, India",
    salary: "₹7–14 LPA",
    description: "Analyze datasets, develop dashboards, and communicate actionable business insights.",
    posted: "Recently posted",
    logo: "I"
  },
  {
    id: 5,
    title: "Junior Web Developer",
    company: "CodeBridge Solutions",
    category: "Technology",
    type: "Full-time",
    experience: "Fresher",
    location: "Remote",
    salary: "₹3–6 LPA",
    description: "Develop and maintain websites while collaborating with designers and senior developers.",
    posted: "Recently posted",
    logo: "C"
  },
  {
    id: 6,
    title: "Business Development Executive",
    company: "NextStep Ventures",
    category: "Business",
    type: "Full-time",
    experience: "Entry level",
    location: "Noida, India",
    salary: "₹3–7 LPA",
    description: "Build client relationships, identify opportunities, and help grow business partnerships.",
    posted: "Recently posted",
    logo: "N"
  },
  {
    id: 7,
    title: "Senior Software Engineer",
    company: "CloudPeak Systems",
    category: "Technology",
    type: "Full-time",
    experience: "Senior",
    location: "Remote",
    salary: "₹18–30 LPA",
    description: "Architect reliable applications, review code, and mentor engineering team members.",
    posted: "Recently posted",
    logo: "C"
  },
  {
    id: 8,
    title: "Graphic Design Intern",
    company: "BrightPixel Agency",
    category: "Design",
    type: "Internship",
    experience: "Fresher",
    location: "Jaipur, India",
    salary: "₹8–15K/month",
    description: "Create engaging graphics, social media creatives, and branded visual assets.",
    posted: "Recently posted",
    logo: "B"
  },
  {
    id: 9,
    title: "Content Marketing Specialist",
    company: "MarketSpring",
    category: "Marketing",
    type: "Contract",
    experience: "Mid level",
    location: "Remote",
    salary: "₹5–10 LPA",
    description: "Plan editorial calendars and create search-optimized content for digital audiences.",
    posted: "Recently posted",
    logo: "M"
  },
  {
    id: 10,
    title: "Data Analyst Intern",
    company: "Insight Analytics",
    category: "Data",
    type: "Internship",
    experience: "Fresher",
    location: "Delhi, India",
    salary: "₹12–20K/month",
    description: "Assist with spreadsheet analysis, reporting, data cleaning, and dashboard preparation.",
    posted: "Recently posted",
    logo: "I"
  },
  {
    id: 11,
    title: "Part-time Web Designer",
    company: "WebNest Studio",
    category: "Design",
    type: "Part-time",
    experience: "Entry level",
    location: "Remote",
    salary: "₹15–30K/month",
    description: "Create polished website layouts and improve existing pages for different clients.",
    posted: "Recently posted",
    logo: "W"
  },
  {
    id: 12,
    title: "Business Operations Manager",
    company: "NextStep Ventures",
    category: "Business",
    type: "Full-time",
    experience: "Senior",
    location: "Gurgaon, India",
    salary: "₹12–20 LPA",
    description: "Improve operational workflows, coordinate teams, and track business performance.",
    posted: "Recently posted",
    logo: "N"
  }
];

const ALERTS_KEY = "careerhub.savedAlerts";
const APPLICATIONS_KEY = "careerhub.demoApplications";

const searchForm = $("#search-form");
const keywordInput = $("#search-keyword");
const locationInput = $("#search-location");
const categoryFilter = $("#filter-category");
const typeFilter = $("#filter-type");
const experienceFilter = $("#filter-experience");
const jobsList = $("#jobs-list");
const resultCount = $("#result-count");
const emptyState = $("#empty-state");

let searchKeyword = "";
let searchLocation = "";

function readStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.warn("Browser storage is unavailable.", error);
    return [];
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save browser data.", error);
    return false;
  }
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getFilteredJobs() {
  const keyword = normalize(searchKeyword);
  const location = normalize(searchLocation);
  const category = categoryFilter.value;
  const type = typeFilter.value;
  const experience = experienceFilter.value;

  return JOBS.filter((job) => {
    const searchableText = [
      job.title,
      job.company,
      job.category,
      job.description,
      job.experience,
      job.type
    ].join(" ").toLowerCase();

    const matchesKeyword =
      !keyword || searchableText.includes(keyword);

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location);

    const matchesCategory =
      !category || job.category === category;

    const matchesType =
      !type || job.type === type;

    const matchesExperience =
      !experience || job.experience === experience;

    return matchesKeyword &&
      matchesLocation &&
      matchesCategory &&
      matchesType &&
      matchesExperience;
  });
}

function renderJobs() {
  const jobs = getFilteredJobs();

  resultCount.textContent =
    `${jobs.length} ${jobs.length === 1 ? "job" : "jobs"} found`;

  emptyState.hidden = jobs.length !== 0;
  jobsList.hidden = jobs.length === 0;

  jobsList.innerHTML = jobs.map((job) => `
    <article class="job-card">
      <div class="job-card-top">
        <div class="company-logo" aria-hidden="true">
          ${escapeHTML(job.logo)}
        </div>
        <div>
          <h3 class="job-title">${escapeHTML(job.title)}</h3>
          <p class="company-name">${escapeHTML(job.company)}</p>
        </div>
      </div>

      <div class="job-tags">
        <span class="tag">${escapeHTML(job.category)}</span>
        <span class="tag">${escapeHTML(job.type)}</span>
        <span class="tag">${escapeHTML(job.experience)}</span>
      </div>

      <p class="job-description">
        ${escapeHTML(job.description)}
      </p>

      <div class="job-meta">
        <span class="job-location">
          📍 ${escapeHTML(job.location)}
        </span>
        <span class="job-salary">
          ${escapeHTML(job.salary)}
        </span>
      </div>

      <button class="button button-primary job-apply"
        type="button" data-apply-id="${job.id}">
        Apply Now →
      </button>
    </article>
  `).join("");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchKeyword = keywordInput.value.trim();
  searchLocation = locationInput.value.trim();
  renderJobs();

  $("#jobs").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

[categoryFilter, typeFilter, experienceFilter].forEach((filter) => {
  filter.addEventListener("change", renderJobs);
});

$("#reset-filters").addEventListener("click", () => {
  keywordInput.value = "";
  locationInput.value = "";
  categoryFilter.value = "";
  typeFilter.value = "";
  experienceFilter.value = "";

  searchKeyword = "";
  searchLocation = "";

  renderJobs();
});

const applicationDialog = $("#application-dialog");
const applicationForm = $("#application-form");

jobsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-apply-id]");
  if (!button) return;

  const job = JOBS.find(
    (item) => item.id === Number(button.dataset.applyId)
  );

  if (!job) return;

  $("#application-job-id").value = String(job.id);
  $("#application-job-title").textContent =
    `${job.title} at ${job.company}`;

  $("#application-message").textContent = "";
  $("#application-message").className = "form-message";

  applicationDialog.showModal();
});

$("#close-dialog").addEventListener("click", () => {
  applicationDialog.close();
});

applicationDialog.addEventListener("click", (event) => {
  if (event.target === applicationDialog) {
    applicationDialog.close();
  }
});

applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!applicationForm.reportValidity()) return;

  const jobId = Number($("#application-job-id").value);
  const job = JOBS.find((item) => item.id === jobId);

  if (!job) {
    showMessage(
      $("#application-message"),
      "This job could not be found.",
      "error"
    );
    return;
  }

  const applications = readStorage(APPLICATIONS_KEY);

  applications.push({
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
    jobId: job.id,
    name: $("#applicant-name").value.trim(),
    email: $("#applicant-email").value.trim(),
    resume: $("#applicant-resume").value.trim(),
    createdAt: new Date().toISOString()
  });

  if (!writeStorage(APPLICATIONS_KEY, applications)) {
    showMessage(
      $("#application-message"),
      "Could not save this demo application. Check browser storage.",
      "error"
    );
    return;
  }

  applicationForm.reset();

  showMessage(
    $("#application-message"),
    "Demo application saved in this browser. It has not been sent to the employer.",
    "success"
  );
});

function showMessage(element, message, status) {
  element.textContent = message;
  element.className = `form-message ${status}`;
}

const alertForm = $("#alert-form");

alertForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!alertForm.reportValidity()) return;

  const alert = {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
    email: $("#alert-email").value.trim(),
    keyword: $("#alert-keyword").value.trim(),
    location: $("#alert-location").value.trim(),
    category: $("#alert-category").value,
    type: $("#alert-type").value,
    createdAt: new Date().toISOString()
  };

  const alerts = readStorage(ALERTS_KEY);

  const duplicate = alerts.some((saved) =>
    normalize(saved.email) === normalize(alert.email) &&
    normalize(saved.keyword) === normalize(alert.keyword) &&
    normalize(saved.location) === normalize(alert.location) &&
    saved.category === alert.category &&
    saved.type === alert.type
  );

  if (duplicate) {
    showMessage(
      $("#alert-message"),
      "This job alert is already saved.",
      "error"
    );
    return;
  }

  alerts.unshift(alert);

  if (!writeStorage(ALERTS_KEY, alerts)) {
    showMessage(
      $("#alert-message"),
      "Could not save the alert. Check your browser storage settings.",
      "error"
    );
    return;
  }

  alertForm.reset();
  renderSavedAlerts();

  showMessage(
    $("#alert-message"),
    "Job alert saved successfully in this browser!",
    "success"
  );
});

function renderSavedAlerts() {
  const alerts = readStorage(ALERTS_KEY);
  const container = $("#saved-alerts");

  if (!alerts.length) {
    container.innerHTML = `
      <div class="no-alerts">
        You haven't saved any job alerts yet. Create your first alert above.
      </div>
    `;
    return;
  }

  container.innerHTML = alerts.map((alert) => {
    const preferences = [
      alert.location,
      alert.category,
      alert.type
    ].filter(Boolean).join(" · ") || "All locations and job types";

    return `
      <article class="saved-alert">
        <div>
          <h3>${escapeHTML(alert.keyword)}</h3>
          <p>${escapeHTML(alert.email)}</p>
          <p>${escapeHTML(preferences)}</p>
        </div>
        <button class="delete-alert" type="button"
          data-delete-alert="${escapeHTML(alert.id)}">
          Remove
        </button>
      </article>
    `;
  }).join("");
}

$("#saved-alerts").addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-alert]");
  if (!button) return;

  const id = button.dataset.deleteAlert;
  const alerts = readStorage(ALERTS_KEY);
  const updated = alerts.filter((alert) => alert.id !== id);

  if (writeStorage(ALERTS_KEY, updated)) {
    renderSavedAlerts();
  }
});

$("#current-year").textContent = new Date().getFullYear();

renderJobs();
renderSavedAlerts();
