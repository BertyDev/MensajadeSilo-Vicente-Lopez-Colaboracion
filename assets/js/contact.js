$(document).ready(function () {

    (function ($) {
        "use strict";


        jQuery.validator.addMethod('answercheck', function (value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "type the correct answer -_-");

        // validate contactForm form
        $(function () {
            $('#contactForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    subject: {
                        required: true,
                        minlength: 4
                    },
                    // number: {
                    //     required: true,
                    //     minlength: 5
                    // },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },
                messages: {
                    name: {
                        required: "tienes un nombre no?",
                        minlength: "Al menos tiene que tener 2 letras"
                    },
                    subject: {
                        required: "Vamos tienes que tener un tema?",
                        minlength: "Al menos tiene que tener 4 letras"
                    },
                    // number: {
                    //     required: "come on, you have a number, don't you?",
                    //     minlength: "your Number must consist of at least 5 characters"
                    // },
                    email: {
                        required: "Sin correo no se envia el mensaje"
                    },
                    message: {
                        required: "um...Si, tienes que escribir algo para que se envie",
                        minlength: "Eso es todo? de enserio? minimo 10 caracteres"
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "contact_process.php",
                        success: function () {
                            $('#contactForm :input').attr('disabled', 'disabled');
                            $('#contactForm').fadeTo("slow", 1, function () {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor', 'default');
                                $('#success').fadeIn()
                                $('.modal').modal('hide');
                                $('#success').modal('show');
                            })
                        },
                        error: function () {
                            $('#contactForm').fadeTo("slow", 1, function () {
                                $('#error').fadeIn()
                                $('.modal').modal('hide');
                                $('#error').modal('show');
                            })
                        }
                    })
                }
            })
        })

    })(jQuery)
})