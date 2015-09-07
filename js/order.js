(function () {
    $('#ORDER_TRACKING')
        // Password validation.
        .on('blur', '.HAVE_ACCOUNT [type="password"]', function () {
            EPAM.validation.password($(this).val());
            if (EPAM.validation.err_msg.length > 0) {
                $('.have.error_msg').html(EPAM.validation.err_msg);
            } else {
                $('.have.error_msg').html('');
            }
        })
        .on('blur', '.DONT_HAVE_ACCOUNT [type="password"]', function () {
            EPAM.validation.password($(this).val());
            if (EPAM.validation.err_msg.length > 0) {
                $('.dont_have.error_msg').html(EPAM.validation.err_msg);
            } else {
                $('.dont_have.error_msg').html('');
            }
        })
        .on('click', 'input', function (event) {
            EPAM.sportShop.utils.preStop(event);
        })
        .on('click', '[value="VIEW MY ORDERS"]', function () {
            if ($('#orderEmail1').val() === '') {
                $('#orderEmail1')[0].focus();
                $('.have.error_msg').html('Input email please.');
                return;
            }
            if ($('#orderPassword1').val() === '') {
                $('#orderPassword1')[0].focus();
                $('.have.error_msg').html('Input password please.');
            }
        })
        .on('click', '[value="VIEW MY ORDER"]', function () {
            if ($('#orderEmail2').val() === '') {
                $('#orderEmail2')[0].focus();
                $('.dont_have.error_msg').html('Input email please.');
                return;
            }
            if ($('#orderPassword2').val() === '') {
                $('#orderPassword2')[0].focus();
                $('.dont_have.error_msg').html('Input password please.');
            }
        });
}());
