<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <meta name="description" content="XEL Alerts" />
  <meta name="keywords" content="xel,bitcoin" />
  <meta name="robots" content="INDEX, FOLLOW" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <title>Frequently Asked Questions</title>
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
  <link href="https://fonts.googleapis.com/css?family=Corben:bold" rel="stylesheet" type="text/css" />
  <link href="https://fonts.googleapis.com/css?family=Nobile" rel="stylesheet" type="text/css" />
  <script src="js/dependencies/3rdparty/jquery-1.11.1.min.js"></script>
  <script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
  <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.js"></script>
  <link rel="stylesheet" href="css/MyXEL3.css" />
</head>
<body>
  <nav class="navbar navbar-default nxt_header" role="navigation">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#top-menu"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="//www.MyXEL.info/index.php" target="_blank"><strong><span style="color:#f9f9f9"><em>my</em>NXT</span><span style="color:#F00">.</span><span style="color:#F90">info</span></strong></a>
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
              <a href="//www.MyXEL.info/blockexplorer/" target="_blank">Overview</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="//www.MyXEL.info/blockexplorer/assets.php" target="_blank">Assets</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/blockexplorer/goods.php" target="_blank">Goods</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="//www.MyXEL.info/blockexplorer/blocks.php" target="_blank">Blocks</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/blockexplorer/transactions.php" target="_blank">Transactions</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/blockexplorer/aliases.php" target="_blank">Aliases</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/blockexplorer/accounts.php" target="_blank">Accounts</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li>
              <a href="//www.MyXEL.info/alerts.php" target="_blank">Alerter</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/forging_calculator.php" target="_blank">Forging Calculator</a>
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
              <a href="//www.MyXEL.info/charts/number_of_accounts.php" target="_blank">Nxt Accounts</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/charts/transactions_per_day.php" target="_blank">Transactions</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/charts/transaction_volume_per_day.php" target="_blank">Transaction volume</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/charts/fees_per_day.php" target="_blank">Fees</a>
            </li>
            <li>
              <a href="//www.MyXEL.info/charts/trades_asset_exchange_per_day.php" target="_blank">Asset Exchange</a>
            </li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-right" id="navbar-search" name="search" role="search" action="//www.MyXEL.info/blockexplorer/search.php" method="post">
        <div class="input-group">
          <span class="input-group-addon"><span class="glyphicon glyphicon-search" id="search-indicator" aria-hidden="false"></span></span> <input type="text" name="tx_search" id="input-search" class="form-control" placeholder="Quick search..." autocomplete="off" spellcheck="false" />
        </div>
        <ul class="dropdown-menu" id="search-container"></ul>
      </form>
    </div>
  </nav>
  <div class="bs-header" id="content">
    <div class="container">
      <h2><strong>Security</strong><br />
      <small>A word about security in MyXEL</small></h2>
    </div>
  </div>
  <div class="container">
    <p>MyXEL.info takes security seriously. We aim to ensure that your NXT are at least as safe as if you were accessing them through a downloadable client &#8211; with the added convenience that you can log in to check your balance and make transactions from anywhere.</p>
    <p><strong>Separate login and wallet passwords</strong></p>
    <p>Firstly, MyXEL.info uses two separate passwords. When you first create your account, you&#8217;ll be prompted for your login password. This is the one you will use to access the website and view your balance.</p>
    <p>You will also be asked for a second password. This is used, along with a further source of entropy (moving the mouse and pressing random keys) to create a master password that will be used to encrypt your wallet. This master password is required to make any transactions from your wallet.</p>
    <p><strong>Client-side decryption</strong></p>
    <p>Using these two passwords, your wallet is encrypted twice using state-of-the-art AES-256 encryption &#8211; used as standard by US and Canadian governments (amongst others) for protecting sensitive data.</p>
    <p>Unlike other wallets, decryption happens client-side rather than server-side. This means that MyXEL.info can never gain access to your wallet funds. The only way to make a transaction is by decrypting the wallet, and your master password is required for that. You should be the only person who knows the password, and client-side decryption means that we can never learn that information. All wallets are encrypted a second time using a site-wide encryption key, providing an extra layer of security from our side.</p>
    <p><strong>Email notifications</strong></p>
    <p>In addition to these security measures, you will receive email notifications of any activity from your account &#8211; so you will know immediately if anyone has accessed the site on your behalf.</p>
    <p><strong>A note about security</strong></p>
    <p>MyXEL.info has taken every possible measure to safeguard your NXT, but no online service can ever claim to be 100 percent secure. Users should always take their own precautions to avoid loss or theft:</p>
    <ul>
      <li>Never reuse your MyXEL passwords for any other site or application.</li>
      <li>Write your passwords down and keep them in a safe place if you need to, but never in a plain text file &#8211; encrypt them and/or keep them on an offline computer or USB drive.</li>
      <li>Use several different wallets (using online accounts and a downloadable client) if you have a lot of NXT.</li>
      <li>Consider creating a cold storage account, where the password is never entered into an online computer.</li>
    </ul>
  </div>
  <div class="spacer">
    &nbsp;
  </div>
  <div id="footer" class="row nxtfooter">
    <div class="container">
      <div class="col-md-12" style="text-align:center">
        <ul>
          <li>
            <a href="http://www.MyXEL.info/about_us.php" target="_blank">About us</a>
          </li>
          <li>
            <a href="/docs" target="_blank">Developers</a>
          </li>
          <li>
            <a href="how_it_works.php">How it works</a>
          </li>
          <li>
            <a href="faq.php">F.A.Q.</a>
          </li>
          <li>
            <a href="security.php">Security</a>
          </li>
          <li>
            <a href="https://nxtforum.org/MyXEL-info/" target="_blank">Forum</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <script type="text/javascript">
  //<![CDATA[
    $(document).ready(function() {

    });
  //]]>
  </script>
</body>
</html>
