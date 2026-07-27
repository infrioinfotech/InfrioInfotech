/**
 * Infrio Infotech - Firebase & Google Sheets Contact Form Integration
 * Saves form submissions to Firebase Firestore (`Infrio-Website-Contact's-Data` and `contacts` collections)
 * with sequential numeric IDs (1, 2, 3, 4...), dropdown Service selection, and WOW Animated Modal.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs,
  doc,
  setDoc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKhu9f72cMXuV17ClxoQW2lJ2gcLG4MFg",
  authDomain: "infrio-infotech.firebaseapp.com",
  projectId: "infrio-infotech",
  storageBucket: "infrio-infotech.firebasestorage.app",
  messagingSenderId: "114966178838",
  appId: "1:114966178838:web:c7a2af33b2463c7b4bd937",
  measurementId: "G-0EH0REKP1P"
};

// Initialize Firebase App & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Deployed Google Sheets Web App Endpoint
export let GOOGLE_SHEETS_WEBHOOK_URL = window.GOOGLE_SHEETS_WEBHOOK_URL || localStorage.getItem("INFRIO_SHEETS_URL") || "https://script.google.com/macros/s/AKfycbzn_xq2tumyyvprgbBfBkqOdBwumCq6vGOL01EWn7rEzRiMcJoMm5Bobdg5puTL8GGYOw/exec";

window.setGoogleSheetsWebhook = function(url) {
  if (url && url.startsWith("http")) {
    GOOGLE_SHEETS_WEBHOOK_URL = url;
    window.GOOGLE_SHEETS_WEBHOOK_URL = url;
    localStorage.setItem("INFRIO_SHEETS_URL", url);
    console.log("✅ Google Sheets Webhook URL set:", url);
    return true;
  }
  return false;
};

/**
 * Handle Form Submission
 */
async function handleContactSubmit(event) {
  event.preventDefault();
  event.stopPropagation();

  const form = event.target.closest("form") || event.target;
  if (!form) return;

  // Extract Form Input Elements
  const firstNameInput = form.querySelector('#mf-input-text-1bce9a44') || 
                         form.querySelector('input[name="mf-text"]:nth-of-type(1)') || 
                         form.querySelectorAll('input[type="text"]')[0];
                         
  const lastNameInput = form.querySelector('#mf-input-text-4338a0') || 
                        form.querySelector('input[name="mf-text"]:nth-of-type(2)') || 
                        form.querySelectorAll('input[type="text"]')[1];

  const emailInput = form.querySelector('#mf-input-email-1ffedc84') || 
                     form.querySelector('input[type="email"]') || 
                     form.querySelector('input[name="mf-email"]');

  const phoneInput = form.querySelector('#mf-input-telephone-3f3aa39d') || 
                     form.querySelector('input[type="tel"]') || 
                     form.querySelector('input[name="mf-telephone"]');

  const serviceSelect = form.querySelector('#mf-input-service') || 
                        form.querySelector('select[name="mf-service"]');

  const messageInput = form.querySelector('#mf-input-text-area-5b55be30') || 
                       form.querySelector('textarea') || 
                       form.querySelector('textarea[name="mf-textarea"]');

  const submitBtn = form.querySelector('button[type="submit"]') || 
                    form.querySelector('.metform-submit-btn') ||
                    event.target;

  // Input Values
  const firstName = firstNameInput ? firstNameInput.value.trim() : "";
  const lastName = lastNameInput ? lastNameInput.value.trim() : "";
  const fullName = (firstName + " " + lastName).trim();
  const email = emailInput ? emailInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const selectedService = serviceSelect && serviceSelect.value ? serviceSelect.value : "Website Design";
  const message = messageInput ? messageInput.value.trim() : "";

  // Validation
  if (!email || !firstName) {
    showNotification("warning", "Missing Fields", "Please enter your name and email address.");
    return;
  }

  // Button Loading State
  const originalBtnContent = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";
  submitBtn.innerHTML = `<span>Sending... <i class="fas fa-spinner fa-spin"></i></span>`;

  const submittedAtISO = new Date().toISOString();

  // Determine Sequential Numeric ID (1, 2, 3, 4...)
  let nextNumericId = 1;
  try {
    const snap1 = await getDocs(collection(db, "Infrio-Website-Contact's-Data"));
    const snap2 = await getDocs(collection(db, "contacts"));
    nextNumericId = Math.max(snap1.size, snap2.size) + 1;
  } catch (e) {
    nextNumericId = 1;
  }

  const docIdStr = String(nextNumericId);

  // Document Payload matching Firestore Schema with numeric ID
  const contactData = {
    id: nextNumericId,
    name: fullName || "Anonymous",
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    service: selectedService,
    message: message,
    submittedAt: submittedAtISO,
    createdAt: serverTimestamp()
  };

  let firestoreSuccess = false;

  // 1. Save to Firebase Firestore with numeric ID (e.g., /1, /2, /3)
  try {
    await Promise.all([
      setDoc(doc(db, "Infrio-Website-Contact's-Data", docIdStr), contactData),
      setDoc(doc(db, "contacts", docIdStr), contactData)
    ]);
    console.log("✅ Saved to Firebase Firestore with Numeric ID:", docIdStr);
    firestoreSuccess = true;
  } catch (error) {
    console.error("❌ Error writing to Firebase Firestore: ", error);
  }

  // 2. Direct Webhook call to Google Sheets Web App Endpoint
  const activeSheetsUrl = window.GOOGLE_SHEETS_WEBHOOK_URL || GOOGLE_SHEETS_WEBHOOK_URL || localStorage.getItem("INFRIO_SHEETS_URL");

  if (activeSheetsUrl) {
    try {
      await fetch(activeSheetsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: nextNumericId,
          sheetName: "Infrio-Website-Contact's-Data",
          firstName: firstName,
          lastName: lastName,
          name: fullName,
          email: email,
          phone: phone,
          service: selectedService,
          message: message,
          submittedAt: submittedAtISO,
          createdAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        })
      });
      console.log("✅ Sent to Google Sheet direct webhook with ID:", nextNumericId);
    } catch (err) {
      console.warn("⚠️ Webhook warning: ", err);
    }
  }

  // Reset Button State
  submitBtn.disabled = false;
  submitBtn.style.opacity = "1";
  submitBtn.innerHTML = originalBtnContent;

  if (firestoreSuccess) {
    showNotification("success", "Thank You!", "Thank you so much for contacting Infrio Infotech , our Team will reach you soon");
    
    // Reset Form Inputs
    if (form.reset) {
      form.reset();
    } else {
      if (firstNameInput) firstNameInput.value = "";
      if (lastNameInput) lastNameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (phoneInput) phoneInput.value = "";
      if (serviceSelect) serviceSelect.selectedIndex = 0;
      if (messageInput) messageInput.value = "";
    }
  } else {
    showNotification(
      "error", 
      "Submission Failed", 
      "There was an error saving your message. Please try again."
    );
  }
}

/**
 * Display WOW Animated Popup Modal
 */
function showNotification(type, title, message) {
  // Remove existing modal if present
  const existingModal = document.getElementById("infrio-custom-modal");
  if (existingModal) existingModal.remove();

  const isSuccess = type === "success";
  const iconMarkup = isSuccess 
    ? `<div class="infrio-modal-icon-circle infrio-success-icon">
         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00e676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
           <polyline points="20 6 9 17 4 12"></polyline>
         </svg>
       </div>`
    : `<div class="infrio-modal-icon-circle infrio-error-icon">
         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff5252" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
           <circle cx="12" cy="12" r="10"></circle>
           <line x1="12" y1="8" x2="12" y2="12"></line>
           <line x1="12" y1="16" x2="12.01" y2="16"></line>
         </svg>
       </div>`;

  const customText = isSuccess 
    ? "Thank you so much for contacting Infrio Infotech , our Team will reach you soon" 
    : message;

  const modalHtml = `
    <div id="infrio-custom-modal" class="infrio-modal-overlay">
      <div class="infrio-modal-card">
        ${iconMarkup}
        <h3 class="infrio-modal-title">${isSuccess ? "Thank You!" : title}</h3>
        <p class="infrio-modal-message">${customText}</p>
        <button id="infrio-modal-close-btn" class="infrio-modal-btn">Got It!</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Add styles if not present
  if (!document.getElementById("infrio-modal-styles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "infrio-modal-styles";
    styleEl.textContent = `
      .infrio-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 15, 12, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        animation: infrioFadeIn 0.3s ease-out forwards;
      }
      .infrio-modal-card {
        background: linear-gradient(145deg, #052c25, #0a4237);
        border: 2px solid #ff6900;
        border-radius: 20px;
        padding: 40px 35px;
        max-width: 460px;
        width: 90%;
        text-align: center;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 105, 0, 0.25);
        transform: scale(0.85);
        animation: infrioPopIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      .infrio-modal-icon-circle {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px auto;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 230, 118, 0.1);
        border: 2px solid #00e676;
        box-shadow: 0 0 20px rgba(0, 230, 118, 0.4);
        animation: infrioPulse 2s infinite;
      }
      .infrio-error-icon {
        background: rgba(255, 82, 82, 0.1);
        border-color: #ff5252;
        box-shadow: 0 0 20px rgba(255, 82, 82, 0.4);
      }
      .infrio-modal-title {
        color: #ffffff;
        font-family: inherit;
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      .infrio-modal-message {
        color: #e0e0e0;
        font-family: inherit;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 28px;
      }
      .infrio-modal-btn {
        background: linear-gradient(135deg, #ff6900 0%, #ff8c00 100%);
        color: #ffffff;
        border: none;
        padding: 14px 40px;
        font-size: 16px;
        font-weight: 700;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(255, 105, 0, 0.4);
        transition: all 0.25s ease;
      }
      .infrio-modal-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 25px rgba(255, 105, 0, 0.6);
      }
      @keyframes infrioFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes infrioPopIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes infrioPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.06); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Close Modal Handler
  const closeBtn = document.getElementById("infrio-modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("infrio-custom-modal");
      if (modal) {
        modal.style.animation = "infrioFadeIn 0.25s ease-in reverse forwards";
        setTimeout(() => modal.remove(), 250);
      }
    });
  }
}

// Bind Submit Listener
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (form && (form.classList.contains("metform-form-content") || form.querySelector('.metform-submit-btn') || form.querySelector('button[type="submit"]'))) {
      handleContactSubmit(e);
    }
  }, true);
});

window.handleContactSubmit = handleContactSubmit;
window.firebaseDb = db;
