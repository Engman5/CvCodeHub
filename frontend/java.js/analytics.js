import { analytics } from "./firebase.js";

import { logEvent } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

logEvent(analytics, "app_open");
