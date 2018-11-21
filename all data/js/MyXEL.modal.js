var MyXEL = (function (MyXEL, $) {

  MyXEL.showMessage = function (modal, message) {
    modal = $(modal);

    modal.find('.modal-main').hide();
    modal.find('.modal-body.modal-message').html(message).show();
    modal.find('.modal-footer.modal-message').show();
  };

  return MyXEL;
}(MyXEL || {}, jQuery));