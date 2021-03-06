var MyXEL = (function (MyXEL, $) {

  MyXEL.loadingBarBig = '<img src="./img/ajax-loader.gif">';
  MyXEL.loadingBarSmall = '<img src="./img/ajax-loader_small.gif">';
  MyXEL.accounts = [];
  MyXEL.mainAccount = '';
  MyXEL.mainSecretPhrase = '';
  MyXEL.encryptedWallet = '';
  MyXEL.decryptedWallet = '';
  MyXEL.salt = '';
  MyXEL.walletVersion = 0;

  MyXEL.showBigLoadingBar = function (context) {
    $(context).find(".loading").html(MyXEL.loadingBarBig).show();
  };

  MyXEL.showSmallLoadingBar = function (context) {
    $(context).find(".loading").html(MyXEL.loadingBarSmall).show();
  };

  MyXEL.hideLoadingBar = function (context) {
    $(context).find(".loading").html('');
  };

  MyXEL.showError = function (context, error) {
    $(context).find(".error").html(error).css('color', 'red');
  };

  MyXEL.hideError = function (context) {
    $(context).find(".error").html('').css('color', 'black');
  };

  MyXEL.getAccounts = function (callback) {
    $.get('api/0.1/user/account', function (result) {
      if (result.status == "success") {
        MyXEL.accounts = result.data.accounts;
        callback(MyXEL.accounts);
      }
    });
  };

  var accountList = $("#accountList");

  MyXEL.updateAccountList = function () {
    var accounts = MyXEL.accounts;
    MyXEL.showSmallLoadingBar(accountList);

    accountList.find(".dropdown-menu").empty();

    for (var i = 0; i < accounts.length; i++) {
      if (i === 0) {
        accounts[i].firstAccount = true;
      }
      var account = accounts[i];
      var accountId = account.tx_account_id;

      var adr = new NxtAddress();
      adr.set(accountId);

      var label = account.tx_label ? account.tx_label : "- No label-";

      accountList.find(".dropdown-menu").append('<li>' +
        '<a href="#" class="nxt-address" role="menuitem" tabindex="-1" data-nxt-address="' +
        adr.account_id() + '">' + adr.toString(true) + ' <strong>&lt;' + label + "&gt;</strong>" +
        '</a></li>');

      if (account.bl_selected == "1") {
        MyXEL.setMainAccount(account);

        MyXEL.hideLoadingBar(accountList);

        $("#selectedAccount").find('.nxt-address').html(adr.toString(true));

        MyXEL.refreshBalance();
      }
    }

    var addAccountButton = '<li>' +
      '<a href="#" data-toggle="modal" data-target="#addAccountModal" data-backdrop="static" role="menuitem" tabindex="-1">' +
      '<span class="glyphicon glyphicon-cloud-upload"></span>' +
      '&nbsp;&nbsp;&nbsp;Add account' +
      '</a>' +
      '</li>';

    accountList.find(".dropdown-menu").append(addAccountButton);
  };

  MyXEL.getMainAccountSecretPhrase = function () {
    var accounts = MyXEL.decryptedWallet.accounts;

    for (var i = 0; i < accounts.length; i++) {
      var account = accounts[i];
      console.log(account);

      if (account.id == MyXEL.mainAccount) {
        MyXEL.mainSecretPhrase = account.password;
      }
    }
  };

  MyXEL.confirmRecipient = function (unsignedTransactionBytes, recipient) {
    return nxtCrypto.byteArrayToBigInteger(converters.hexStringToByteArray(unsignedTransactionBytes.substr(80, 16))).toString() == recipient;
  };

  accountList.find('.dropdown-menu').on('click', 'li', function () {
    var accountId = $(this).find('a').data('nxt-address');

    if (!accountId) return;

    for (var i = 0; i < MyXEL.accounts.length; i++) {
      if (MyXEL.accounts[i].tx_account_id == accountId) {
        var account = MyXEL.accounts[i];
      }
    }

    if (!account) return;

    MyXEL.showSmallLoadingBar(accountList);

    $.post('api/0.1/user/account', { accountId: accountId, selected: 1 }, function (result) {
      MyXEL.hideLoadingBar(accountList);
      if (result.status === 'success') {
        MyXEL.setMainAccount(account);

        var adr = new NxtAddress();
        adr.set(accountId);

        $("#selectedAccount").find('.nxt-address').html(adr.toString(true));
        MyXEL.refreshBalance();
      }
    });
  });

  MyXEL.setMainAccount = function (account) {
    MyXEL.mainAccount = account.tx_account_id;

    var adr = new NxtAddress();
    adr.set(MyXEL.mainAccount);

    $("#accountQr").html('<img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=' + adr.toString(true) + '"/>');

    $("#accountNumeric").html(MyXEL.mainAccount);

    $.get('nxt?requestType=getAccount', { account: MyXEL.mainAccount }, function (result) {
      var newAccount = true;

      if(typeof result.publicKey !== 'undefined') newAccount = false;

      if (MyXEL.getTransactionHistory) MyXEL.getTransactionHistory();

      var publicKeyDiv = $(".publicKey");
      var publicKeyWrapper = $("#publicKeyDiv");
      var noPublicKeyDiv = $("#noPublicKey");
      publicKeyWrapper.hide();
      noPublicKeyDiv.hide();
      publicKeyDiv.empty();

      if(newAccount) {
        if(account.tx_public_key != "") {
          publicKeyDiv.html(account.tx_public_key);
        } else {
          noPublicKeyDiv.show();
        }
        publicKeyWrapper.show();
      }


      var adr = new NxtAddress();
      adr.set(account.tx_account_id);

      if (account.firstAccount) {
        var labelClass = 'success';
      } else {
        var labelClass = 'default';
      }

      var label = '<span class="label label-' + labelClass + ' edit-label" ' +
        'data-name="tx_label" data-type="text" data-pk="' + account.id_account + '" data-url="api/0.1/user/account" data-title="Enter label"' +
        'style="margin-left: 10px; padding-bottom: .2em;">' +
        account.tx_label +
        '</span>';
      var div = $(".own_account_rs");
      div.text(adr.toString(true));
      var labelDiv = $("#accountLabel");
      labelDiv.html(label);

      $("#own_account_id").text(adr.account_id());
      $("#detailsLink").html('<a target="_blank" href="http://www.MyXEL.info/blockexplorer/details.php?action=ac&ac=' + adr.account_id() + '">' +
        'Account details <i class="glyphicon glyphicon-new-window"></i></a>');

      labelDiv.find('.edit-label').editable({
        emptytext: '- No label -',
        defaultValue: '',
        success: function (response) {
          if (response.status == 'error') return response.message;
        }
      });

    });
  };

  $("#refresh").on('click', function () {
    MyXEL.refreshBalance();
    MyXEL.getTransactionHistory();
  });

  MyXEL.refreshBalance = function () {

    $("#balance").html('<img src="./img/ajax-loader_small.gif">');
    $("#balance_additional").hide()

    $.post("/get_balance.php", { i: MyXEL.mainAccount }, function (data) {
      var data_clean = data;
      if (data_clean != 'error') {
        data_arr = data_clean.split(":");
        $('#balance').html(data_arr[0]);
        $('#balance_additional').html(data_arr[1] + ' BTC (USD ' + data_arr[2] + ')').show()
      } else {
        $('#balance').html('-');
        $('#balance_additional').html('Error fetching balance, please try again').show()
      }
    });
  };

  MyXEL.getEncryptedWallet = function (callback) {
    $.get("api/0.1/user/wallet", function (result) {
      if (result.status == "success") {
        MyXEL.encryptedWallet = result.data.wallet;
        MyXEL.salt = result.data.salt;
        MyXEL.walletVersion = result.data.version;
      }
      callback(result);
    });
  };

  MyXEL.storeWallet = function (callback) {

    var wallet = MyXEL.decryptedWallet;

    for (var i = 0; i < wallet.accounts.length; i++) {
      var account = wallet.accounts[i];

      if (account.password == "") callback(false);
    }

    $.post('api/0.1/user/wallet', { wallet: MyXEL.encryptedWallet, salt: MyXEL.salt }, function (result) {
      callback(result);
    });
  };

  return MyXEL;
}(MyXEL || {}, jQuery));

$(document).ready(function () {
  $("#save").click(function () {
    $("#frmSettings").submit();
  });

  try {
    $.fn.editable.defaults.mode = 'popup';
  } catch (e) {

  }

  $(".own_account_rs, .publicKey, #accountNumeric").on('click', function () {
    $(this).selectText();
  });

  $('.popover_show').popover({
    trigger: 'click'
  });

  $('.tooltip_show').tooltip();
});