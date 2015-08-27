window.React = React = require 'react'
Redux = require 'redux'
$ = jQuery

window.TempmailerStore = TempmailerStore = Flux.createStore

  scheme: {
    accounts: {
      default: []
    },
    selected: {
      default: null
    },
    emails: {
      default: []
    },
  }

  actions: {
    'account:select': 'selectAccount',
    'account:load': 'loadAccounts',
    'email:load': 'loadEmails',
  }

  selectAccount: (account) ->
    console.log "store: selectAccount: #{account}"
    @set 'selected', account

    do TempmailerActionCreator.loadEmails

  loadAccounts: ->
    console.log 'store: loadAccounts'

    $.ajax {
      method: 'GET',
      url: '/api/accounts',
      success: (payload) =>
        console.log "store: loadAccounts: loaded"
        @set 'accounts', payload.split("\n")
    }

  loadEmails: ->
    console.log "store: loadEmails: #{@state.selected}"

    $.ajax {
      method: 'GET',
      url: '/api/emails',
      data: {
        account: @state.selected
      },
      success: (data) =>
        console.log "store: loadEmails: loaded"
        @set 'emails', data.data
    }

AccountList = React.createClass

  handleClick: (e) ->
    console.log e.target
    do e.preventDefault
    TempmailerActionCreator.selectAccount e.target.innerText

  render: ->
    <div className="pure-menu account-list pure-u-1-5">
      <span className="pure-menu-heading">Accounts</span>
      <ul className="pure-menu-list">
        {@props.accounts.map (account) =>
          <li className="pure-menu-item" key={account}>
            <a href="#account" className="pure-menu-link" onClick={@handleClick}>{account}</a>
          </li>
        }
      </ul>
    </div>

EmailList = React.createClass

  render: ->
    <div className="pure-u-4-5">
      {@props.emails.map (email) ->
        <div>
          <pre>{email}</pre>
          <hr />
        </div>
      }
    </div>

TmpInboxApp = React.createClass

  render: ->
    <div className="pure-g">
      <AccountList accounts={store.accounts} selected={store.selected} />
      <EmailList emails={store.emails} />
    </div>

window.store = store = configureStore()

Root = React.createClass

  render: ->
    <Provider store={store}>
      {() => <TmpInboxApp />}
    </Provider>

$(document).ready ->
  window.mainView = React.render <Root />,
    document.getElementById('tmp-inbox-root')
