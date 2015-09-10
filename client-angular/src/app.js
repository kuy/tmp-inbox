import angular from 'angular';

angular.module('inboxApp', []);

class InboxApi {
  constructor($http) {
    this.$http = $http;
    this.base = 'http://localhost:4567/api';
  }

  accounts() {
    return this.$http.get(`${this.base}/accounts`)
      .then(function (response) {
        return response.data.data;
      });
  }

  messages(account) {
    return this.$http.get(`${this.base}/accounts/${account}/messages`)
      .then(function (response) {
        return response.data.data;
      });
  }
}

angular.module('inboxApp').service('inboxApi', ['$http', InboxApi]);

angular.module('inboxApp').directive('inboxRoot', function () {
  return {
    restrict: 'E',
    replace: true, // DEPRECATED
    template: $('#inbox-root').html()
  };
});

class AccountListController {
  constructor($scope, inboxApi) {
    this.$scope = $scope;
    this.api = inboxApi;
    this.accounts = [];

    this.load();
  }

  load() {
    var self = this;
    this.api.accounts().then(function (data) {
      self.accounts = data.accounts;
    });
  }

  handleSelect(account) {
    this.$scope.$parent.$emit('account:changed', account);
  }
}

angular.module('inboxApp').directive('accountList', function () {
  return {
    restrict: 'E',
    replace: true, // DEPRECATED
    template: $('#inbox-account-list').html(),
    scope: {},
    controller: AccountListController,
    controllerAs: 'accountList'
  };
});

class MessageListController {
  constructor($scope, inboxApi) {
    this.api = inboxApi;
    this.messages = [];

    var self = this;
    $scope.$parent.$on('account:changed', function (ev, account) {
      self.load(account)
    });
  }

  load(account) {
    var self = this;
    this.api.messages(account).then(function (data) {
      self.messages = data.messages;
    });
  }
}

angular.module('inboxApp').directive('messageList', function () {
  return {
    restrict: 'E',
    replace: true, // DEPRECATED
    template: $('#inbox-message-list').html(),
    scope: {},
    controller: MessageListController,
    controllerAs: 'messageList'
  };
});
