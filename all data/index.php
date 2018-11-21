<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' *.google-analytics.com *.gstatic.com *.google.com;">
  <base href="/">
  <title>MyNXT - NXT Online Wallet Evolved</title>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body>
  <div class="row" id="first">
    <div class='alert alert-danger errormessage alert-dismissable' style="display: none;">
      <button type="button" class="close"><span aria-hidden="true">×</span></button>
      <p></p>
    </div>
    <div class="row" id="header">
      <div class="container">
        <div class="col-sm-3">
          <br>
          <img src="images/logo.png" class="img-responsive" alt=""><br>
        </div>
        <div class="col-sm-5" style="z-index:999">
          <div class="navbar navbar-default hidden-sm hidden-xs" role="navigation">
            <div>
              <ul class="nav navbar-nav">
                <li>
                  <a href="/faq.php">FAQ</a>
                </li>
                <li>
                  <a href="https://www.mynxt.info">Block Explorer</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <form role="form" name="frmLogin" id="frmLogin" action="javascript:void()" method="post">
            <input type="hidden" name="csrfToken" value="n9wc8i0+CkQeTCE2Ny3z6BDUgQEGGKRYinIDzOae3W4=">
            <div class="alert alert-danger msg_error" style="display:none"></div>
            <table class="logintable">
              <tr>
                <td><input type="text" name="tx_email" id="tx_email" placeholder="Email" style="color: white" value="" maxlength="150"></td>
                <td><input type="password" id="tx_login_password" name="tx_login_password" placeholder="....." style="color: white"></td>
                <td><button type="button" class="btn btn-danger ladda-button btn-sm" data-size="xs" data-style="zoom-out" id="login"><span class="ladda-label">Login</span></button></td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
    <div class="main1">
      <div class="row" id="onlinewallet">
        <form name="frmRegister" id="frmRegister" action="#">
          <input type="hidden" id="action" name="action" value="register">
          <h1 class="h45 tac" style="text-transform: uppercase; color: white; font-size: 3em; position:relative;">Online wallet evolved</h1>
          <p class="45" style="color: white; text-align: center; position:relative;">Take control of your funds with our free online and open-source NXT wallet</p><br>
          <div class="col-sm-offset-2 col-sm-8" id="cta">
            <div id="main_registration">
              <div class="alert alert-danger msg_error" style="display:none"></div>
              <div class="col-sm-3">
                <input name="tx_email" type="email" id="register_tx_email" size="21" maxlength="150" class="form-control" placeholder="Enter Your Email">
              </div>
              <div class="col-sm-3">
                <div class="form-group">
                  <input name="tx_login_password" type="password" id="register_tx_login_password" class="form-control" autocomplete="off" value="" placeholder="Choose a login password">
                </div>
              </div>
              <div class="col-sm-3">
                <input name="tx_login_password2" type="password" id="register_tx_login_password2" value="" class="form-control" autocomplete="off" placeholder="Confirm Password">
              </div>
              <div class="col-sm-3">
                <button type="button" class="btn btn-danger ladda-button btn-lg" data-size="xs" data-style="zoom-out" id="createWallet"><span class="ladda-label">Create your free wallet</span></button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="row">
      <p class="scrolldown h45 tac" style="position:relative;">Scroll Down</p><img src="images/scroll.png" class="img-responsive" style="padding-bottom: 5px; position:relative;"></div>
    </div>
  </div>
  <div class="row" id="secure">
    <div class="container">
      <h1 class="h35 tac" style="color: #cc0407">Secure, Convenient and Customizable</h1>
      <p class="h45 tac" style="color: black">On-blockchain trustless online NXT wallet - you own your account!</p><br>
      <br>
      <div class="row">
        <div class="col-sm-4">
          <img src="images/imac.png" class="img-responsive" alt=""><br>
        </div>
        <div class="col-sm-offset-1 col-sm-5">
          <div class="row">
            <div class="col-sm-3"><img src="images/i1.png" class="img-responsive" alt=""></div>
            <div class="col-sm-9">
              <p class="h45 ititle">Secure</p>
              <p class="h45">All wallet are encrypted client-side with state of the art AES-256 encryption, and can only be decrypted by you using your master password</p>
            </div>
          </div><br>
          <br>
          <div class="row">
            <div class="col-sm-3"><img src="images/i2.png" class="img-responsive" alt=""></div>
            <div class="col-sm-9">
              <p class="h45 ititle">Convenient</p>
              <p class="h45">Access your NXT from any device anywhere. No blockchain downloads, no wallet installation, no hassle.</p>
            </div>
          </div><br>
          <br>
          <div class="row">
            <div class="col-sm-3"><img src="images/i3.png" class="img-responsive" alt=""></div>
            <div class="col-sm-9">
              <p class="h45 ititle">Customizable</p>
              <p class="h45">Our unique plugin system allows you to expand the functionality of your NXT wallet, making it truly a crypto 2.0 system.</p>
            </div>
          </div><br>
          <br>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="howitworks">
    <div class="container">
      <div class="row">
        <div class="col-sm-offset-2 col-sm-8">
          <h1 class="h35 tac">How it Works</h1><br>
          <p class="h45 tac">MyNXT.info gives you the security of a downloadable client with the convenience of a web wallet. Users own their wallets, but do not have to download the blockchain or any other software! At no point does MyNXT have access to your funds.</p><br>
          <br>
          <div class="row" id="hiw">
            <div class="row">
              <div class="col-sm-4">
                <img src="images/h1.png" class="img-responsive" alt=""><br>
                <p class="h45 htitle">REGISTRATION</p>
                <p class="h45 htext">When you register, you'll create a login password. You will use this password for logging into MyNXT.info</p>
              </div>
              <div class="col-sm-4">
                <img src="images/h2.png" class="img-responsive" alt=""><br>
                <p class="h45 htitle">CREATE A WALLET</p>
                <p class="h45 htext">You will also create a master password which is used to encrypt and decrypt your wallet. MyNXT.info never receives this password.</p>
              </div>
              <div class="col-sm-4">
                <img src="images/h3.png" class="img-responsive" alt=""><br>
                <p class="h45 htitle">BROWSER ENCRYPTION</p>
                <p class="h45 htext">Your wallet is encrypted and decrypted client-side - that is in your browser - using your master password. MyNXT.info...</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <img src="images/h4.png" class="img-responsive" alt=""><br>
                <p class="h45 htitle">CLOUD<br>
                STORAGE</p>
                <p class="h45 htext">The encrypted details of your NXT wallet are saved in Amazon AWS cloud servers and backed up regularly in multiple locations.</p>
              </div>
              <div class="col-sm-4">
                <img src="images/h5.png" class="img-responsive" alt=""><br>
                <p class="h45 htitle">NO BLOCKCHAIN DOWNLOAD</p>
                <p class="h45 htext">The encrypted details of your NXT wallet are saved in Amazon AWS cloud servers and backed up regularly in multiple locations.</p>
              </div>
              <div class="col-sm-4">
                <img src="images/h6.png" class="img-responsive" alt=""><br>
                <p class="h45 htitle">YOU OWN<br>
                YOUR WALLET</p>
                <p class="h45 htext">Users have full ownership of their wallets. MyNXT.info is simply a gateway to NXT. You can download backups of your...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="download">
    <div class="container">
      <img src="images/mouse.png" class="img-responsive" alt="">
      <div class="row" id="downloaddetails">
        <div class="col-sm-offset-1 col-sm-10">
          <div class="col-sm-6">
            <h1 class="h45 downloadtac" style="margin-bottom: 5px;">Download</h1>
            <h1 class="h45 downloadtac">Our Mobile App Here!</h1><br>
            <p class="h45 downloaddesc">Access your MyNXT funds securely with our mobile app available for Android and iPhone. Check your balance and send/receive funds quicly and easily with the tap of a finger.</p><br>
            <div class="row" id="downloadlink">
              <div class="col-sm-4">
                <br>
                <a href="https://play.google.com/store/apps/details?id=info.mynxt.mobile_wallet" target="_blank"><img src="images/playstore.png" class="img-responsive" alt=""></a>
              </div>
              <div class="col-sm-4">
                <br>
                <a href="https://itunes.apple.com/app/mynxt-wallet/id917423860" target="_blank"><img src="images/appstore.png" class="img-responsive" alt=""></a>
              </div>
              <div class="col-sm-4"><img src="images/barcode.jpg" class="img-responsive" alt=""></div>
            </div><br>
          </div>
          <div class="col-sm-6"><img src="images/hand.png" class="img-responsive" alt=""></div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="pluginsWrapper">
    <br>
    <br>
    <div class="container">
      <div class="col-sm-offset-1 col-sm-10">
        <h1 class="h35 tac">Plugins Enable Crypto 2.0 Features</h1><br>
        <h1 class="h35 tac" style="color: #ff9900">Meet some of our plugins</h1><br>
        <div class="row" id="someplugins">
          <div class="col-sm-3">
            <img src="images/s1.png" alt="" width="125" height="125" class="img-responsive"><br>
            <p class="h45 ptilte">NXT Assets</p>
            <hr class="phr">
            <p class="h55 pdesc">Buy, sell, view, search and transfer NXT assets. See your open orders, cancel orders and easily view your total asset value<br></p>
          </div>
          <div class="col-sm-3">
            <img src="images/s3.png" alt="" width="126" height="125" class="img-responsive"><br>
            <p class="h45 ptilte">Coinimal</p>
            <hr class="phr">
            <p class="h55 pdesc">Buy NXT with your European Bank Account using the 3rd party Coinimal system (www.coinimal.com).<br></p>
          </div>
          <div class="col-sm-3">
            <img src="images/s4.png" alt="" width="124" height="125" class="img-responsive"><br>
            <p class="h45 ptilte">NXT Monetary</p>
            <hr class="phr">
            <p class="h55 pdesc">Exchange or send BTC with NXT using the SuperNET MGW Decentralized Exchange<br></p>
          </div>
          <div class="col-sm-3">
            <img src="images/s5.png" alt="" width="126" height="125" class="img-responsive"><br>
            <p class="h45 ptilte">NXT Full Client</p>
            <hr class="phr">
            <p class="h55 pdesc">Use the official NXT Full Client (a.k.a. NRS) drectly from your MyNXT Wallet.<br></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="questions">
    <div class="container">
      <h1 class="h35 tac">HAVE QUESTIONS?</h1><br>
      <p class="h45">We run a forum in the nxtforum.org website, where you can ask any question and interact with other mynxt.info users. Please come and say hi to us!</p><br>
      <form action="https://nxtforum.org/mynxt-info/" target="_blank">
        <input type="submit" class="forumbutton h45" value="Go to The Forum">
      </form><br>
      <p class="h45" style="font-size: 18px">Need a direct line? Email us at mynxt@supernet.org</p><br>
      <a href="https://github.com/mynxt-info/wallet" class="h45 replink" target="_blank">Visit our public repository</a><br>
      <br>
      <br>
      <br>
      <img src="images/mouse.png" class="img-responsive" alt=""><br>
    </div>
  </div>
  <div class="row" id="clients">
    <div class="container">
      <div class="col-sm-offset-2 col-sm-8">
        <br>
        <br>
        <h1 class="h35">On the press...</h1><br>
        <p class="h45">These are some of the recent articles mentioning MyNXT. If you are a member of the press and would like to contact us, please email mynxt@supernet.org.<br>
        <br></p>
        <div class="row">
          <div>
            <strong>Cointelegraph:</strong> <a href="http://cointelegraph.com/news/113156/nxt-wants-developers-to-unleash-apps-via-new-plug-in-store" class="h45 medialink" target="_blank">Nxt Wants Developers to Unleash Apps Via New Plug-in Store</a>
          </div>
          <div>
            <strong>Bitcoin Magazine:</strong> <a href="https://bitcoinmagazine.com/18567/multigateway-the-first-decentralized-crypto-currency-exchange/" class="h45 medialink" target="_blank">Multigateway: The First Decentralized Cryptocurrency Exchange</a><br>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="footer">
    <div class="container">
      <div class="col-sm-offset-1 col-sm-10">
        <div class="col-sm-4">
          <p class="ftitle h45">Quick Links</p><br>
          <div class="col-sm-6" style="padding-left: 0;">
            <a href="https://www.mynxt.info" class="flinks h45">Block Explorer</a><br>
            <a href="http://www.mynxt.info/charts/" class="flinks h45">Charts</a><br>
          </div>
          <div class="col-sm-6" style="padding-left: 0;">
            <a href="https://www.mynxt.info/about_us.php" class="flinks h45">About us</a><br>
            <a href="/docs" class="flinks h45">Developers</a><br>
            <a href="/faq.php" class="flinks h45">F.A.Q.</a><br>
            <a href="https://nxtforum.org/mynxt-info/" class="flinks h45">Forum</a><br>
          </div>
        </div>
        <div class="col-sm-3">
          <p class="ftitle h45">Contact Us</p><br>
          <div class="row">
            <div class="col-xs-2" style="padding: 0;"><img src="images/map.png" class="img-responsive" style="padding-top: 9px;"></div>
            <div class="col-xs-10">
              <p class="h45 ftext" style="line-height: 1.5em;">MyNXT by Evolufy Ltd<br>
              Made in the UK</p>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-2" style="padding: 0;"><img src="images/mail.png" class="img-responsive" style="padding-top: 9px;"></div>
            <div class="col-xs-10">
              <p class="h45 ftext">mynxt@supernet.org</p>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <p class="ftitle h45">Subscribe to Our Newsletter</p><br>
          <div class="row">
            <form action="//www.mynxt.info/sendy/subscribe" method="post" accept-charset="utf-8" target="_blank">
              <div class="col-sm-8" style="padding: 5px;color:#000;">
                <input type="text" name="email" id="email" class="enteremail" placeholder="Enter Your Email Address Here"> <input type="hidden" name="list" value="XQ1AUMAdM6NhwRNKN4JNWA">
              </div>
              <div class="col-sm-4" style="padding: 5px;">
                <button type="submit" class="subs h45">Subscribe</button>
              </div>
            </form>
          </div><br>
          <div class="row">
            <div class="col-sm-5">
              <table class="sociallinks">
                <tr>
                  <td><img src="images/fb.png" class="img-responsive" alt=""></td>
                  <td><img src="images/twitter.png" class="img-responsive" alt=""></td>
                  <td><img src="images/linkedin.png" class="img-responsive" alt=""></td>
                  <td><img src="images/g+.png" class="img-responsive" alt=""></td>
                </tr>
              </table>
            </div>
            <div class="col-sm-7">
              <br>
              <br>
              <img src="images/flogo.png" class="img-responsive" alt="">
              <p class="h45" id="copyright">© Copyright 2015 Evolufy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="googleAuthenticatorModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="sndModalLabel">Google Authenticator</h4>
        </div>
        <div id="gauth_body_message" class="modal-body" style="display:none"></div>
        <div id="gauth_body_main" class="modal-body">
          <form class="form-horizontal" role="form" action="#">
            <div class="form-group">
              <label for="gauth_user_code" class="col-sm-4 control-label">User code</label>
              <div class="col-sm-7">
                <input name="gauth_user_code" type="text" class="form-control" id="gauth_user_code" value="" maxlength="8" placeholder="Enter your code" autocomplete="off">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-4 col-sm-7">
                <label for="remember-me"><input type="checkbox" id="remember-me"> <small>Remember this computer for 15 days.</small></label>
              </div>
            </div>
          </form>
        </div>
        <div id="gauth_footer_main" class="modal-footer">
          <div class="col-xs-7 loading"></div>
          <div class="col-xs-5">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> <button type="button" class="btn btn-primary ladda-button" data-style="zoom-out" id="verifyGoogleAuthenticator"><span class="ladda-label">Confirm</span></button>
          </div>
        </div>
        <div id="gauth_footer_message" class="modal-footer" style="display:none">
          <div class="col-xs-7 loading"></div>
          <div class="col-xs-5"></div>
        </div>
      </div>
    </div>
  </div>
  <form role="form" name="frmRecover" id="frmRecover" method="post">
    <div class="modal fade" id="recModal" tabindex="-1" role="dialog" aria-labelledby="rgModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button id="close_button" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="rgModalLabel">Recover your login password</h4>
          </div>
          <div id="loading_body_password_reset" class="modal-body" style="display:none">
            <div style="text-align:center;margin-top:50px;"><img src="./img/ajax-loader.gif"></div><br>
            <div style="text-align:center">
              Verifying inputs.... this can take a few seconds.
            </div>
          </div>
          <div id="main_body_password_reset" class="modal-body">
            <div id="msg_error_password_reset" class="alert alert-danger" style="display:none"></div>
            <div id="msg_initial_password_reset" class="well">
              Enter your registered e-mail address to receive password reset instructions
            </div>
            <div class="form-group">
              <label for="tx_email_recover" class="control-label">Enter your registered e-mail address</label> <input name="tx_email_recover" type="text" class="form-control" id="tx_email_recover" value="" maxlength="30" placeholder="Enter your registered e-mail address">
            </div>
          </div>
          <div id="success_body_password_reset" class="modal-body" style="display:none">
            <div class="alert alert-success">
              Instructions sent
            </div>We have sent a instructions on how to reset your password to your e-mail address.<br>
            <br>
            Note: Make sure you check your spam folder.
          </div>
          <div id="main_footer_password_reset" class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> <button type="button" class="btn btn-success ladda-button" data-style="zoom-out" id="forgot_submit"><span class="ladda-label">Send instructions</span></button>
          </div>
          <div id="success_footer_password_reset" class="modal-footer" style="display:none">
            <button type="button" class="btn btn-success" data-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
  </form>
  <div class="modal fade" id="rgModal" tabindex="-1" role="dialog" aria-labelledby="rgModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button id="close_button" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="rgModalLabel">Finish registration</h4>
        </div>
        <div id="loading_body" class="modal-body" style="display:none">
          <div style="text-align:center;margin-top:50px;"><img src="img/ajax-loader.gif"></div><br>
          <div style="text-align:center">
            Verifying inputs.... this can take a few seconds.
          </div>
        </div>
        <div id="main_body" class="modal-body">
          <div class="alert alert-danger msg_error" style="display:none"></div>
          <div id="msg_initial">
            Let's generate a key and choose a master password to encrypt the key.
            <div style="color:#F00">
              <strong>Keep the master password safe, if you lose it you will lose your NXT!</strong> <span style="color:#999" class="tooltip_show glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="bottom" title="We don't store your master password in our servers and you need it to decrypt your wallet. We recommend writing it down on a piece of paper and storing in a safe place" href=""></span>
            </div>
            <hr>
          </div>
          <div class="form-group">
            <label for="tx_master_password">Your master password</label> <input name="tx_master_password" type="password" class="form-control" id="tx_master_password" placeholder="Choose a master password" autocomplete="off" value=""> <small>Minimum 8 characters. Don't re-use this password anywhere else.</small>
          </div>
          <div class="form-group">
            <label for="tx_master_password2">Confirm master password</label> <input name="tx_master_password2" type="password" class="form-control" id="tx_master_password2" value="" placeholder="Re-enter your master password" autocomplete="off">
          </div>
          <div class="form-group alert alert-success" id="key-generation" style="display: none;">
            <label>Key generation</label> <span style="color:#999" class="tooltip_show glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="top" title="We use your mouse movements, key presses and device movements to generate a truly random NXT account key for you"></span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1" style="width: 0%;"></div>
            </div><span class="help-block"><small>Move your mouse, device or press some keys till the progressbar is at 100%</small></span>
          </div>
          <div class="form-group">
            <div class="g-recaptcha" data-sitekey="6Ler7u0SAAAAANwFCXLbssw93I1U3u046KaThn2o"></div>
          </div>
        </div>
        <div id="success_body" class="modal-body" style="display:none">
          <div class="alert alert-success">
            Registration successful
          </div>We have sent a confirmation e-mail to the address you provided. Please click on the confirmation link in the e-mail to validate your account and start using your wallet.<br>
          <br>
          Note: Make sure you check your spam folder.
        </div>
        <div id="main_footer" class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Go back</button> <button type="button" class="btn btn-success disabled ladda-button" data-style="zoom-out" id="register"><span class="ladda-label">Complete my registration</span></button>
        </div>
      </div>
    </div>
  </div>
  <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/plug-ins/725b2a2115b/integration/bootstrap/3/dataTables.bootstrap.css">
  <link rel="stylesheet" href="css/ladda.min.css">
  <script src="dist/MyNXT.js"></script>
</body>
</html>
