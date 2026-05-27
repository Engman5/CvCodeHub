import { auth, db } from "./firebase.js";

import {
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

window.payWithPaystack = function () {
  let handler = PaystackPop.setup({
    key: "YOUR_PAYSTACK_PUBLIC_KEY",

    email: auth.currentUser.email,

    amount: 5000,

    callback: function (response) {
      upgradeUserToPremium();
    },

    onClose: function () {
      alert("Payment Cancelled");
    },
  });

  handler.openIframe();
};

async function upgradeUserToPremium() {
  const user = auth.currentUser;

  await updateDoc(doc(db, "users", user.uid), {
    plan: "premium",
  });

  alert("Premium Activated");
}
