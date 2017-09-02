<!DOCTYPE html>
<html>
  <head>
    <title>CoinGraph</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Just for basic styling. -->
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <div id="contents">
      <div class="row">
        <div class="col-md-6">
          <div id="btc-graph">
            <h4>Loading...</h4>
          </div>
          <!--<iframe src="https://price.bitcoin.com/" style="width: 100%; min-height: 300px; height: auto; border: 1px solid rgb(204, 204, 204); border-radius: 5px; padding: 0px; margin-top: 20px;"></iframe>-->
        </div>
        <div class="col-md-6">
          <div id="btc-data">
            <div class="row r1">
              <div class="col-md-6">
                <div class="data" id="btc-value"></div>
              </div>
              <div class="col-md-6">
                <div class="data blue" id="btc-average"></div>
              </div>
            </div>
            <div class="row r2">
              <div class="col-md-6">
                <div class="data" id="btc-percentage"></div>
              </div>
              <div class="col-md-6">
                <div class="controls border-blue">
                  <div class="row">
                    <div class="col-md-12">
                      <h4>Data Controls</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="btn-group">
                        <button type="button" name="btc-to-usd" id="btc-to-usd" class="btn btn-default"><i class="fa fa-usd" aria-hidden="true"></i></button>
                        <button type="button" name="btc-to-eur" id="btc-to-eur" class="btn btn-default"><i class="fa fa-eur" aria-hidden="true"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row r1">
        <div class="col-md-6">
          <div id="eth-graph">
            <h4>Loading...</h4>
          </div>
        </div>
        <div class="col-md-6">
          <div id="eth-data">
            <div class="row">
              <div class="col-md-6">
                <div class="data" id="eth-value"></div>
              </div>
              <div class="col-md-6">
                <div class="data blue" id="eth-average"></div>
              </div>
            </div>
            <div class="row r2">
              <div class="col-md-6">
                <div class="data" id="eth-percentage"></div>
              </div>
              <div class="col-md-6">
                <div class="controls border-blue">
                  <div class="row">
                    <div class="col-md-12">
                      <h4>Data Controls</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="btn-group">
                        <button type="button" name="eth-to-usd" id="eth-to-usd" class="btn btn-default"><i class="fa fa-usd" aria-hidden="true"></i></button>
                        <button type="button" name="eth-to-eur" id="eth-to-eur" class="btn btn-default"><i class="fa fa-eur" aria-hidden="true"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <!-- React -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
    <!-- React plugins -->
    <script src="https://unpkg.com/react@0.14.0/dist/react-with-addons.js"></script>
    <!-- Charts -->
    <script src="https://npmcdn.com/recharts@0.22.0/umd/Recharts.min.js"></script>
    <!-- Main React Code -->
    <script type="text/babel" src="main.js"></script>
  </body>
</html>
