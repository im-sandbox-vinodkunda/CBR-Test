$('.closeall').click(function () {
    $('.panel-collapse.in')
      .collapse('hide');
});

$('.openall').click(function () {
    $('.panel-collapse:not(".in")')
      .collapse('show');
});

$(document).ready(function () {
    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    var banks = ['Bank ABC 123', 'Bank DEF 456', 'Bank GHI 789', 'Bank JKL 012', 'Bank MNO 345',
      'Bank PQR 678', 'Bank STU 901', 'Bank VWX 234', 'BANK YZ 567'
    ];

    $('#bank-profiles .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'banks',
        source: substringMatcher(banks)
    });
});