<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="description" content="Nextcoin Wallet">
  <meta name="keywords" content="nxt,next,nextcoin,bitcoin">
  <meta name="robots" content="INDEX, FOLLOW">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>Nxt Wallet</title>
  <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Corben:bold" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nobile" rel="stylesheet" type="text/css">
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  <script src="https://code.jquery.com/jquery-1.10.1.min.js"></script>
  <script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
  <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.js"></script>
  <link rel="stylesheet" href="css/mynxt3.css">
</head>
<body>
  <nav class="navbar navbar-default nxt_header" role="navigation">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#top-menu"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="//www.mynxt.info/index.php" target="_blank"><strong><span style="color:#f9f9f9"><em>my</em>NXT</span><span style="color:#F00">.</span><span style="color:#F90">info</span></strong></a>
    </div>
    <div class="collapse navbar-collapse" id="top-menu">
      <ul class="nav navbar-nav">
        <li>
          <a href="/">Online Wallet</a>
        </li>
        <li>
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Block Explorer <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li>
              <a href="//www.mynxt.info/blockexplorer/" target="_blank">Overview</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="//www.mynxt.info/blockexplorer/assets.php" target="_blank">Assets</a>
            </li>
            <li>
              <a href="//www.mynxt.info/blockexplorer/goods.php" target="_blank">Goods</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="//www.mynxt.info/blockexplorer/blocks.php" target="_blank">Blocks</a>
            </li>
            <li>
              <a href="//www.mynxt.info/blockexplorer/transactions.php" target="_blank">Transactions</a>
            </li>
            <li>
              <a href="//www.mynxt.info/blockexplorer/aliases.php" target="_blank">Aliases</a>
            </li>
            <li>
              <a href="//www.mynxt.info/blockexplorer/accounts.php" target="_blank">Accounts</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li>
              <a href="//www.mynxt.info/alerts.php" target="_blank">Alerter</a>
            </li>
            <li>
              <a href="//www.mynxt.info/forging_calculator.php" target="_blank">Forging Calculator</a>
            </li>
            <li>
              <a href="//www.nxtad.net" target="_blank">NXT Ad Network</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Charts <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li>
              <a href="//www.mynxt.info/charts/number_of_accounts.php" target="_blank">Nxt Accounts</a>
            </li>
            <li>
              <a href="//www.mynxt.info/charts/transactions_per_day.php" target="_blank">Transactions</a>
            </li>
            <li>
              <a href="//www.mynxt.info/charts/transaction_volume_per_day.php" target="_blank">Transaction volume</a>
            </li>
            <li>
              <a href="//www.mynxt.info/charts/fees_per_day.php" target="_blank">Fees</a>
            </li>
            <li>
              <a href="//www.mynxt.info/charts/trades_asset_exchange_per_day.php" target="_blank">Asset Exchange</a>
            </li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-right" id="navbar-search" name="search" role="search" action="//www.mynxt.info/blockexplorer/search.php" method="post">
        <div class="input-group">
          <span class="input-group-addon"><span class="glyphicon glyphicon-search" id="search-indicator" aria-hidden="false"></span></span> <input type="text" name="tx_search" id="input-search" class="form-control" placeholder="Quick search..." autocomplete="off" spellcheck="false">
        </div>
        <ul class="dropdown-menu" id="search-container"></ul>
      </form>
    </div>
  </nav>
  <form name="frmRegister" id="frmRegister" action="#">
    <div class="bs-header" id="content">
      <div class="container">
        <h2><strong>Nxt Wallet</strong><br>
        <small>Simple, secure and effective online Nxt wallet.</small></h2>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div id="main_registration" class="col-md-4">
          <div class="page-header nomargin">
            <h3><strong>New User Registration</strong></h3>Fill the form below and click on create my free wallet to proceed. Make sure you take note of the passwords!
          </div><input type="hidden" id="action" name="action" value="register">
          <div class="alert alert-danger msg_error" style="display:none"></div>
          <div class="form-group">
            <label for="tx_email">Your e-mail address</label> <input name="tx_email" type="email" class="form-control" id="tx_email" size="21" maxlength="150" placeholder="E.g. abc@def.com" value="" autocomplete="off"> <span class="help-block"><small>You will use this email to log into your wallet.</small></span>
          </div>
          <div class="form-group">
            <label for="tx_login_password">Login password</label> <input name="tx_login_password" type="password" class="form-control" id="tx_login_password" placeholder="Choose a login password" autocomplete="off" value="" maxlength="20"> <span class="help-block"><small>Minimum 6 characters, maximum 20 chars.</small></span>
          </div>
          <div class="form-group">
            <label for="tx_login_password2" class="control-label">Re-enter your login password</label> <input name="tx_login_password2" type="password" class="form-control" id="tx_login_password2" value="" maxlength="20" placeholder="Re-enter your login password" autocomplete="off"> <span class="help-block"><small>Please confirm your login password</small></span>
          </div>
          <div style="margin-top:20px">
            <button type="button" class="btn btn-primary btn-lg" id="createWallet">Create my free wallet</button>
          </div>
        </div>
        <div class="col-md-5 col-md-offset-1">
          <div class="page-header nomargin">
            <h3><strong>Security is our main concern</strong></h3>
          </div>
          <ul>
            <li>You use two passwords for maximum security</li>
            <li>The Login Password is used to accessing your MyNxt wallet</li>
            <li>The master password is used for decrypting your wallet key in order to send NXT</li><br>
            <br>
            <div class="page-header nomargin">
              <h3><strong>Easy and convenient</strong></h3>
            </div>
            <li>Just create an account and you are set to send and receive NXT</li>
            <li>We send e-mail notifications of any activity in your account</li>
            <li>We will implement new features as NXT evolves</li><br>
            <br>
          </ul>
        </div>
      </div>
    </div>
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
  </form>
</body>
</html>
