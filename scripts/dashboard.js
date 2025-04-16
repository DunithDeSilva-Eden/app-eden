firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  const db = firebase.firestore();
  db.collection('Investments').where('userId', '==', user.uid).get()
    .then((querySnapshot) => {
      const details = document.getElementById('investment-details');
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        details.innerHTML = `
          <p>Wallet Balance: $${data.walletBalance}</p>
          <p>Available Balance: $${data.availableBalance}</p>
          <p>Investments: $${data.investments}</p>
          <p>Investment Date: ${data.investmentDate}</p>
          <p>Maturity: ${data.maturity}</p>
          <p>APY: ${data.apy}%</p>
          <p>Interest Accrued: $${data.interestAccrued}</p>
          <p>Remaining Days: ${data.remainingDays}</p>
        `;
      });
    });
});
