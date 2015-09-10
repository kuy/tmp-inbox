import angular from 'angular';

angular.module('inboxApp', []);

class InboxRootController {
  constructor() {
  }
}

angular.module('inboxApp').directive('inboxRoot', function () {
  return {
    restrict: 'E',
    replace: true, // DEPRECATED
    template: $('#inbox-root').html()
  };
});

class AccountListController {
  constructor() {
    this.accounts = ['yuki.kodama@gmail.com', 'kodama@jvr.jp', 'endflow.net@gmail.com'];
  }
}

angular.module('inboxApp').directive('accountList', function () {
  return {
    restrict: 'E',
    replace: true, // DEPRECATED
    template: $('#inbox-account-list').html(),
    bindToController: { accounts: '=' },
    controller: AccountListController,
    controllerAs: 'accountList'
  };
});

class MessageListController {
  constructor() {
    this.messages = ['ABC', 'HOGE\nFOO\nBAR'];
  }
}

angular.module('inboxApp').directive('messageList', function () {
  return {
    restrict: 'E',
    replace: true, // DEPRECATED
    template: $('#inbox-message-list').html(),
    bindToController: { messages: '=' },
    controller: MessageListController,
    controllerAs: 'messageList'
  };
});
