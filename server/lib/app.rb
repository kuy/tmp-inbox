require 'rubygems'
require 'json'
require 'sinatra'

get '/redux' do
  <<-EOF
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="/css/pure.css" />
<link rel="stylesheet" href="/css/app.css" />
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="/js/app-redux.js"></script>
</head>
<body>
<div id="tmp-inbox-root"></div>
</body>
</html>
  EOF
end

get '/angular' do
  <<-EOF
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="/css/pure.css" />
<link rel="stylesheet" href="/css/app.css" />
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="/js/app-angular.js"></script>
</head>
<body ng-app="inboxApp">
<inbox-root></inbox-root>
<div style="display: none">
  <div id="inbox-root">
    <div class="pure-g">
      <account-list></account-list>
    </div>
  </div>
  <div id="inbox-account-list">
    <div class="account-list pure-menu pure-u-1-5">
      <span class="pure-menu-heading">Accounts</span>
      <ul class="pure-menu-list">
        <li class="pure-menu-item" ng-repeat="account in accountList.accounts">
          <a href="#account" class="pure-menu-link">{{account}}</a>
        </li>
      </ul>
    </div>
  </div>
  <div id="inbox-message-list">
    <div>
      <div ng-repeat="message in messages">
        <pre>{{message}}</pre>
        <hr />
      </div>
    </div>
  </div>
</div>
</body>
</html>
  EOF
end

get '/api/accounts' do
  accounts = `ls mails`.strip.split("\n")

  content_type :json
  { data: { accounts: accounts } }.to_json
end

get '/api/accounts/:account/messages' do
  f = open "mails/#{params['account']}", 'r'
  raw_inbox = f.read
  f.close
  # inbox = NKF.nkf '--ic=ISO-2022-JP --oc=UTF-8 -Lw -m', raw_inbox
  inbox = raw_inbox

  current_state = nil
  patterns = [ [ :header, %r{^[\w-]+:\s} ],
               [ :header, %r{^\scharset=} ],
               [ :body, %r{^.*$} ] ]

  body = ''
  messages = []
  inbox.lines do |line|
    patterns.each do |list|
      state = list[0]
      pattern = list[1]
      if pattern.match(line)
        if current_state.nil? || current_state == state || current_state == :header && state == :body
          body += line
        end

        if current_state == :body && state == :header
          messages.unshift body unless body.empty?
          body = line
        end

        current_state = state
        break
      end
    end
  end
  messages.unshift body unless body.empty?

  content_type :json
  { data: { messages: messages, account: params['account'] } }.to_json
end
