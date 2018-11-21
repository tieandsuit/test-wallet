var MyXEL = (function (MyXEL, $) {
  base64.settings.char62 = "+";
  base64.settings.char63 = "/";
  base64.settings.pad = "=";
  base64.settings.ascii = true;

  MyXEL.generateIV = function () {
    var iv = sjcl.random.randomWords(3, 8);
    iv = sjcl.codec.base64.fromBits(iv);
    iv = MyXEL.strtr(iv, '+/=', '-_,');

    return iv;
  };

  MyXEL.generateSalt = function () {
    var salt = sjcl.random.randomWords(4, 8);
    salt = sjcl.codec.base64.fromBits(salt);
    salt = MyXEL.strtr(salt, '+/=', '-_,');

    return salt;
  };

  MyXEL.generateSecretPhrase = function () {
    var secretPhrase = sjcl.random.randomWords(14, 8);
    secretPhrase = sjcl.bitArray.clamp(secretPhrase, 400);
    secretPhrase = sjcl.codec.base64.fromBits(secretPhrase);
    secretPhrase = MyXEL.strtr(secretPhrase, '+/=', '-_,');

    return secretPhrase;
  };

  MyXEL.decryptOldWallet = function (masterPassword) {
    var user_key = asmCrypto.PBKDF2_HMAC_SHA256.hex(masterPassword, MyXEL.salt, 1499, 32);
    user_key = MyXEL.pack("H*", user_key);

    var secretPhrase = MyXEL.strtr(MyXEL.encryptedWallet, '-_,', '+/=');
    secretPhrase = base64.decode(secretPhrase);
    secretPhrase = mcrypt.Decrypt(secretPhrase, null, user_key, "rijndael-128", 'ecb');

    MyXEL.decryptedWallet = MyXEL.unpad(secretPhrase);
    return MyXEL.decryptedWallet;
  };

  MyXEL.decryptWallet = function (masterPassword) {
    try {
      var key = asmCrypto.PBKDF2_HMAC_SHA256.hex(masterPassword, MyXEL.salt, 1499, 32);
      key = MyXEL.pack("H*", key);

      var iv = MyXEL.encryptedWallet.substr(0, 16);

      var decryptedWallet = MyXEL.encryptedWallet.substr(16);
      decryptedWallet = MyXEL.strtr(decryptedWallet, '-_,', '+/=');
      decryptedWallet = base64.decode(decryptedWallet);
      decryptedWallet = mcrypt.Decrypt(decryptedWallet, iv, key, "rijndael-128", 'cbc');
      decryptedWallet = MyXEL.unpad(decryptedWallet);
      decryptedWallet = JSON.parse(decryptedWallet);

      MyXEL.decryptedWallet = decryptedWallet;

      console.log(decryptedWallet);

      return MyXEL.decryptedWallet;
    } catch (e) {
      return false;
    }
  };

  MyXEL.convertOldWalletToNew = function (masterPassword) {
    if (!MyXEL.decryptedWallet) return;

    MyXEL.decryptedWallet = {
      "user_id": "1",
      "version": "2",
      "accounts": [
        {
          "id": nxtCrypto.getAccountId(MyXEL.decryptedWallet),
          "password": MyXEL.decryptedWallet
        }
      ]
    };

    MyXEL.walletVersion = 2;

    return MyXEL.encryptWallet(masterPassword);
  };

  MyXEL.encryptWallet = function (masterPassword) {
    var wallet = MyXEL.decryptedWallet;

    for (var i = 0; i < wallet.accounts.length; i++) {
      var account = wallet.accounts[i];

      if (account.password == "") return;
    }

    wallet = JSON.stringify(wallet);

    var key = asmCrypto.PBKDF2_HMAC_SHA256.hex(masterPassword, MyXEL.salt, 1499, 32);
    key = MyXEL.pack("H*", key);

    var iv = MyXEL.generateIV();

    var encryptedWallet = mcrypt.Encrypt(wallet, iv, key, "rijndael-128", 'cbc');

    MyXEL.encryptedWallet = iv + MyXEL.strtr(base64.encode(encryptedWallet), '+/=', '-_,');

    MyXEL.decryptWallet(masterPassword);

    return MyXEL.encryptedWallet;
  };

  MyXEL.generateWallet = function (masterPassword) {
    var secretPhrase = sjcl.random.randomWords(14, 8);
    secretPhrase = sjcl.bitArray.clamp(secretPhrase, 400);
    secretPhrase = sjcl.codec.base64.fromBits(secretPhrase);

    var salt = sjcl.random.randomWords(4, 8);
    salt = sjcl.codec.base64.fromBits(salt);

    secretPhrase = MyXEL.strtr(secretPhrase, '+/=', '-_,');
    salt = MyXEL.strtr(salt, '+/=', '-_,');

    var accountId = nxtCrypto.getAccountId(secretPhrase);

    var wallet = {
      "user_id": "1",
      "version": "2",
      "accounts": [
        {
          "id": accountId,
          "password": secretPhrase
        }
      ]
    };

    MyXEL.decryptedWallet = wallet;
    MyXEL.salt = salt;
    MyXEL.mainAccount = accountId;

    return MyXEL.encryptWallet(masterPassword);
  };

  MyXEL.unpad = function (data) {
    data = CryptoJS.enc.Utf8.parse(data);
    // Shortcut
    var dataWords = data.words;

    // Unpad
    var i = data.sigBytes - 1;
    while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
      i--;
    }
    data.sigBytes = i + 1;

    return CryptoJS.enc.Utf8.stringify(data);
  };

  MyXEL.encryptMessage = function (plaintext, options) {
    if (!window.crypto && !window.msCrypto) {
      throw "This browser doesn't have encryption support.";
    }

    if (!options.sharedKey) {
      options.sharedKey = MyXEL.getSharedKey(options.privateKey, options.publicKey);
    }

    var compressedPlaintext = pako.gzip(new Uint8Array(plaintext));

    options.nonce = new Uint8Array(32);

    if (window.crypto) {
      window.crypto.getRandomValues(options.nonce);
    } else {
      window.msCrypto.getRandomValues(options.nonce);
    }

    var data = MyXEL.aesEncrypt(compressedPlaintext, options);

    return {
      "nonce": converters.byteArrayToHexString(options.nonce),
      "message": converters.byteArrayToHexString(data)
    };
  };

  MyXEL.aesEncrypt = function (plaintext, options) {
    if (!window.crypto && !window.msCrypto) {
      throw "This browser doesn't have encryption support.";
    }

    var text = converters.byteArrayToWordArray(plaintext);

    if (!options.sharedKey) {
      var sharedKey = MyXEL.getSharedKey(options.privateKey, options.publicKey);
    } else {
      var sharedKey = options.sharedKey.slice(0); //clone
    }

    console.log(sharedKey);

    for (var i = 0; i < 32; i++) {
      sharedKey[i] ^= options.nonce[i];
    }

    var key = CryptoJS.SHA256(converters.byteArrayToWordArray(sharedKey));

    var tmp = new Uint8Array(16);

    if (window.crypto) {
      window.crypto.getRandomValues(tmp);
    } else {
      window.msCrypto.getRandomValues(tmp);
    }

    var iv = converters.byteArrayToWordArray(tmp);
    var encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv
    });

    var ivOut = converters.wordArrayToByteArray(encrypted.iv);

    var ciphertextOut = converters.wordArrayToByteArray(encrypted.ciphertext);

    return ivOut.concat(ciphertextOut);
  };

  MyXEL.getPrivateKey = function (secretPhrase) {
    SHA256_init();
    SHA256_write(converters.stringToByteArray(secretPhrase));
    return converters.shortArrayToHexString(curve25519_clamp(converters.byteArrayToShortArray(SHA256_finalize())));
  };

  MyXEL.getSharedKey = function(key1, key2) {
    return converters.shortArrayToByteArray(curve25519_(converters.byteArrayToShortArray(key1), converters.byteArrayToShortArray(key2), null));
  };

  return MyXEL;
}(MyXEL || {}, jQuery));