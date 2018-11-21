var MyXEL = (function (MyXEL, $) {
  var requestRunning = false;

  var modal = $("#getPublicKeyModal");

  modal.on('click', ".generate-public-keys", function () {
    if (requestRunning) return;
    requestRunning = true;

    MyXEL.showBigLoadingBar(modal);

    MyXEL.getEncryptedWallet(function (result) {
      requestRunning = false;

      var masterPassword = modal.find('.master-password').val();

      // old wallet, need to convert
      if (MyXEL.walletVersion == 1) {
        var secretPhrase = MyXEL.decryptOldWallet(masterPassword);
        var accountId = nxtCrypto.getAccountId(secretPhrase);

        if (MyXEL.verifyAccountId(accountId)) {
          MyXEL.convertOldWalletToNew(masterPassword);

          MyXEL.walletVersion = 2;
        } else {
          return MyXEL.showError(modal, "Wrong master password");
        }
      }

      // new format
      if (MyXEL.walletVersion == 2) {

        try {
          MyXEL.decryptWallet(masterPassword);

          MyXEL.createPublicKeys(function () {
            MyXEL.hideLoadingBar(modal);

            var message = "<p>Public keys created. Click OK to reload the page.</p>";

            modal.find('.modal-main').hide();

            modal.find('.modal-message').first().html(message);
            modal.find('.modal-message').show();

          });
        } catch(e) {
          MyXEL.showError(modal, "Wrong master password");
        }
      }
    });
  });

  modal.on('click', '.ok', function () {
    window.location.reload();
  });

  MyXEL.createPublicKeys = function (callback) {
    var accounts = MyXEL.decryptedWallet.accounts;

    var count = 0;
    for (var i = 0; i < accounts.length; i++) {
      var account = accounts[i];

      var secretPhrase = account.password;

      var secretPhraseHex = converters.stringToHexString(secretPhrase);

      if(nxtCrypto.getAccountId(secretPhrase) != account.id) continue;

      var data = {
        accountId: account.id,
        publicKey: nxtCrypto.getPublicKey(secretPhraseHex)
      };

      MyXEL.storeAccountId(data, function () {
        count++;

        console.log(count);
        console.log(accounts.length);

        if(count >= accounts.length) {
          callback();
        }
      });
    }
  };

  return MyXEL;
}(MyXEL || {}, jQuery));

$(document).ready(function () {
});