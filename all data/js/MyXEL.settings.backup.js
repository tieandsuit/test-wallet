var MyXEL = (function (MyXEL, $) {
  var requestRunning = false;

  var modal = $("#backupWalletModal");
  var modalHtml = modal.html();

  var backupWalletStep = 1;

  modal.on('show.bs.modal', function () {
    backupWalletStep = 1;
    modal.html(modalHtml);

    $("#backup_wallet_body_main").show();
    $("#backup_wallet_footer_main").show();
    $('#backup_wallet_body_message').hide();
    $('#backup_wallet_footer_message').hide();
  });

  modal.on('click', '.backup-wallet', function () {
    MyXEL.backupWallet();
  });

  MyXEL.backupWallet = function () {
    if (requestRunning) return;
    requestRunning = true;

    MyXEL.showBigLoadingBar(modal);
    if (backupWalletStep === 1) {

      MyXEL.getEncryptedWallet(function (result) {
        requestRunning = false;
        MyXEL.hideLoadingBar(modal);

        if (result.status == "success") {
          var masterPassword = $("#tx_master_password").val();

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

            if (MyXEL.decryptWallet(masterPassword)) {
              backupWalletStep = 2;

              var backup_wallet_body_message = $("#backup_wallet_body_message");

              $("#backup_wallet_body_main").hide();
              $("#backup_wallet_footer_main").hide();
              backup_wallet_body_message.show();
              $("#backup_wallet_footer_message").show();

              var backupWalletButton = $(".backup-wallet");
              backupWalletButton.addClass('disabled');


              backup_wallet_body_message.on('change', '#backup-wallet', function () {
                var backupWalletCheckbox = $("#backup-wallet");

                if (backupWalletCheckbox.prop('checked')) {
                  backupWalletButton.removeClass('disabled');
                } else {
                  backupWalletButton.addClass('disabled');
                }
              });
            } else {
              return MyXEL.showError(modal, "Wrong master password");
            }
          }
        }
      });
    }

    if (backupWalletStep === 2) {
      var backup;

      requestRunning = false;
      $(".loading").html('');

      backup = MyXEL.salt + MyXEL.unpad(MyXEL.encryptedWallet);

      try {
        var isFileSaverSupported = !!new Blob();
      } catch (e) {
      }

      if (isFileSaverSupported) {
        var blob = new Blob([backup], {type: "text/plain;charset=utf-8"});

        saveAs(blob, "wallet.json.aes");
      } else {
        var popup = window.open(null, null, "width=700,height=800,toolbar=0");

        popup.document.write('<!DOCTYPE html><html><head></head><body><p>Please save the following as wallet.json.aes:</p><p>Tip: with a modern web browser we can download this file instantly.</p><br/><br/><div style="word-wrap:break-word;" >' + backup + '</div></body></html>');
      }

    }
  };

  return MyXEL;
}(MyXEL || {}, jQuery));