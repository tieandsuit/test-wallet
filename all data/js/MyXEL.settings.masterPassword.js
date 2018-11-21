var MyXEL = (function (MyXEL, $) {
  var requestRunning = false;

  var modal = $("#changeMasterPasswordModal");

  modal.on('click', '.change-master-password', function () {
    MyXEL.changeMasterPassword();
  });

  var modalHtml = modal.html();

  modal.on('show.bs.modal', function () {
    changePwdStep = 1;
    $(".loading").html('');

    modal.html(modalHtml);

    $("#change_password_body_main").show();
    $("#change_password_footer_main").show();
    $('#change_password_body_message').hide();
    $('#change_password_footer_message').hide();
  });

  var changePwdStep = 1;

  MyXEL.changeMasterPassword = function () {
    if (requestRunning) return;

    requestRunning = true;
    MyXEL.showBigLoadingBar(modal);

    if (changePwdStep === 1) {

      MyXEL.getEncryptedWallet(function (result) {
        requestRunning = false;
        MyXEL.hideLoadingBar(modal);

        if (result.status == "success") {
          var masterPassword = $("#tx_master_password_old").val();

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

              var keyGeneration = modal.find("#keyGeneration");
              var progressBar = modal.find(".progress-bar");
              var confirmButton = $(".change-master-password");
              $("#change_password_body_main").hide();
              $("#change_password_footer_main").hide();
              $("#change_password_body_message").show();
              $("#change_password_footer_message").show();

              confirmButton.addClass('disabled');


              sjcl.random = new sjcl.prng(8);
              if (window.crypto) {
                try {
                  var ab = new Uint32Array(32);
                  window.crypto.getRandomValues(ab);
                  sjcl.random.addEntropy(ab, 1024, 'crypto.getRandomValues');
                  changePwdStep = 2;
                  return confirmButton.removeClass('disabled');
                } catch (e) {
                  keyGeneration.show();

                  sjcl.random.startCollectors();
                  sjcl.random.addEventListener('progress', function () {
                    var progress = (sjcl.random.getProgress(8) * 100);

                    progressBar.css('width', progress + '%').attr('aria-valuenow', progress).html(progress.toFixed(0) + "%");
                  });

                  sjcl.random.addEventListener('seeded', function () {
                    sjcl.random.stopCollectors();
                    changePwdStep = 2;
                    confirmButton.removeClass('disabled');
                  });
                }
              }

            } else {
              MyXEL.showError(modal, "Wrong master password");
            }
          }
        }
      });
    }

    if (changePwdStep === 2) {
      var newMasterPassword1, newMasterPassword2;

      var newSalt = sjcl.random.randomWords(4, 8);
      newSalt = sjcl.codec.base64.fromBits(newSalt);
      newSalt = MyXEL.strtr(newSalt, '+/=', '-_,');

      MyXEL.salt = newSalt;

      newMasterPassword1 = $("#tx_master_password_new1").val();
      newMasterPassword2 = $("#tx_master_password_new2").val();

      var error = "";
      if (newMasterPassword1.length < 8) {
        error = "The master password is too short";
      }
      if (newMasterPassword1 !== newMasterPassword2) {
        error = "The master passwords are not the same";
      }

      if (error) {
        MyXEL.showError(modal, error);
      } else {
        MyXEL.encryptWallet(newMasterPassword1);

        MyXEL.storeWallet(function (result) {
          requestRunning = false;
          if (result.status === "success") {
            var footer_html = '<div class="col-xs-7 loading"></div>' +
              '<div class="col-xs-5"><button type="button" class="btn btn-primary" data-dismiss="modal" id="ok">OK</button></div>';

            $('#change_password_body_message').html("Successfully changed master password.").show();
            $('#change_password_footer_message').html(footer_html);
          }
        });
      }
    }
  };

  return MyXEL;
}(MyXEL || {}, jQuery));